<script lang="ts">
  import type { ShiftSignUp } from '$models';
  import type { Shift } from '$types';
  import { shortTime } from '$util';

  export let shift: Shift;
  export let signUps: ShiftSignUp[];
  export let selected;
</script>

<div
  class="min-w-0 flex-1 text-sm flex flex-col py-2"
  class:bg-indigo-200={selected}
  class:bg-opacity-10={selected}
>
  <div class="flex items-center justify-between flex-wrap px-2">
    <p class="font-medium text-gray-700">
      {shortTime(shift.from)} <span class="text-gray-400">to</span>
      {shortTime(shift.to)}
    </p>
    <p class="text-gray-500">
      {shift.location || ''}
      <span class="text-gray-700 font-medium ml-1"
        >{shift.signedUp}/{shift.slots}</span
      >
    </p>
  </div>
  <ul class="mt-1 ">
    {#each signUps as signUp}
      <li class="flex items-center mt-1">
        <div class="ml-4 flex items-start ">
          <button class="font-medium text-indigo-500 hover:underline flex-none">
            {signUp.volunteerDisplayName}
          </button>
          {#if signUp.comment}
            <p class="ml-2 text-gray-500">{signUp.comment}</p>
          {/if}
        </div>
      </li>
    {/each}
  </ul>
</div>
