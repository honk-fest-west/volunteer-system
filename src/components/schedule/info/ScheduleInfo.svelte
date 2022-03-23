<script lang="ts">
  import type { JobSignUpCollection } from '$types';
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  // import { Job, type VEvent } from '$models';
  import type { VEvent } from '$models';

  export let selectedEvent: VEvent;
  export let selectedJobId: string;
  export let signUps: JobSignUpCollection;
  // export let disabled = true;

  $: job = selectedEvent?.jobs[selectedJobId];
  // $: shifts = job ? Job.from(job).selectableShifts(signUps) : [];

  const dispatch = createEventDispatcher();

  function close() {
    dispatch('close');
  }
</script>

{#if job}
  <div
    class="fixed inset-0 overflow-hidden z-30"
    aria-labelledby="slide-over-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="absolute inset-0 overflow-hidden">
      <!-- Background overlay, show/hide based on slide-over state. -->
      <div class="absolute inset-0 " aria-hidden="true" on:click={close} />

      <div
        class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
      >
        <div
          class="pointer-events-auto w-screen max-w-md"
          transition:fly={{ x: 100, duration: 300 }}
        >
          <div
            class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
          >
            <div
              class="py-6 px-4 sm:px-6"
              style="background-color: {job.color};"
            >
              <div class="flex items-center justify-between">
                <h2
                  class="text-lg font-medium text-white"
                  id="slide-over-title"
                >
                  {job.name}
                </h2>
                <div class="ml-3 flex h-7 items-center">
                  <button
                    type="button"
                    class="rounded-md opacity-70 text-white hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
                    on:click={close}
                  >
                    <span class="sr-only">Close panel</span>
                    <!-- Heroicon name: outline/x -->
                    <svg
                      class="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="mt-1">
                <p class="text-sm text-white opacity-70">
                  {job.description}
                </p>
              </div>
            </div>
            <div class="relative flex-1 py-6 px-4 sm:px-6">
              <div class="absolute inset-0 py-6 px-4 sm:px-6">
                <fieldset class="border-t border-b border-gray-200">
                  <legend class="sr-only">Select Shifts</legend>
                  <div class="divide-y divide-gray-200">
                    <!-- {#each shifts as selectableShift}
                      <SelectShift
                        {selectableShift}
                        {disabled}
                        eventLocation={selectedEvent.location}
                        on:signUp={signUp}
                        on:unsignUp={unsignUp}
                        on:comment
                      />
                    {/each} -->
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
