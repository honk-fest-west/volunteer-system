<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Job } from '$types';

  export let job: Job;
  export let color: string;

  const totalSlots = Object.values(job.shifts).reduce(
    (acc, shift) => acc + shift.slots,
    0
  );
  const signedUp = Object.values(job.shifts).reduce(
    (acc, shift) => acc + shift.signedUp,
    0
  );

  const firstLetters = job.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

  const dispatch = createEventDispatcher();

  function selectJob() {
    dispatch('selectJob', job);
  }
</script>

<li class="col-span-1 flex shadow-sm rounded-md">
  <div
    class={`${color} flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md`}
  >
    {firstLetters}
  </div>
  <div
    class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate"
  >
    <div class="flex-1 px-4 py-2 text-sm truncate">
      <button
        on:click={selectJob}
        class="text-gray-900 font-medium hover:text-gray-600">{job.name}</button
      >
      <p class="text-gray-500">{signedUp}/{totalSlots} Volunteers</p>
    </div>
    <div class="flex-shrink-0 pr-2">
      <button
        type="button"
        class="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span class="sr-only">Open options</span>
        <!-- Heroicon name: solid/dots-vertical -->
        <svg
          class="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
          />
        </svg>
      </button>
    </div>
  </div>
</li>
