<script lang="ts">
  import type { QuestionStateSend } from '$machines/question';
  import { getContext } from 'svelte';

  const { state, send } = getContext<QuestionStateSend>('questionsMachine');

  $: introducing = ['introducingQuestions'].some($state.matches);
  $: asking = ['askingQuestions'].some($state.matches);

  $: modalOpen = introducing || asking;

  function handleStart() {
    send('START_QUESTIONS');
    scrollIntoView(0);
  }

  function handleAnswer() {
    const answer = document.querySelector('textarea').value;
    send('ANSWER', { answer });
  }

  function handleGotoQuestion({ target }) {
    const index = target.dataset.index;
    scrollIntoView(index);
    send('GOTO_QUESTION', { index });
  }

  function scrollIntoView(index) {
    const el = document.querySelector(`#question-${index}`);
    if (!el) return;
    el.scrollIntoView({
      behavior: 'smooth',
    });
  }

  $: questions = $state.context.questions;
</script>

<div class="modal {modalOpen ? 'modal-open' : ''}">
  <div class="modal-box">
    <div class="carousel w-[95]">
      <div class="carousel-item w-full">
        <div class="flex flex-col items-center justify-center w-full h-full">
          <h2 class="text-xl font-bold">
            Please answer the following questions
          </h2>
        </div>
      </div>
      {#each questions as question, index}
        <div id={`question-${index}`} class="carousel-item w-full">
          <div class="flex flex-col items-center justify-center w-full h-full">
            <h2 class="text-xl font-bold">{question.question}</h2>
            <textarea
              id={`answer-${index}`}
              class="textarea textarea-primary w-full h-32 mt-4"
            />
          </div>
        </div>
      {/each}
    </div>

    <div class="modal-action flex justify-between">
      {#if introducing}
        <button class="btn btn-primary btn-sm my-2" on:click={handleStart}
          >Start</button
        >
      {:else if asking}
        <div
          class="flex justify-start flex-wrap items-end w-full py-2 pr-2 gap-2"
        >
          {#each questions as question, index}
            <button
              data-index={index}
              class="btn btn-xs"
              on:click|preventDefault={handleGotoQuestion}>{index + 1}</button
            >
          {/each}
        </div>
        <button class="btn btn-primary btn-sm my-2" on:click={handleAnswer}
          >Answer</button
        >
      {/if}
    </div>
  </div>
</div>
