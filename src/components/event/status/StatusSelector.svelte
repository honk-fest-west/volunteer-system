<script lang="ts">
  import type { EventStatus } from '$types';

  import { createEventDispatcher } from 'svelte';
  import StatusButton from './StatusButton.svelte';

  export let status: EventStatus = 'draft';

  const isDraftActive = status === 'draft';
  const isDraftDisabled = status !== 'draft';

  const isOpenActive = status === 'open';
  const isOpenDisabled = status === 'archived';

  const isLockActive = status === 'locked';
  const isLockDisabled = status === 'archived' || status === 'draft';

  const isArchiveActive = status === 'archived';
  const isArchiveDisabled = status === 'draft';

  const dispatch = createEventDispatcher();

  function handleClick(newStatus: EventStatus) {
    dispatch('changeStatus', newStatus);
  }
</script>

<fieldset>
  <div>
    <legend class="text-xl font-medium text-gray-900">Status</legend>
    <div class="grid grid-cols-4 gap-3 mt-4">
      <StatusButton
        on:click={() => handleClick('draft')}
        active={isDraftActive}
        disabled={isDraftDisabled}
      >
        <span slot="name">1. Draft</span>
        <span slot="description"
          >Event shifts are being drafted and are not available to volunteers.</span
        >
      </StatusButton>
      <StatusButton
        on:click={() => handleClick('open')}
        active={isOpenActive}
        disabled={isOpenDisabled}
      >
        <span slot="name">2. Open</span>
        <span slot="description"
          >Event shifts are open and volunteers can sign up and also change
          shift selections.</span
        >
      </StatusButton>
      <StatusButton
        on:click={() => handleClick('locked')}
        active={isLockActive}
        disabled={isLockDisabled}
      >
        <span slot="name">3. Lock</span>
        <span slot="description"
          >Event shifts are locked and volunteers can no longer change their
          shift selection.</span
        >
      </StatusButton>
      <StatusButton
        on:click={() => handleClick('archived')}
        active={isArchiveActive}
        disabled={isArchiveDisabled}
      >
        <span slot="name">4. Archive</span>
        <span slot="description"
          >Event shifts are archived and no longer presented to volunteers.</span
        >
      </StatusButton>
    </div>
  </div>
</fieldset>
