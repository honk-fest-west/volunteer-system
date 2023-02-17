import type { QuestionEvt } from '../question.machine';
import { push } from 'svelte-spa-router';

export const gotoActions = {
  gotoIndex: () => push('/system/questions'),

  gotoQuestion: (_, evt: QuestionEvt) => {
    if (
      evt.type !== 'QUESTION.SELECT' &&
      evt.type !== 'done.invoke.questionAdder'
    )
      return;
    push(`/system/questions/${evt.data}`);
  },
};
