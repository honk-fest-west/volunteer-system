<script lang="ts">
  import type { User } from '$types';
  import { fade } from 'svelte/transition';
  import MainContainer from '$components/MainContainer.svelte';
  import { getContext, onMount } from 'svelte';

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
    <div class="flex flex-col">
      <div class="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle px-1">
          <div class="shadow-sm ring-1 ring-black ring-opacity-5">
            <table class="min-w-full border-separate" style="border-spacing: 0">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="sticky top-[132px] sm:top-[83px] z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                    >Name</th
                  >
                  <th
                    scope="col"
                    class="sticky top-[132px] sm:top-[83px] z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter "
                    >Telephone</th
                  >
                  <th
                    scope="col"
                    class="sticky top-[132px] sm:top-[83px] z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter "
                    >Status</th
                  >
                </tr>
              </thead>
              <tbody class="bg-white">
                {#each volunteers as volunteer}
                  <tr>
                    <td
                      class="whitespace-nowrap border-b border-gray-200 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                    >
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
                          <div
                            class="text-indigo-500 cursor-pointer hover:underline"
                          >
                            {volunteer.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-indigo-500 sm:text-gray-500 "
                      ><a
                        class="cursor-text"
                        href={`tel:${volunteer.phoneNumber}`}
                        >{volunteer.phoneNumber}</a
                      ></td
                    >
                    <td
                      class="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500"
                      >{volunteer.status}</td
                    >
                  </tr>
                {/each}

                <!-- More people... -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </MainContainer>
</div>
