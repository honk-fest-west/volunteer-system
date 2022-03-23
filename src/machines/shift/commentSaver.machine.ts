import { createMachine, assign, actions } from 'xstate';
import { doc, collection, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '$config/firebase';

const { cancel, send } = actions;

const DEBOUNCE_DELAY = 1000;

interface CommentSaverCtx {
  selectedEventId: string;
  data: {
    comment: string;
    signUpId: string;
  };
}

type CommentSaverEvt =
  | { type: 'COMMENT_CHANGED'; data: { signUpId: string; comment: string } }
  | { type: 'SAVE_COMMENT'; data: { signUpId: string; comment: string } };

export const commentSaverMachine = createMachine<
  CommentSaverCtx,
  CommentSaverEvt
>(
  {
    id: 'autoSave',
    initial: 'waitingChanges',
    context: {
      selectedEventId: null,
      data: {
        comment: null,
        signUpId: null,
      },
    },
    states: {
      waitingChanges: {
        on: {
          COMMENT_CHANGED: {
            target: 'debouncing',
            actions: [
              'updateComment',
              'cancelSlowSaveComment',
              'sendSlowSaveCommentAfterDelay',
            ],
          },
        },
      },
      debouncing: {
        on: {
          COMMENT_CHANGED: {
            actions: [
              'updateComment',
              'cancelSlowSaveComment',
              'sendSlowSaveCommentAfterDelay',
            ],
          },
          SAVE_COMMENT: {
            target: 'saving',
          },
        },
      },
      saving: {
        invoke: {
          id: 'commentSaver',
          src: 'commentSaver',
          onDone: { target: 'waitingChanges' },
          onError: {
            actions: (_, evt) => console.log('Error:commentSaverMachine', evt),
          },
        },
      },
    },
  },
  {
    actions: {
      updateComment: assign({
        data: (_, evt: CommentSaverEvt) => {
          return evt.data;
        },
      }),
      cancelSlowSaveComment: cancel('debounced-save'),
      sendSlowSaveCommentAfterDelay: send('SAVE_COMMENT', {
        delay: DEBOUNCE_DELAY,
        id: 'debounced-save',
      }),
    },
    services: {
      commentSaver: ({
        selectedEventId,
        data: { signUpId, comment },
      }: CommentSaverCtx) => {
        const signUpRef = doc(
          db,
          'events',
          selectedEventId,
          'signUps',
          signUpId
        );

        return setDoc(
          signUpRef,
          { comment, updatedAt: Timestamp.now() },
          { merge: true }
        );
      },
    },
  }
);
