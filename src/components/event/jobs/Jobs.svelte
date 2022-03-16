<script lang="ts">
  import type { VEvent } from '$models';
  import { sortedJobs } from '$models/event.model';
  import JobCard from './JobCard.svelte';
  export let selectedEvent: VEvent;

  const colors = [
    'bg-orange-600',
    'bg-teal-600',
    'bg-yellow-600',
    'bg-purple-600',
    'bg-sky-600',
    'bg-green-600',
    'bg-indigo-600',
    'bg-pink-600',
  ];
</script>

{#if selectedEvent}
  <section class="pt-4">
    <h3 class="text-xl font-medium text-gray-900">Jobs</h3>
    <ul
      class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {#each sortedJobs(selectedEvent.jobs) as job, i}
        <JobCard {job} color={colors[i % colors.length]} on:selectJob />
      {/each}
    </ul>
  </section>
{/if}
