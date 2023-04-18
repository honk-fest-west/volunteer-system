import type { QuestionEvt } from '../question.machine';
import { push } from 'svelte-spa-router';
import { prefix } from '$routes/prefix';

export const gotoActions = {
  gotoIndex: () => push(prefix.admin_questions_path()),

  gotoQuestion: (_, evt: QuestionEvt) => {
    if (
      evt.type !== 'QUESTION.SELECT' &&
      evt.type !== 'done.invoke.questionAdder'
    )
      return;

    push(prefix.admin_questions_path(evt.data));
  },
};
