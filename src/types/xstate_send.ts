import type {
  Interpreter,
  SingleOrArray,
  State,
  Event,
  SCXML,
  EventData,
  EventObject,
} from 'xstate';

export interface XStateSend<Ctx, Evt extends EventObject> {
  state: Interpreter<Ctx, any, Evt>;
  send: (
    event: SingleOrArray<Event<Evt>> | SCXML.Event<Evt>,
    payload?: EventData
  ) => State<Ctx, Evt>;
}
