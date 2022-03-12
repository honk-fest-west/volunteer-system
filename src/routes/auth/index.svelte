<script lang="ts">
  import { fly } from 'svelte/transition';
  import { getContext } from 'svelte';
  import AuthServices from '$components/auth/AuthServices.svelte';
  import SignIn from '$components/auth/SignIn.svelte';
  import SignUp from '$components/auth/SignUp.svelte';

  const { send, state } = getContext('auth');
  let form = 'signIn';

  $: if ($state.matches('signedOut.signUpForm')) {
    form = 'signUp';
  } else if ($state.matches('signedOut.signInForm')) {
    form = 'signIn';
  }
</script>

<div>
  <h2 class="text-3xl font-extrabold text-center text-pink-700">
    H!FW Volunteer
  </h2>
</div>
<div class="mt-8 grid grid-cols-3 gap-3">
  <AuthServices {send} />
</div>

<div class="mt-6 relative">
  <div class="relative flex justify-evenly text-sm">
    <button
      class="px-10 py-2 bg-white border-b font-semibold {form === 'signIn'
        ? 'text-gray-600  border-gray-300'
        : 'text-indigo-600 hover:text-indigo-500 border-transparent'}"
      disabled={form === 'signIn'}
      on:click={() => send('VIEW_SIGN_IN')}
    >
      Sign In
    </button>
    <button
      class="px-10 py-2 bg-white border-b font-semibold {form === 'signUp'
        ? 'text-gray-600  border-gray-300'
        : 'text-indigo-600 hover:text-indigo-500 border-transparent'}"
      disabled={form === 'signUp'}
      on:click={() => send('VIEW_SIGN_UP')}
    >
      Sign Up
    </button>
  </div>
</div>

<div class="relative h-[300px] mt-6">
  {#if form === 'signIn'}
    <div class="absolute left-0 inset-0" in:fly={{ x: 400, duration: 500 }}>
      <SignIn />
      <p class="mt-5 text-sm text-center">
        <button
          on:click={() => send('VIEW_SIGN_UP')}
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          First time here? Sign up.
        </button>
      </p>
    </div>
  {:else if form === 'signUp'}
    <div class="absolute left-0 inset-0" in:fly={{ x: -400, duration: 500 }}>
      <SignUp />
      <p class="mt-5 text-sm text-center">
        <button
          on:click={() => send('VIEW_SIGN_IN')}
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Already have an account? Sign in.
        </button>
      </p>
    </div>
  {/if}
</div>
