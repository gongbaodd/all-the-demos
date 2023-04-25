import { createMachine, assign } from "xstate";

interface FlightContext {
  startDate?: string;
  returnDate?: string;
  trip: "oneWay" | "roundTrip";
}

type FlightEvent =
  | { type: "SET_TRIP"; trip: "oneWay" | "roundTrip" }
  | { type: "startDate.UPDATE"; value: string }
  | { type: "returnDate.UPDATE"; value: string }
  | { type: "SUBMIT" };

export const flightMachine = createMachine<FlightContext, FlightEvent>({
  /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgAoBbAQwGMALASwzAEp8QAHLWKgFyqw0YA9EAjACZ0AT0FDkU5EA */
  id: "flight",
  initial: "editing",
  context: {
    startDate: undefined,
    returnDate: undefined,
    trip: "oneWay",
  },
  states: {
    editing: {
      on: {
        "startDate.UPDATE": {
          actions: assign({
            startDate: (_, event) => event.value,
          }),
          cond: (ctx) => ctx.trip === "roundTrip",
        },
        "returnDate.UPDATE": {
          actions: assign({
            returnDate: (_, event) => event.value,
          }),
          cond: (ctx) => ctx.trip === "roundTrip",
        },
        SET_TRIP: {
          actions: assign({
            trip: (_, event) => event.trip,
          }),
          cond: (ctx) => ctx.trip === "oneWay" || ctx.trip === "roundTrip",
        },
        SUBMIT: {
          target: "submitted",
          cond: (ctx) => {
            if (ctx.trip === "oneWay") {
              return !!ctx.startDate;
            } else if (ctx.trip === "roundTrip") {
              return !!ctx.startDate && !!ctx.returnDate;
            }
            return false;
          },
        },
      },
    },
  },
});
