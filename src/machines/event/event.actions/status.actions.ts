import type { EventCtx } from '../event.machine';
import { assign } from 'xstate';

export const statusActions = {
  setDraftStatus: assign({
    selectedEvent: ({ selectedEvent }: EventCtx) => {
      return {
        ...selectedEvent,
        status: 'draft',
      };
    },
  }),

  setPreviewStatus: assign({
    selectedEvent: ({ selectedEvent }: EventCtx) => {
      return {
        ...selectedEvent,
        status: 'preview',
      };
    },
  }),

  setOpenStatus: assign({
    selectedEvent: ({ selectedEvent }: EventCtx) => {
      return {
        ...selectedEvent,
        status: 'open',
      };
    },
  }),

  setLockStatus: assign({
    selectedEvent: ({ selectedEvent }: EventCtx) => {
      return {
        ...selectedEvent,
        status: 'lock',
      };
    },
  }),

  setArchiveStatus: assign({
    selectedEvent: ({ selectedEvent }: EventCtx) => {
      return {
        ...selectedEvent,
        status: 'archive',
      };
    },
  }),
};
