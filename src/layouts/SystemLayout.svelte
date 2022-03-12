<script lang="ts">
  import { setContext } from 'svelte';
  import SidebarMobile from '$components/sidebar/SidebarMobile.svelte';
  import SidebarDesktop from '$components/sidebar/SidebarDesktop.svelte';
  import Sidebar from '$components/sidebar/Sidebar.svelte';
  import { useAuth } from '$machines/auth';
  import Spinner from '$components/Spinner.svelte';

  const { state, send } = useAuth();
  setContext('auth', { state, send });

  let openSidebar = false;
</script>

<div>
  {#if $state.matches('signedIn')}
    <SidebarMobile bind:open={openSidebar}>
      <Sidebar
        {state}
        {send}
        className="flex-1 h-0 pt-5 pb-4 overflow-y-auto"
      />
    </SidebarMobile>
    <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <SidebarDesktop>
        <Sidebar
          {state}
          {send}
          className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto"
        />
      </SidebarDesktop>
    </div>
    <div class="md:pl-64 flex flex-col flex-1">
      <div
        class="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100"
      >
        <button
          type="button"
          on:click={(_) => (openSidebar = true)}
          class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          <span class="sr-only">Open sidebar</span>
          <!-- Heroicon name: outline/menu -->
          <svg
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <main class="flex-1">
        <div class="pb-6">
          <slot />
        </div>
      </main>
    </div>
  {/if}
</div>
<Spinner />
