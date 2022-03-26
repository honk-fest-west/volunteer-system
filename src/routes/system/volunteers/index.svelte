<script lang="ts">
  import type { User } from '$types';
  import { fade } from 'svelte/transition';
  import MainContainer from '$components/MainContainer.svelte';
  import TableContainer from '$components/table/TableContainer.svelte';
  import TableHead from '$components/table/TableHead.svelte';
  import TableRow from '$components/table/TableRow.svelte';
  import TableCell from '$components/table/TableCell.svelte';
  import { getContext, onMount } from 'svelte';
  import { formatPhoneNumber } from '$util';
  const { state, send } = getContext('volunteerMachine');

  $: volunteers = $state.context.volunteers as User[];

  onMount(() => {
    send('AT.INDEX');
  });
</script>

<div in:fade={{ duration: 100 }}>
  <MainContainer>
    <h1 slot="header" class="text-3xl font-extrabold text-pink-700 grow">
      Volunteers
    </h1>
    <TableContainer>
      <TableRow slot="head">
        <TableHead side="left" text="left">Name</TableHead>
        <TableHead text="right">Telephone</TableHead>
        <TableHead side="right">Status</TableHead>
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
        </TableRow>
      {/each}
    </TableContainer>
  </MainContainer>
</div>
