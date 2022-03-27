<script lang="ts">
  import type { Job } from '$models';

  export let jobs: Job[];
  export let mobileJob: number;

  $: numJobs = jobs.length;

  function firstLetters(name: string): string {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 3)
      .toUpperCase();
  }
</script>

{#key mobileJob}
  <div
    class="variable-cols grid text-sm leading-6 text-gray-500 sm:hidden"
    style="--num-jobs: {numJobs}"
  >
    {#each jobs as job, i}
      {#if mobileJob === i}
        <button type="button" class="flex flex-col items-center pt-2 pb-3"
          ><span
            class="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-white rounded-full opacity-80"
            style="background-color: {job.color}">{firstLetters(job.name)}</span
          ></button
        >
      {:else}
        <button
          type="button"
          on:click={() => (mobileJob = i)}
          class="flex flex-col items-center pt-2 pb-3"
          ><span
            class="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900"
            >{firstLetters(job.name)}</span
          ></button
        >
      {/if}
    {/each}
  </div>
{/key}

<style>
  .variable-cols {
    grid-template-columns: repeat(var(--num-jobs), minmax(0, 1fr));
  }
</style>
