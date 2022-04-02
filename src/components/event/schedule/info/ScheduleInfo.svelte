<script lang="ts">
  import type { ShiftSignUp, VEvent } from '$models';
  import { timeToInt } from '$util';
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import ScheduleInfoShift from './ScheduleInfoShift.svelte';
  import VolunteerEmail from '$components/volunteer/VolunteerEmail.svelte';

  export let selectedEvent: VEvent;
  export let selectedJobId: string;
  export let selectedShiftIds: string[];
  export let signUps: { [shiftId: string]: ShiftSignUp[] };

  $: job = selectedEvent?.jobs[selectedJobId];
  $: shifts = Object.values(job?.shifts || {}).sort(
    (a, b) => timeToInt(a.from) - timeToInt(b.from)
  );
  $: emailAddresses = Object.values(signUps || {}).reduce(
    (acc, signUp) => [...acc, ...signUp.map((s) => s.volunteerEmail)],
    [] as string[]
  );

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
          transition:fly={{ x: 100, duration: 100 }}
        >
          <div class="flex h-full flex-col bg-white shadow-xl">
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
            <div
              class="flex justify-between pl-6 pr-10 pt-2 pb-2 text-sm font-medium text-gray-00 opacity-80 bg-gray-100 items-end"
            >
              <div>
                {#if emailAddresses.length}
                  <VolunteerEmail {emailAddresses}>Signed Up</VolunteerEmail>
                {/if}
              </div>
              <span>signed-up / slots</span>
            </div>
            <div class="relative flex-1  px-4 sm:px-6 overflow-y-scroll">
              <div class="absolute inset-0 pb-6 px-4 sm:px-6">
                <div class="border-t border-b border-gray-200">
                  <h3 class="sr-only">Shift Sign Ups</h3>
                  <div class="divide-y divide-gray-200 ">
                    {#each shifts as shift}
                      <ScheduleInfoShift
                        {shift}
                        selected={selectedShiftIds.includes(shift.id)}
                        signUps={signUps[shift.id] || []}
                      />
                    {/each}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
