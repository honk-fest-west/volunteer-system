<script lang="ts">
  import type { Job, VEvent } from '$models';
  import type { Shift } from '$types';
  import { shortTime, timeToInt } from '$util';

  export let event: VEvent;

  const shifts: Array<Shift & { job: Job }> = Object.values(event.jobs)
    .reduce((acc, job) => {
      return acc.concat(
        Object.values(job.shifts).map((shift) => ({
          ...shift,
          job,
        }))
      );
    }, [])
    .sort((a, b) => timeToInt(a.from) - timeToInt(b.from));
</script>

<div class="flex flex-col space-y-2 ">
  {#each shifts as shift}
    <div
      class=" font-normal text-gray-50 flex space-x-2 opacity-90 rounded-tr-lg"
      style="background-color: {shift.job.color}; border-top: 3px solid {shift
        .job.color}"
    >
      <div
        class="text-md bg-gray-50 flex flex-col items-center px-1 font-bold w-2/6"
        style="color: {shift.job.color}"
      >
        {shortTime(shift.from)} <span class="opacity-70">to</span>
        {shortTime(shift.to)}
      </div>
      <div
        class="opacity-90 flex flex-col justify-center items-center flex-grow"
      >
        <span class="block font-semibold text-xl">{shift.job.name}</span>
        <span class="block text-md " class:hidden={!shift.location}
          >{shift.location}</span
        >
      </div>
    </div>
  {/each}
</div>
