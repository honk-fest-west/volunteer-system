<script lang="ts">
  import EventRow from './EventRow.svelte';
  import type { VEvent } from '$models';
  export let events: VEvent[];

  $: sortedEvents = events.sort((a: VEvent, b: VEvent) => a.compareTo(b));
</script>

<div class="flex flex-col">
  <div class="-my-2 overflow-x-auto  sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div
        class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
      >
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >Name</th
              >
              <th
                scope="col"
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >Date</th
              >
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >Status</th
              >
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each sortedEvents as event}
              <EventRow {event} on:select />
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
