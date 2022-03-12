<script lang="ts">
  import type { VEvent } from '$types';

  export let selectedEvent: VEvent;
  export let send;

  function openEvent() {
    send('STATUS_OPEN', { data: selectedEvent });
  }

  function lockEvent() {
    send('STATUS_LOCKED', { data: selectedEvent });
  }

  function archiveEvent() {
    send('STATUS_ARCHIVED', { data: selectedEvent });
  }
</script>

<fieldset>
  <div>
    <legend class="text-xl font-medium text-gray-900">Status</legend>
    <div class="grid grid-cols-4 gap-3 mt-4">
      <div class="flex items-center">
        {#if selectedEvent.status === 'draft'}
          <input
            id="status-draft"
            name="status"
            type="radio"
            value="draft"
            bind:group={selectedEvent.status}
            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            disabled
          />
          <label
            for="status-draft"
            class="ml-3 block text-sm font-medium text-gray-700"
          >
            Draft
          </label>
        {/if}
      </div>

      <div class="flex items-center">
        <input
          id="status-open"
          name="status"
          type="radio"
          value="open"
          bind:group={selectedEvent.status}
          on:click={openEvent}
          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
        />
        <label
          for="status-open"
          class="ml-3 block text-sm font-medium text-gray-700"
        >
          Open
        </label>
      </div>
      <div class="flex items-center">
        <input
          id="status-locked"
          name="status"
          type="radio"
          value="locked"
          bind:group={selectedEvent.status}
          on:click={lockEvent}
          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
        />
        <label
          for="status-locked"
          class="ml-3 block text-sm font-medium text-gray-700"
        >
          Locked
        </label>
      </div>
      <div class="flex items-center">
        <input
          id="status-archived"
          name="status"
          type="radio"
          value="archived"
          bind:group={selectedEvent.status}
          on:click={archiveEvent}
          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
        />
        <label
          for="status-archived"
          class="ml-3 block text-sm font-medium text-gray-700"
        >
          Archived
        </label>
      </div>
    </div>

    <div class="mt-2 grid grid-cols-4 gap-3">
      <p class="text-sm text-gray-500">
        {#if selectedEvent.status === 'draft'}
          Event shifts are being drafted and are not available to volunteers.
        {/if}
      </p>

      <p class="text-sm text-gray-500">
        Event shifts are open and volunteers can sign up and also change shift
        selections.
      </p>
      <p class="text-sm text-gray-500">
        Event shifts are locked and volunteers can no longer change their shift
        selection.
      </p>
      <p class="text-sm text-gray-500">
        Event shifts are archived and no longer presented to volunteers.
      </p>
    </div>
  </div>
</fieldset>
