import { assign } from 'xstate';

export const scheduleActions = {
  setSelectedJobId: assign({
    selectedJobId: (_ctx, evt) => evt.data,
  }),
  clearSelectedJobId: assign({
    selectedJobId: (_ctx, evt) => null,
  }),
};
