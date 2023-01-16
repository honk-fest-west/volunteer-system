<script lang="ts">
  import { getContext } from 'svelte';
  import { link } from 'svelte-spa-router';
  import MainContainer from '$components/MainContainer.svelte';
  import { useAuth } from '$machines/auth';

  import { createQuestionMachine } from '$machines/question';
  import { interpret } from 'xstate';

  const { state } = useAuth();

  $: user = $state?.context?.user;
</script>

<MainContainer>
  <h1 slot="header" class="text-3xl font-extrabold text-pink-700 grow">
    H!FW Volunteers
  </h1>

  <p class="text-gray-800 text-2xl font-semibold mb-3">
    More information coming in April.
  </p>

  <br /><br />
  <p class="text-gray-800 text-xl">
    Please send any questions you may have to
    <a
      class="text-indigo-700 font-semibold underline"
      href="mailto:volunteer@honkfestwest.org">volunteer@honkfestwest.org</a
    > and we'll get back to you as soon as we can.
  </p>
  <p class="text-pink-700 text-xl font-bold mt-6">
    Thank you
    {user?.displayName}, for being a part of HONK! Fest West
  </p>
</MainContainer>
