<script lang="ts">
  import { getContext } from 'svelte';
  import { link } from 'svelte-spa-router';
  import MainContainer from '$components/MainContainer.svelte';
  import { useAuth } from '$machines/auth';

  import { createQuestionMachine } from '$machines/questionModal';
  import { interpret } from 'xstate';

  const { state } = useAuth();

  $: user = $state?.context?.user;
</script>

<MainContainer>
  <h1 slot="header" class="text-3xl font-extrabold text-pink-700 grow">
    H!FW Volunteers
  </h1>

  <p class="text-gray-800 text-xl font-semibold mb-3">
    We're ready if you are!
  </p>

  <ul class="list-disc list-inside leading-loose text-xl">
    <li>
      Select <a
        class="text-indigo-700 font-semibold underline"
        href="/system/shifts"
        use:link>Sign Up Here >></a
      > from the menu and select an Event to sign up for volunteer shifts.
    </li>
    <li>
      <a
        class="text-indigo-700 font-semibold underline"
        href="/system/my-schedule"
        use:link>My Schedule</a
      > will show you your selected shifts for the upcomming event.
    </li>

    <li>
      The <a
        class="text-indigo-700 font-semibold underline"
        href="https://drive.google.com/drive/folders/1xRGarudRsANgvnOpEQRIxwuqx3ctdAJz?usp=sharing"
        >Documents</a
      > folder provides information regarding job descriptions, volunteer requirements,
      and other documents.
    </li>
  </ul>

  <br />
  <p class="text-gray-800 text-xl font-semibold mb-3">Festival Dates:</p>
  <ul class="list-disc list-inside leading-loose text-xl">
    <li>
      <a
        class="text-indigo-700 font-semibold underline"
        href="/system/shifts/f5PK6Zf9uZUtDl0n7etF"
        use:link>Friday, June 2rd, 6-10pm</a
      >
    </li>
    <li>
      <a
        class="text-indigo-700 font-semibold underline"
        href="/system/shifts/Y6Kx1yPc0w8OlKuRYqdG"
        use:link>Saturday, June 3th, 12-8pm</a
      >
    </li>
    <li>
      <a
        class="text-indigo-700 font-semibold underline"
        href="/system/shifts/7eVvSCGXxMjaeVtEMlZj"
        use:link>Sunday, June 4th, 12-6pm</a
      >
    </li>
  </ul>

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
