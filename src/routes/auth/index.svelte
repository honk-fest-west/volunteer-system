<script lang="ts">
  import type { AuthStateSend } from '$machines/auth/auth.machine';
  import { fly } from 'svelte/transition';
  import { getContext } from 'svelte';
  import AuthServices from '$components/auth/AuthServices.svelte';
  import SignIn from '$components/auth/SignIn.svelte';
  import SignUp from '$components/auth/SignUp.svelte';

  const { send, state } = getContext<AuthStateSend>('auth');
  let email = '';
  let form = 'emailInput';

  function checkEmail() {
    send('CHECK_EMAIL', {data: email});
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      checkEmail();
    }
  }

  $: if ($state.matches('signedOut.signUpForm')) {
    form = 'signUp';
  } else if ($state.matches('signedOut.signInForm')) {
    form = 'passwordInput';
  }
</script>

<div>
  <h2 class="text-3xl font-extrabold text-center text-pink-700">
    {#if form === 'emailInput'}
      HONK! Volunteer
    {:else if form === 'passwordInput'}
      Welcome back!
    {:else if form === 'signUp'}
      Create an account
    {/if}
  </h2>
</div>
<div class="mt-6 relative">
  {#if form === 'emailInput'}
    <form on:submit|preventDefault={checkEmail} class="flex gap-3">
      <label for="email" class="sr-only">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        autocomplete="email"
        on:keydown={onKeydown}
        bind:value={email}
        placeholder="Email Address"
        class="block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md"
        required
      />
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded-md"
        disabled={!email}
        type="submit"
      >
        Next
      </button>
    </form>
  {:else if form === 'passwordInput'}
    <SignIn {email} />
  {:else if form === 'signUp'}
    <SignUp {email} />
  {/if}
</div>

{#if form === 'emailInput'}
  <div class="mt-8 flex justify-center">
    <label class="text-gray-500 font-bold">or continue with</label>
  </div>
  <div class="mt-8 grid grid-flow-col justify-stretch gap-3">
    <AuthServices {send} />
  </div>
{/if}

