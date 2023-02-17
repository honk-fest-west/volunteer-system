<script lang="ts">
  import type { QuestionStateSend } from '$machines/admin/questions/question.machine';
  import { fade } from 'svelte/transition';
  import type { Question } from '$models';
  import { getContext, onMount } from 'svelte';
  import MainContainer from '$components/MainContainer.svelte';
  import Header from '$components/header/Header.svelte';
  import BackButton from '$components/header/BackButton.svelte';
  import AutoSaveNotification from '$components/AutoSaveNotification.svelte';

  export let params: { id?: string } = {};

  const { state, send } = getContext<QuestionStateSend>('questionMachine');

  $: selectedQuestion = $state.context.selectedQuestion;
  $: error = $state.context.error;
  $: answers = $state.context.answers;
  $: autoSave = $state.context.autoSaveRef;

  onMount(() => send('AT.QUESTION', { data: params.id }));

  function gotoIndex() {
    send('GOTO.INDEX');
  }
</script>

{#if selectedQuestion}
  <div in:fade={{ duration: 100 }}>
    <MainContainer>
      <div slot="header">
        <Header name={selectedQuestion.question}>
          <BackButton slot="left" on:goBack={gotoIndex} />
        </Header>
      </div>
      <div slot="actions">
        <div class="flex items-center">
          <AutoSaveNotification {autoSave} />
        </div>
      </div>
    </MainContainer>
  </div>
{/if}
