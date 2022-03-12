<script lang="ts">
  import { fly } from 'svelte/transition';
  export let state;
  export let send;

  $: user = $state?.context?.user;

  let menuOpen = false;
</script>

<div class="px-3 relative inline-block text-left">
  <div>
    <button
      type="button"
      class="group w-full bg-gray-600 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-500 focus:ring-indigo-300"
      id="options-menu-button"
      aria-expanded="false"
      aria-haspopup="true"
      data-testid="sidebar-account-menu"
      on:click={() => (menuOpen = !menuOpen)}
    >
      <span class="flex w-full justify-between items-center">
        <span class="flex min-w-0 items-center justify-between space-x-3">
          <img
            class="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
            src={user?.photoURL}
            alt=""
          />
          <span class="flex-1 flex flex-col min-w-0">
            <span class="text-gray-200 text-sm font-medium truncate"
              >{user?.displayName}</span
            >
            <span class="text-gray-400 text-sm truncate">{user?.email}</span>
          </span>
        </span>
        <!-- Heroicon name: solid/selector -->
        <svg
          class="flex-shrink-0 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </button>
  </div>

  <!--
		Dropdown menu, show/hide based on menu state.
	
		Entering: "transition ease-out duration-100"
			From: "transform opacity-0 scale-95"
			To: "transform opacity-100 scale-100"
		Leaving: "transition ease-in duration-75"
			From: "transform opacity-100 scale-100"
			To: "transform opacity-0 scale-95"
	-->
  {#if menuOpen}
    <div
      class="z-10 mx-3 origin-top absolute right-0 left-0 mt-2 rounded-md shadow-lg bg-gray-100 ring-1 ring-black ring-opacity-5 divide-y divide-gray-300 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu-button"
      tabindex="-1"
      on:click={() => (menuOpen = false)}
      on:mouseleave={() => (menuOpen = false)}
      transition:fly={{ y: -10, duration: 200 }}
    >
      <div class="py-1" role="none">
        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
        <a
          href="/account"
          class="text-gray-700 block px-4 py-2 text-sm"
          role="menuitem"
          tabindex="-1"
          data-testid="sidebar-account-account"
          id="options-menu-item-0">My Account</a
        >
      </div>
      <div class="py-1" role="none">
        <button
          on:click={() => send('LOGOUT')}
          class="text-gray-700 block px-4 py-2 text-sm"
          role="menuitem"
          tabindex="-1"
          data-testid="sidebar-account-signout"
          id="options-menu-item-1">Sign Out</button
        >
      </div>
    </div>
  {/if}
</div>
