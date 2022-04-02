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
  import { formatPhoneNumber } from '$util';
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
  {#key emailAddresses}
    <MainContainer>
      <h1 slot="header" class="text-3xl font-extrabold text-pink-700 grow">
        Volunteers
      </h1>
      <div slot="actions">
        <VolunteerEmail {emailAddresses} />
      </div>
      <TableContainer>
        <TableRow slot="head">
          <TableHead side="left" text="left">Name</TableHead>
          <TableHead text="right">Telephone</TableHead>
          <TableHead>Status</TableHead>
          <TableHead side="right">
            <label for="emailAddresses">Email</label>

            <input
              id="emailAddresses"
              type="checkbox"
              checked={allSelected}
              on:change={() => selectAll()}
            />
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
                <div class="ml-4">
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
  {/key}
</div>
