<script lang="ts">
  import type { VEvent } from '$models';
  import { createEventDispatcher } from 'svelte';
  import { sortedJobs } from '$models/event.model';

  import JobForm from './JobForm.svelte';
  export let selectedEvent: VEvent;

  const dispatch = createEventDispatcher();

  function addJob() {
    dispatch('addjob');
  }
</script>

<fieldset class="pt-4">
  <div>
    <legend class="text-xl font-medium text-gray-900">Jobs</legend>
  </div>
  <div class="mt-4">
    {#each sortedJobs(selectedEvent.jobs) as job}
      <JobForm
        bind:job
        location={selectedEvent.location}
        on:addshift
        on:removejob
        on:removeshift
      />
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
