<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { VEvent } from '$types';
  import { getContext, onMount } from 'svelte';
  import EventForm from '$components/event/form/EventForm.svelte';
  import ConfirmationModal from '$components/modals/ConfirmationModal.svelte';
  export let params: { id?: string } = {};

  const { state, send } = getContext('events');

  $: selectedEvent = $state.context.selectedEvent as VEvent;
  $: error = $state.context.error;
  $: confirmOpenStatus = $state.matches('validatingEvent');

  onMount(() => {
    send('EDIT_EVENT', { data: params.id });
  });
</script>

{#if selectedEvent}
  <div in:fade={{ duration: 100 }}>
    <EventForm bind:selectedEvent {state} {send} {error} />
  </div>
{/if}

{#if confirmOpenStatus}
  <ConfirmationModal {send}>
    <span slot="title" class="title">Open Event</span>
    Opening an event makes it avaliable for volunteers to apply for shifts. This
    event can not be edited once it is opened. Please confirm everything is correct.
  </ConfirmationModal>
{/if}
