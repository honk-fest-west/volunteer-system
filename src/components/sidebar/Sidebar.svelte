<script>
  import SidebarAccount from './SidebarAccount.svelte';
  import SidebarItem from './SidebarItem.svelte';
  export let className = '';
</script>

<div class={className}>
  <SidebarAccount />
  <nav class="mt-5 flex-1 px-2 space-y-1">
    <SidebarItem href="/system">
      <!-- Heroicon name: outline/home -->
      <svg
        class="text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
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
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
      Home
    </SidebarItem>

    <SidebarItem href="/system/volunteers">
      <!-- Heroicon name: outline/users -->
      <svg
        class="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
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
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      Volunteers
    </SidebarItem>

    <SidebarItem href="/system/events">
      <!-- Heroicon name: outline/calendar -->
      <svg
        class="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
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
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      Events
    </SidebarItem>

    <SidebarItem href="/system/shifts">
      <!-- Heroicon name: outline/calendar -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      Sign Up Here >>
    </SidebarItem>

    <SidebarItem href="/system/documents">
      <!-- Heroicon name: outline/inbox -->
      <svg
        class="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
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
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
      Documents
    </SidebarItem>
  </nav>
</div>
