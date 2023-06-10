<script lang="ts">
  import type { Question } from '$models';
  import { getContext, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import type { QuestionStateSend } from '$machines/admin/questions';
  import MainContainer from '$components/MainContainer.svelte';
  import {
    TableContainer,
    TableCell,
    TableHead,
    TableRow,
  } from '$components/table';

  const { state, send } = getContext<QuestionStateSend>('questionMachine');
  $: questions = Object.values($state.context.questions)
    .sort((a: Question, b: Question) => (a.compareTo(b) && 1) || -1)
    .filter((q) => q.question !== null) as Question[];

  function selectQuestion(e) {
    send('QUESTION.SELECT', { data: e.id });
  }

  function addQuestion() {
    send('QUESTION.ADD');
  }

  onMount(() => {
    send('AT.INDEX');
  });
</script>

<div in:fade={{ duration: 100 }}>
  <MainContainer>
    <h1 slot="header" class="text-3xl font-extrabold text-pink-700 grow">
      Questions
    </h1>
    <button
      slot="actions"
      type="button"
      on:click={addQuestion}
      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <span class="material-icons mr-1 !text-lg"> add </span>
      New Question
    </button>
    <TableContainer>
      <TableRow slot="head">
        <TableHead side="left" text="left">Question</TableHead>
        <TableHead side="right">Status</TableHead>
      </TableRow>
      {#each questions as question}
        <TableRow>
          <TableCell
            text="left"
            selectable={true}
            on:selected={() => selectQuestion(question)}
          >
            {question.question}
          </TableCell>
          <TableCell>
            {#if question.active}
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
              >
                Active
              </span>
            {/if}
          </TableCell>
        </TableRow>
      {/each}
    </TableContainer>
  </MainContainer>
</div>
