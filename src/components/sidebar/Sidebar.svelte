<script>
    import { prefix } from '$routes/prefix';
  import SidebarAccount from './SidebarAccount.svelte';
  import SidebarItem from './SidebarItem.svelte';
  import SidebarLabel from './SidebarLabel.svelte';
  export let className = '';
  export let open = false;
</script>

<div class={className}>
  <SidebarAccount />
  <nav class="mt-5 flex-1 px-2 space-y-1">
    <SidebarItem href="/system" on:click={() => (open = !open)}>
      <!-- Heroicon name: outline/home -->
      <svg
        class=" mr-3 flex-shrink-0 h-6 w-6"
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

    <SidebarItem href="/system/shifts" on:click={() => (open = !open)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class=" group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
      Sign Up Here >></SidebarItem
    >

    <SidebarItem href="/system/my-schedule" on:click={() => (open = !open)}>
      <!-- Heroicon name: outline/calendar -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class=" group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
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
      My Schedule
    </SidebarItem>

    <SidebarItem
      external={true}
      href="https://drive.google.com/drive/folders/1xRGarudRsANgvnOpEQRIxwuqx3ctdAJz?usp=sharing"
      on:click={() => (open = !open)}
    >
      <!-- Heroicon name: outline/inbox -->
      <svg
        class="group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
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

    <SidebarLabel admin={true}>Admin</SidebarLabel>

    <SidebarItem
      admin={true}
      href={prefix.admin_volunteers_path()}
      on:click={() => (open = !open)}
    >
      <!-- Heroicon name: outline/users -->
      <svg
        class=" group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
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

    <SidebarItem
      admin={true}
      href={prefix.admin_events_path()}
      on:click={() => (open = !open)}
    >
      <!-- Heroicon name: outline/calendar -->
      <svg
        class=" group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
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

    <SidebarItem
      admin={true}
      href={prefix.admin_questions_path()}
      on:click={() => (open = !open)}
    >
      <svg
        class=" group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
        />
      </svg>

      Questions
    </SidebarItem>
  </nav>
</div>
