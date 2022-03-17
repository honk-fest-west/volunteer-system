<script lang="ts">
  import { Job, type VEvent } from '$models';
  import { sortedJobs } from '$models/event.model';
  import JobApplyCard from './JobApplyCard.svelte';
  export let selectedEvent: VEvent;
</script>

{#if selectedEvent}
  <section class="pt-4">
    <h3 class="text-xl font-medium text-gray-900">Jobs</h3>
    <ul
      class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {#each sortedJobs(selectedEvent.jobs) as job, i}
        <li class="col-span-1">
          <JobApplyCard job={Job.from(job)} on:selectJob />
        </li>
      {/each}
    </ul>
  </section>
{/if}
