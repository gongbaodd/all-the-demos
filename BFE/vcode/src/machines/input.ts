import { createMachine, assign } from "xstate";

interface InputContext {
  value: string;
}

type InputEvent =
  | { type: "CHANGE"; value: string }
  | { type: "DISABLE" }
  | { type: "ENABLE" };

const inputMachine = createMachine<InputContext, InputEvent>({
  /** @xstate-layout N4IgpgJg5mDOIC5QEsB2AHArgFwHQEMBjbZANzAGIBhACQEEA5AcQFEBtABgF1FR0B7WMhL9UvEAA9EADgCcuWQBYA7LI4A2RUoCMijQCYANCACeiALSztudbfUBme+o4BWWS+Ud7AX2-G0WHhEJOQUACIAkgDKdABCADLs3OICQiJiSJIWyvq40ppu9i6u0oXSxmYIluo2dorS+SqK6tq+-hg4uGjBZJQsDHGJnDyZqcLIouJSCHo2Ltpeujp66vouFYjaLva4jo7a+rIN+tIHLr5+IKj8EHDiATgpguOTmdPmutK4Ls1yHGvSZR-dQbKraaSKXC6FynQ7HWHnS4PILEXpPNITDKgd4LDjfX5qAFAtQg0yIRSQo7uWTKez6VwuWyKNogZFdVA9cjol5YrJgjh4n7qP5E4Gg7SqXAqKwufTqVQUxzqC7eIA */
  id: "input",
  initial: "active",
  context: {
    value: "",
  },
  states: {
    active: {
      on: {
        CHANGE: [
          {
            actions: assign({
              value: (_, event) => event.value,
            }),
          },
        ],
        DISABLE: [
          {
            target: "inactive",
          },
        ],
      },
    },
    inactive: {
      on: {
        ENABLE: [
          {
            target: "active",
          },
        ],
      },
    },
  },
});

export default inputMachine;
