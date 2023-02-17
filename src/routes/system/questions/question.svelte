<script lang="ts">
  import type { QuestionStateSend } from '$machines/admin/questions/question.machine';
  import { fade } from 'svelte/transition';
  import type { Question } from '$models';
  import { getContext, onMount } from 'svelte';
  import MainContainer from '$components/MainContainer.svelte';
  import Header from '$components/header/Header.svelte';
  import BackButton from '$components/header/BackButton.svelte';
  import AutoSaveNotification from '$components/AutoSaveNotification.svelte';
  import {
    TableContainer,
    TableCell,
    TableHead,
    TableRow,
  } from '$components/table';

  export let params: { id?: string } = {};

  const { state, send } = getContext<QuestionStateSend>('questionMachine');

  $: question = $state.context.selectedQuestion;
  $: error = $state.context.error;
  $: answers = $state.context.answers;
  $: autoSave = $state.context.autoSaveRef;

  onMount(() => send('AT.QUESTION', { data: params.id }));

  function gotoIndex() {
    send('GOTO.INDEX');
  }

  function updateQuestion() {
    send('QUESTION.SAVE');
  }

  function toggleActive() {
    send('QUESTION.TOGGLE_ACTIVE');
  }
</script>

{#if question}
  <div in:fade={{ duration: 100 }}>
    <MainContainer>
      <div slot="header">
        <Header name={question.question}>
          <BackButton slot="left" on:goBack={gotoIndex} />
        </Header>
      </div>
      <div slot="actions">
        <div class="flex items-center">
          <AutoSaveNotification {autoSave} />
        </div>
      </div>
      <div on:input={updateQuestion} class="bg-white">
        <div class="flex items-center py-2">
          <button
            type="button"
            class="{question.active
              ? 'bg-green-600 focus:ring-green-600'
              : 'bg-gray-400 focus:ring-gray-400'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2  focus:ring-offset-2"
            role="switch"
            aria-checked="false"
            aria-labelledby="active-label"
            on:click={toggleActive}
          >
            <span
              aria-hidden="true"
              class:translate-x-5={question.active}
              class:translate-x-0={!question.active}
              class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
            />
          </button>
          <span class="ml-3" id="active-label">
            {#if question.active}
              <span class="text-sm font-medium text-green-600">ACTIVE</span>
            {:else}
              <span class="text-sm font-medium text-gray-400">hidden</span>
            {/if}
          </span>
        </div>
        <div class="mt-4 col-span-2 sm:col-span-1 py-2">
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Question:</label
          >
          <input
            type="text"
            name="question"
            id="question"
            class="mt-2 h-20 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            bind:value={question.question}
          />
        </div>

        <div>
          {#if error}
            <div
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span class="block sm:inline">{error}</span>
            </div>
          {/if}
        </div>
        <div class="pt-8 mx-8">
          {#if answers}
            <TableContainer>
              <TableRow slot="head">
                <TableHead side="left" text="left">Volunteer</TableHead>
                <TableHead side="right" text="left" width="80%"
                  >Answer</TableHead
                >
              </TableRow>
              {#each answers as answer}
                <TableRow>
                  <TableCell text="left">
                    {answer.volunteerDisplayName}</TableCell
                  >
                  <TableCell text="left">{answer.answer}</TableCell>
                </TableRow>
              {/each}
            </TableContainer>
          {/if}
        </div>
      </div>
    </MainContainer>
  </div>
{/if}
