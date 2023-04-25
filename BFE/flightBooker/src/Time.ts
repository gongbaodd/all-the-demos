import { createMachine, assign } from "xstate";

interface TimeContext {
  elapsed: number;
  interval: number;
  duration: number;
}

type TimeEvent =
  | { type: "TICK" }
  | { type: "RESET" }
  | { type: "DURATION_UPDATE"; duration: number };

export const timeMachine = createMachine<TimeContext, TimeEvent>({
  initial: "running",
  context: {
    elapsed: 0,
    interval: 0.1,
    duration: 5,
  },
  states: {
    running: {
      invoke: {
        src: (context) => (sendBack) => {
          const id = setInterval(() => {
            sendBack("TICK");
          }, 1000 * context.interval);

          return () => {
            clearInterval(id);
          };
        },
      },
    },
  },
});
