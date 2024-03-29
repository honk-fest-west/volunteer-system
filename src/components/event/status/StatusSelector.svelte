<script lang="ts">
  import type { EventStatus } from '$types';

  import { createEventDispatcher } from 'svelte';
  import StatusButton from './StatusButton.svelte';

  export let status: EventStatus = 'draft';
  export let isDraftDisabled = true;
  export let isPreviewDisabled = true;
  export let isOpenDisabled = true;
  export let isLockDisabled = true;
  export let isArchiveDisabled = true;

  const dispatch = createEventDispatcher();

  function handleClick(newStatus: EventStatus) {
    dispatch('changeStatus', newStatus);
  }
</script>

<fieldset>
  <div>
    <legend class="text-xl font-medium text-gray-900">Status</legend>
    <div class="grid grid-cols-5 gap-3 mt-4">
      <StatusButton
        on:click={() => handleClick('draft')}
        active={status === 'draft'}
        disabled={isDraftDisabled}
      >
        <span slot="name"
          ><span class="hidden md:inline">1.&nbsp;</span>Draft</span
        >
        <span slot="description"
          >Event shifts are being drafted and are not available to volunteers.</span
        >
      </StatusButton>
      <StatusButton
        on:click={() => handleClick('preview')}
        active={status === 'preview'}
        disabled={isPreviewDisabled}
      >
        <span slot="name"
          ><span class="hidden md:inline">2.&nbsp;</span>Preview</span
        >
        <span slot="description"
          >Event shifts can be previewed as if they were open, but are not
          available to volunteers.</span
        >
      </StatusButton>
      <StatusButton
        on:click={() => handleClick('open')}
        active={status === 'open'}
        disabled={isOpenDisabled}
      >
        <span slot="name"
          ><span class="hidden md:inline">3.&nbsp;</span>Open</span
        >
        <span slot="description"
          >Event shifts are open and volunteers can sign up and also modify
          shift selection.</span
        >
      </StatusButton>
      <StatusButton
        on:click={() => handleClick('lock')}
        active={status === 'lock'}
        disabled={isLockDisabled}
      >
        <span slot="name"
          ><span class="hidden md:inline">4.&nbsp;</span>Lock</span
        >
        <span slot="description"
          >Event shifts are locked and volunteers can no longer change their
          shift selection.</span
        >
      </StatusButton>
      <StatusButton
        on:click={() => handleClick('archive')}
        active={status === 'archive'}
        disabled={isArchiveDisabled}
      >
        <span slot="name"
          ><span class="hidden md:inline">5.&nbsp;</span>Archive</span
        >
        <span slot="description"
          >Event shifts are archived and no longer presented to volunteers.</span
        >
      </StatusButton>
    </div>
  </div>
</fieldset>
