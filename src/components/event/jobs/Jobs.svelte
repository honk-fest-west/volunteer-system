<script lang="ts">
  import type { VEvent, VolunteerJobShiftsCollection } from '$types';
  import { bubble } from 'svelte/internal';
  import JobCard from './JobCard.svelte';
  export let selectedEvent: VEvent;
  export let volunteerJobShifts: VolunteerJobShiftsCollection;
  export let send;

  const jobs = Object.values(selectedEvent.jobs);

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

{#if selectedEvent && volunteerJobShifts}
  <section class="pt-4">
    <h3 class="text-xl font-medium text-gray-900">Jobs</h3>
    <ul
      role="list"
      class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {#each jobs as job, i}
        <JobCard
          {job}
          volunteerJobShifts={volunteerJobShifts[job.id]}
          color={colors[i % colors.length]}
        />
      {/each}
    </ul>
  </section>
{/if}
