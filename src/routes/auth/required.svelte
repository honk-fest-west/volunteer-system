<script lang="ts">
  import { getContext } from 'svelte';
  import { replace } from 'svelte-spa-router';
  import RequiredForm from '$components/auth/RequiredForm.svelte';

  const { state, send } = getContext('auth');

  $: data = $state.context.user || {
    displayName: '',
    email: '',
    phoneNumber: '',
  };

  function submit() {
    send('SUBMIT_REQUIRED', { data });
  }
  function differentAccount() {
    send('LOGOUT');
  }

  if ($state.matches('signedIn')) {
    replace('/system');
  }
</script>

<div>
  <h2 class="mt-6 text-3xl font-extrabold text-center text-pink-700">
    Finish Signing Up
  </h2>
</div>

<div class="mt-6">
  <RequiredForm on:submit={submit} />
  <p class="mt-5 text-sm text-center">
    <button
      on:click={differentAccount}
      class="font-medium text-indigo-600 hover:text-indigo-500"
    >
      Or sign in with a different account.
    </button>
  </p>
</div>
