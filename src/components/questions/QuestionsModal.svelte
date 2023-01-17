<script lang="ts">
  import type { QuestionStateSend } from '$machines/question';
  import { getContext, tick } from 'svelte';

  const { state, send } = getContext<QuestionStateSend>('questionsMachine');
  let answers: string[] = [];

  $: introducing = ['introducingQuestions'].some($state.matches);
  $: asking = ['askingQuestions'].some($state.matches);
  $: saving = ['savingAnswer'].some($state.matches);
  $: currentQuestionIndex = $state.context.currentQuestionIndex;
  $: currentAnswer = answers[currentQuestionIndex];
  $: questions = $state.context.questions;

  $: modalOpen = introducing || asking || saving;

  $: isUnAnswered =
    !answers.length || !currentAnswer || currentAnswer.trim() === '';

  $: if (currentQuestionIndex !== null) {
    scrollIntoView(currentQuestionIndex);
  }

  function handleStart() {
    send('START_QUESTIONS');
  }

  function handleAnswer() {
    send('ANSWER', { data: currentAnswer });
  }

  function handleGotoQuestion({ target }) {
    const index = target.dataset.index;
    send('GOTO_QUESTION', { data: Number(index) });
  }

  function scrollIntoView(index: number) {
    const el = document.querySelector(`#question-${index}`);
    if (!el) return;
    el.scrollIntoView({
      behavior: 'smooth',
    });
  }
</script>

<div class="modal {modalOpen ? 'modal-open' : ''}">
  <div class="modal-box">
    <div class="carousel w-[95]">
      <div class="carousel-item w-full">
        <div class="flex flex-col items-center justify-center w-full h-full">
          <h2 class="text-xl font-bold">
            We just have a few more questions...
          </h2>
        </div>
      </div>
      {#each questions as question, index}
        <div id={`question-${index}`} class="carousel-item w-full">
          <div class="flex flex-col items-center justify-center w-full h-full">
            <h2 class="text-xl font-bold h-20">{question.question}</h2>
            <textarea
              id={`answer-${index}`}
              bind:value={answers[index]}
              class="textarea textarea-primary w-full h-32 mt-4"
            />
          </div>
        </div>
      {/each}
    </div>

    <div class="modal-action flex justify-between">
      {#if introducing}
        <div class="flex justify-end w-full">
          <button class="btn btn-primary btn-sm my-2" on:click={handleStart}
            >Start</button
          >
        </div>
      {:else if asking}
        <div
          class="flex justify-start flex-wrap items-start w-full py-2 pr-2 gap-2"
        >
          {#each questions as question, index}
            <button
              data-index={index}
              class="btn btn-xs"
              on:click={handleGotoQuestion}>{index + 1}</button
            >
          {/each}
        </div>
        <button
          class="btn btn-primary btn-sm my-2"
          disabled={isUnAnswered}
          on:click|stopPropagation={handleAnswer}>Answer</button
        >
      {/if}
    </div>
  </div>
</div>
