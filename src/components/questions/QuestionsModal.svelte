<script lang="ts">
  import type { QuestionStateSend } from '$machines/questionModal';
  import { fade } from 'svelte/transition';
  import { getContext } from 'svelte';

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
    send('START');
  }

  function handleAnswer() {
    send('ANSWER', { data: currentAnswer });
  }

  function handleSkip() {
    send('SKIP');
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
          <h2 class="text-xl font-bold">Please answer a few questions...</h2>
        </div>
      </div>
      {#each questions as question, index}
        <div id={`question-${index}`} class="carousel-item w-full">
          <div class="flex flex-col items-center justify-center w-full h-full">
            <h2 class="text-xl font-bold h-20">{question.question}</h2>
            {#if index === currentQuestionIndex}
              <textarea
                id={`answer-${index}`}
                bind:value={answers[index]}
                class="textarea textarea-primary w-full h-32 mt-4"
                in:fade
                out:fade
              />
            {/if}
          </div>
        </div>
      {/each}
    </div>

    <div class="modal-action flex justify-between items-center">
      {#if introducing}
        <div class="flex justify-center w-full">
          <button class="btn btn-primary btn-sm my-2" on:click={handleStart}
            >Start</button
          >
        </div>
      {:else if asking}
        <div class="w-full py-2 pr-2 overflow-x-auto">
          <ul class="steps">
            {#each questions as question, index}
              <li
                class="step"
                class:step-neutral={currentQuestionIndex > index}
                class:step-primary={currentQuestionIndex === index}
              />
            {/each}
          </ul>
        </div>
        <div class="flex justify-end items-center my-2 gap-2">
          <button class="btn btn-ghost btn-sm my-2" on:click={handleSkip}
            >Skip</button
          >
          <button
            class="btn btn-primary btn-sm"
            disabled={isUnAnswered}
            on:click={handleAnswer}>Answer</button
          >
        </div>
      {/if}
    </div>
  </div>
</div>
