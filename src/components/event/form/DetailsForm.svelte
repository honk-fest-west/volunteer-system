<script lang="ts">
  import type { VEvent } from '$models';

  export let selectedEvent: VEvent;
</script>

{#if selectedEvent}
  <fieldset class="pt-4">
    <div>
      <legend class="text-xl font-medium text-gray-900">Event</legend>
      <div class="grid grid-cols-6 gap-6 mt-4">
        <div class="col-span-6 sm:col-span-3">
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <input
            type="text"
            name="name"
            id="name"
            autocomplete="event-name"
            class="mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            bind:value={selectedEvent.name}
          />
        </div>
        <div class="col-span-6 sm:col-span-3">
          <label for="date" class="block text-sm font-medium text-gray-700"
            >Date</label
          >
          <input
            type="date"
            name="date"
            id="date"
            autocomplete="event-date"
            class="mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            bind:value={selectedEvent.date}
          />
        </div>
        <div class="col-span-6">
          <label
            for="description"
            class="block text-sm font-medium text-gray-700">Description</label
          >
          <div class="mt-2">
            <textarea
              name="description"
              id="description"
              autocomplete="event-description"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
              bind:value={selectedEvent.description}
            />
            <p class="mt-2 text-sm text-gray-500">
              Brief description of the event to help orientate volunteers.
            </p>
          </div>
        </div>
      </div>
    </div>
  </fieldset>
{/if}
