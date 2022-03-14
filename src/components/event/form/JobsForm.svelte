<script lang="ts">
  import type { VEvent, Job } from '$types';

  import JobForm from './JobForm.svelte';
  export let selectedEvent: VEvent;
  export let send;

  function addJob() {
    send('ADD_JOB');
  }

  function sortedJobs(event: VEvent): Job[] {
    return Object.values(event.jobs).sort(
      (a: Job, b: Job) => a.createdAt?.seconds - b.createdAt?.seconds
    );
  }
</script>

<fieldset class="pt-4">
  <div>
    <legend class="text-xl font-medium text-gray-900">Jobs</legend>
  </div>
  <div class="mt-4">
    {#each sortedJobs(selectedEvent) as job}
      <JobForm bind:job {send} />
    {/each}
    <button
      type="button"
      class="text-sm font-medium text-indigo-700 flex items-center hover:bg-gray-200 py-1 pr-3 pl-1 rounded"
      on:click={addJob}
    >
      <span class="material-icons mr-1"> add </span>
      Add Job
    </button>
  </div>
</fieldset>
