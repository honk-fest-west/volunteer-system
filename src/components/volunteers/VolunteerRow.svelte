<script>
  import { formatPhoneNumber } from '$utils/formatters';
  export let volunteer;
</script>

<tr>
  <td class="px-6 py-4 whitespace-nowrap">
    <div class="flex items-center">
      <div class="flex-shrink-0 h-10 w-10">
        <img class="h-10 w-10 rounded-full" src={volunteer.photoURL} alt="" />
      </div>
      <div class="ml-4">
        <div class="text-sm font-medium text-gray-900">
          {volunteer.displayName}
        </div>
        {#if volunteer.email}
          <a
            href="mailto:{volunteer.email}"
            class="block text-sm text-indigo-600 hover:text-indigo-900"
            >{volunteer.email}</a
          >
        {/if}
      </div>
    </div>
  </td>
  <td class="px-6 py-4 whitespace-nowrap">
    <div class="text-sm text-gray-500">
      {formatPhoneNumber(volunteer.phoneNumber) || volunteer.phoneNumber}
    </div>
  </td>
  <td class="px-6 py-4 whitespace-nowrap">
    {#if volunteer.status === 'active'}
      <span
        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
      >
        Active
      </span>
    {:else if volunteer.status === 'pending'}
      <span
        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"
      >
        Pending
      </span>
    {:else if volunteer.status === 'inactive'}
      <span
        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
      >
        Inactive
      </span>
    {/if}
  </td>
  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
    <a
      href="/volunteers/edit/{volunteer.id}"
      class="text-indigo-600 hover:text-indigo-900">Shifts</a
    >
  </td>
</tr>
