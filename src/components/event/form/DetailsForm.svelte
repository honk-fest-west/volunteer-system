<script lang="ts">
  import type { VEvent } from '$models';

  export let selectedEvent: VEvent;
</script>

{#if selectedEvent}
  <fieldset class="pt-4">
    <div>
      <legend class="text-xl font-medium text-gray-900">Event</legend>
      <div
        class="grid grid-cols-2 mt-4 gap-6 sm:grid-flow-col-dense sm:grid-rows-3"
      >
        <div class="col-span-2 sm:col-span-1">
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
        <div class="col-span-2 sm:col-span-1">
          <label for="location" class="block text-sm font-medium text-gray-700"
            >Location</label
          >
          <input
            type="text"
            name="location"
            id="location"
            autocomplete="event-location"
            class="mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            bind:value={selectedEvent.location}
          />
        </div>
        <div class="col-span-2 sm:col-span-1">
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

        <div class="col-span-2 sm:col-span-1 sm:row-span-3 flex flex-col">
          <label
            for="description"
            class="block text-sm font-medium text-gray-700">Description</label
          >
          <div class="mt-2 flex-grow">
            <textarea
              name="description"
              id="description"
              autocomplete="event-description"
              class="h-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
              bind:value={selectedEvent.description}
            />
          </div>
        </div>
      </div>
    </div>
  </fieldset>
{/if}
