<script lang="ts">
  import { getContext } from 'svelte';
  import MainContainer from '$components/MainContainer.svelte';
  import { useAuth } from '$machines/auth';

  const { state } = useAuth();
  // const { state } = getContext('auth');

  $: user = $state?.context?.user;
</script>

<MainContainer>
  <h1 slot="header" class="text-3xl font-extrabold text-pink-700 grow">
    H!FW Volunteers
  </h1>
  <p class="text-gray-800 text-xl">
    Hello there!
    <br /><br />
    We are still setting up shifts, but check back in a few weeks. We'll also send
    you an email when it's time to sign up for shifts or when there's an update.&nbsp;&nbsp;Please
    send any questions you may have to
    <a class="text-indigo-700" href="mailto:volunteer@honkfestwest.org"
      >volunteer@honkfestwest.org</a
    > and we'll get back to you as soon as we can.
  </p>
  <p class="text-pink-700 text-xl font-bold mt-6">
    Thank you
    {user?.displayName}, for being a part of HONK! Fest West
  </p>
</MainContainer>
