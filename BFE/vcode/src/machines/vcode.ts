import { createMachine, assign, actions } from "xstate";

interface VCodeContext {
  tel: string;
  code: string;
  token: string;
  tik: number;
}

type VCodeEvent =
  | { type: "TelTyped"; tel: string }
  | { type: "ApplyCode" }
  | { type: "TokenGet"; token: string }
  | { type: "CodeTyped"; code: string }
  | { type: "Tik"; count: number }
  | { type: "TimeOut" };

const vcodeMachine = createMachine<VCodeContext, VCodeEvent>(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QDcDGB7CYB0YC2ADgC4CeAxACpgA2FJBkA2gAwC6ioB6sAlkT+gB2HEAA9EAWgDsATmxSALAA4AzGqlKFKpQFYVOgDQgSiAExr5KqcwCMalXaWmbpgL6ujaTDnzFyVWnomG3YkEC5efiERcQQbADYVbB1meKUpFWZ1UyMTBBUFU2wVGQU7GQLmKRspd08MLGwAdQBDPgp0AGswQUoaOgYIFlDObj4BYTDYhWYi5nSdGWcbWd0lXLMFeOLzVULUqWsqupAvRtb2rp6+wMHGEJEI8eipxASdZJdUmWqZJdMdDljGYKtgKjonDotAkSioTmccBciB1ur0AIIEAjUEgAYW8w0eYyik1AsUSNjBMni0NM8SqSl0G3yejBGgK6Qc1LsOnhDURbWRV16eKwAyYbEJkQmMUQCkKyWYhR0gISNmVKiZauY2FpdkKaihKwUvO82AoPE6PEEUBuYqGErCT2JMoQGiUYKyVIUih08XiNhsTPMFLK1UOAeYMj28RNjXNlutlAtBMdROlrwQSiq2CUCSkpmYiscZU1+mKULSgJK8V2sZw8atNvNeDAAHkAK5EFOjKUvUmIanumyFGxR8wA9lMzJJHTDrOKDI2Jxqutmi2NyhCgDiYC7Dp7zxJYkQhzkf3DmVsJRkhmB+TkpiWo7UaVpM1Kq4biZFYDt3fCaZ9serq5pYiwyCsN5qk4TISL68jWI+uhZJGyoxicgjePAYQIpKh4uhILhSPIyj2BoWi6PosHDgoOoKKUULgocvpuB4px8rghCkHhzoZoRxFKHSmRerqChQlOBTyH8ehzhWfqrkiKI9Dx6b9ggYlzPsKxSCkUjxLeeQFB82gBo+JSjqY+ZwmxCJrgmUAqUBsSHEk1Szt6MxynKQKGSoRTelSaRjgUfnuO4QA */
    id: "vcode",
    initial: "empty",
    context: {
      tel: "",
      code: "",
      token: "",
      tik: 60,
    },
    states: {
      empty: {
        on: {
          TelTyped: [
            {
              actions: ["changeTel"],
              cond: { type: "telNotValid" },
            },
            {
              target: "WaitToken",
            },
          ],
        },
      },
      WaitToken: {
        on: {
          TelTyped: [
            {
              actions: ["changeTel"],
              cond: { type: "telIsValid" },
            },
            {
              target: "empty",
            },
          ],
          ApplyCode: [
            {
              target: "Tiking",
            },
          ],
          CodeTyped: [
            {
              actions: ["changeCode"],
            },
          ],
        },
      },
      Tiking: {
        on: {
          TelTyped: [
            {
              actions: ["changeTel"],
            },
          ],
          Tik: [
            {
              actions: ["tick"],
            },
          ],
          TimeOut: {
            target: "WaitToken",
          },
          TokenGet: [
            {
              actions: ["changeToken"],
            },
          ],
          CodeTyped: [
            {
              actions: ["changeCode"],
            },
          ],
        },
        invoke: {
          src: "tiking",
        },
      },
    },
  },
  {
    actions: {
      changeTel: assign({
        tel: (_, event) => {
          if (event.type === "TelTyped") {
            return event.tel;
          }
          return "";
        },
      }),
      tick: assign({
        tik: (ctx, event) => {
          if (event.type === "Tik") {
            return event.count;
          }
          return ctx.tik;
        },
      }),
      changeToken: assign({
        token: (_, event) => {
          if (event.type === "TokenGet") {
            return event.token;
          }
          return "";
        },
      }),
      changeCode: assign({
        code: (_, event) => {
          if (event.type === "CodeTyped") {
            return event.code;
          }
          return "";
        },
      }),
    },
    guards: {
      telNotValid: (ctx) => isTelValid(ctx.tel) === false,
      telIsValid: (ctx) => isTelValid(ctx.tel),
    },
    services: {
      tiking:
        ({ tik }) =>
        async (send) => {
          const token = await getRedisKey();

          send({ type: "TokenGet", token });

          let count = tik;
          const timer = setInterval(() => {
            count--;
            send({ type: "Tik", count });
            if (count <= 0) {
              clearInterval(timer);
              send("TimeOut");
            }
          }, 1000);

          return () => {
            clearInterval(timer);
          };
        },
    },
  }
);

export default vcodeMachine;

function isTelValid(tel: string) {
  return tel.length >= 11;
}

async function getRedisKey() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return "fake Redis key";
}
