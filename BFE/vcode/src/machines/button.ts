import { createMachine } from "xstate";

interface ButtonContext {}

type ButtonEvent = { type: "CLICK" } | { type: "DISABLE" } | { type: "ENABLE" };

const buttonMachine = createMachine<ButtonContext, ButtonEvent>({
  /** @xstate-layout N4IgpgJg5mDOIC5QCMCuAXdB7AdgOgEMBjdASwDcwBiAEQEkBlAQQCEAZAUQG0AGAXUSgADllikyuQSAAeiAKwB2PAE4AbAA4FcgDQgAnvIC+h3Wky48pHMTKUqHAHKtOvAUhAixEnFNkIAtACMCgBMeOqqACyK6iGRCjwJAMy6BghyxiYgOFgQcFJm2D7unuKkku5+-iEhPOFRMXEJyamIQSFKDepJcppRUeqRxqYYRYQkFGBSpd6+baphSQ0Lyuqx6oEhOvptkXWBqocKwXIhymeqysMghRZWNpPTomUVoFULeEvRK2shG1utBDKSKfGrKQI8JI8NZJBTqK6ZIA */
  id: "button",
  initial: "active",
  states: {
    active: {
      on: {
        CLICK: [],
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

export default buttonMachine;
