<script lang="ts">
  import type { Job } from '$models';
  import { createEventDispatcher } from 'svelte';
  import ShiftForm from './ShiftForm.svelte';
  import { sortedShifts } from '$models/event.model';
  export let job: Job;
  export let location: string;

  const dispatch = createEventDispatcher();

  let minimized: boolean =
    !!job.name?.length &&
    !!Object.values(job.shifts).length &&
    !!Object.values(job.shifts).every((s) => !!s.from && !!s.to);

  function addShift() {
    dispatch('addshift', job.id);
  }
  function removeJob() {
    dispatch('removejob', job.id);
  }
</script>

<fieldset class="mb-4 ">
  <div class="p-4 rounded bg-gray-100 flex " class:items-center={minimized}>
    <div class="mr-4 text-gray-500 flex-none flex flex-col items-center">
      <button
        class="rounded-lg border border-gray-300 flex items-center hover:bg-gray-200"
        on:click={() => (minimized = !minimized)}
      >
        {#if minimized}
          <span class="material-icons !text-lg"> expand_more </span>
        {:else}
          <span class="material-icons !text-lg"> expand_less </span>
        {/if}
      </button>
      {#if !minimized}
        <button
          class="mt-3 rounded-lg border border-gray-300 flex items-center hover:bg-gray-200"
          on:click={removeJob}
        >
          <span class="material-icons !text-lg"> delete </span>
        </button>
      {/if}
    </div>
    {#if minimized}
      <h3 class="text-md font-medium text-gray-700" class:hidden={!job.name}>
        {job.name}
      </h3>

      <div class="flex-grow flex justify-end">
        <div class="h-7 w-8 " style="background-color: {job.color}" />
      </div>
    {:else}
      <div class="grid grid-cols-6 gap-6 pt-1 flex-grow">
        <div class="col-span-5 sm:col-span-3">
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <input
            type="text"
            name="job-name"
            autocomplete="job-name"
            class="mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            bind:value={job.name}
          />
        </div>

        <div class="col-span-1 sm:col-span-3 flex justify-end">
          <div>
            <label for="color" class="block text-sm font-medium text-gray-700"
              >Color</label
            >
            <input
              type="color"
              name="color"
              class="w-9 h-9 mt-2 rounded cursor-pointer"
              bind:value={job.color}
            />
          </div>
        </div>

        <div class="col-span-6">
          <label
            for="description"
            class="block text-sm font-medium text-gray-700">Description</label
          >
          <div class="mt-2">
            <textarea
              name="job-description"
              autocomplete="event-description"
              placeholder="Brief description of job responsibilities."
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
              bind:value={job.description}
            />
          </div>
        </div>

        <div class="col-span-6">
          <label for="shifts" class="block text-sm font-medium text-gray-700"
            >Shifts</label
          >
          <div class="mt-4">
            {#each sortedShifts(job.shifts) as shift}
              <ShiftForm bind:shift {location} on:removeshift />
            {/each}
            <button
              type="button"
              class="text-sm font-medium text-indigo-700 flex items-center hover:bg-gray-200 py-1 pr-3 pl-1 rounded mt-2"
              on:click={addShift}
            >
              <span class="material-icons mr-1 !text-lg"> add </span>
              Add Shift
            </button>
          </div>
        </div>
      </div>
    {/if}
  </div>
</fieldset>
