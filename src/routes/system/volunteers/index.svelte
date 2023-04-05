<script lang="ts">
  import type { User } from '$types';
  import { fade } from 'svelte/transition';
  import MainContainer from '$components/MainContainer.svelte';
  import TableContainer from '$components/table/TableContainer.svelte';
  import TableHead from '$components/table/TableHead.svelte';
  import TableRow from '$components/table/TableRow.svelte';
  import TableCell from '$components/table/TableCell.svelte';
  import VolunteerEmail from '$components/volunteer/VolunteerEmail.svelte';
  import { getContext, onMount } from 'svelte';
  import { formatPhoneNumber, floatToLocaleDateString } from '$util';
  const { state, send } = getContext('volunteerMachine');

  $: volunteers = $state.context.volunteers as User[];
  $: allSelected = emailAddresses?.length === allEmailAddresses?.length;
  $: allEmailAddresses = volunteers.map(
    (volunteer) => volunteer.email
  ) as string[];

  let emailAddresses: string[] = [];

  $: selectAll = () => {
    if (emailAddresses.length === allEmailAddresses.length) {
      emailAddresses = [];
    } else {
      emailAddresses = allEmailAddresses;
    }
  };

  $: selectVolunteerEmail = (email: string) => {
    if (emailAddresses.includes(email)) {
      emailAddresses = emailAddresses.filter((e) => e !== email);
    } else {
      emailAddresses = [...emailAddresses, email];
    }
  };

  onMount(() => {
    send('AT.INDEX');
  });
</script>

<div in:fade={{ duration: 100 }}>
  <MainContainer>
    <h1 slot="header" class="text-3xl font-extrabold text-pink-700 grow">
      Volunteers
    </h1>
    <div slot="actions">
      {#if emailAddresses.length}
        <VolunteerEmail {emailAddresses}>Email Selected</VolunteerEmail>
      {/if}
    </div>
    <TableContainer>
      <TableRow slot="head">
        <TableHead side="left" text="left">Name</TableHead>
        <TableHead text="right">Telephone</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Registered</TableHead>
        <TableHead side="right">
          <div class="flex justify-center items-center">
            <label for="emailAddresses" class="mr-1">
              <svg
                role="img"
                aria-labelledby="email"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <title id="email">Email</title>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </label>

            <input
              id="emailAddresses"
              type="checkbox"
              checked={allSelected}
              on:change={() => selectAll()}
            />
          </div>
        </TableHead>
      </TableRow>

      {#each volunteers as volunteer}
        <TableRow>
          <TableCell>
            <div class="flex items-center">
              <div class="h-10 w-10 flex-shrink-0">
                <img
                  class="h-10 w-10 rounded-full"
                  src={volunteer.photoURL}
                  alt=""
                />
              </div>
              <div class="ml-4 text-left">
                <div class="font-medium text-gray-900">
                  {volunteer.displayName}
                </div>
                <div class="text-indigo-500 cursor-pointer hover:underline">
                  {volunteer.email}
                </div>
              </div>
            </div>
          </TableCell>
          <TableCell text="right">
            <a
              class="text-indigo-500 hover:underline sm:hover:no-underline md:text-gray-500 md:cursor-text"
              href={`tel:${volunteer.phoneNumber}`}
              >{formatPhoneNumber(volunteer.phoneNumber)}</a
            ></TableCell
          >
          <TableCell>{volunteer.status}</TableCell>
          <TableCell>{floatToLocaleDateString(volunteer.createdAt)}</TableCell>
          <TableCell>
            <input
              type="checkbox"
              checked={emailAddresses.includes(volunteer.email)}
              on:change={() => selectVolunteerEmail(volunteer.email)}
            />
          </TableCell>
        </TableRow>
      {/each}
    </TableContainer>
  </MainContainer>
</div>
