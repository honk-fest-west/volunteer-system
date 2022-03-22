<script lang="ts">
  import type { Shift } from '$types';
  import { createEventDispatcher } from 'svelte';
  export let shift: Shift;
  export let location: string;

  const dispatch = createEventDispatcher();

  function removeShift() {
    dispatch('removeshift', shift.id);
  }
</script>

<div class="flex items-center">
  <div class="mr-4 text-gray-500">
    <button
      class="mt-3 rounded-lg border border-gray-300 flex items-center hover:bg-gray-200"
      on:click={removeShift}
    >
      <span class="material-icons"> delete </span>
    </button>
  </div>
  <fieldset class="grid grid-cols-4 gap-3 mb-3">
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700"
        >From</label
      >
      <div class="mt-1">
        <input
          type="time"
          name="from"
          bind:value={shift.from}
          step="600"
          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700"
        >To</label
      >
      <div class="mt-1">
        <input
          type="time"
          name="ti"
          bind:value={shift.to}
          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>
    <div>
      <label for="slots" class="block text-sm font-medium text-gray-700"
        >Slots</label
      >
      <div class="mt-1">
        <input
          type="number"
          name="slots"
          bind:value={shift.slots}
          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>
    <div>
      <label for="slots" class="block text-sm font-medium text-gray-700"
        >Location</label
      >
      <div class="mt-1">
        <input
          type="text"
          name="location"
          placeholder={location || ''}
          bind:value={shift.location}
          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>
  </fieldset>
</div>
