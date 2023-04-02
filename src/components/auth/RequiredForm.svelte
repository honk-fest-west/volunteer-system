<script lang="ts">
  import type { AuthStateSend } from '$machines/auth/auth.machine';
  import { getContext, onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  const { state } = getContext<AuthStateSend>('auth');
  const dispatch = createEventDispatcher();

  let displayNameEl: HTMLInputElement;
  onMount(() => {
    displayNameEl.focus();
  })


  $: data = $state.context.user || {
    displayName: '',
    email: '',
    phoneNumber: '',
  };

  function submit() {
    dispatch('submit', data);
  }
</script>

<form on:submit|preventDefault={submit} class="space-y-6">
  <div>
    <label for="displayName" class="block text-sm font-medium text-gray-700">
      Display Name
    </label>
    <div class="mt-1">
      <input
        id="displayName"
        name="displayName"
        type="text"
        required
        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        bind:value={data.displayName}
        bind:this={displayNameEl}
      />
    </div>
  </div>
  <div>
    <label for="email" class="block text-sm font-medium text-gray-700">
      Email address
    </label>
    <div class="mt-1">
      <input
        id="email"
        name="email"
        type="email"
        autocomplete="email"
        required
        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        bind:value={data.email}
      />
    </div>
  </div>
  <div>
    <label for="phoneNumber" class="block text-sm font-medium text-gray-700">
      Phone Number
    </label>
    <div class="mt-1">
      <input
        id="phoneNumber"
        name="phoneNumber"
        type="tel"
        required
        placeholder="888 888 8888"
        pattern={'[0-9]{3}.?[0-9]{3}.?[0-9]{4}'}
        maxlength="12"
        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        bind:value={data.phoneNumber}
      />
    </div>
  </div>

  <div class="pt-2">
    <button
      type="submit"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Complete
    </button>
  </div>
</form>
