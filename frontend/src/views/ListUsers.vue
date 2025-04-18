<template>
  <div class="w-full flex flex-wrap justify-between items-center px-5 pt-5 gap-3">
    <h1 class="text-xl font-bold uppercase text-left min-w-[80px]">List Users</h1>
    <div class="flex gap-2 items-center justify-start md:justify-end min-w-[370px]">
      <span class="text-sm">Rows per page</span>
      <div class="border rounded-md pr-2">
        <select v-model="perPage" class="border-none outline-none p-2">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
      <div class="flex justify-center items-center gap-2">
        <button
          :disabled="currentPage === 1"
          class="h-10 w-10 flex justify-center items-center rounded-full hover:bg-sky-100 disabled:text-gray-400 disabled:hover:bg-transparent"
          @click="currentPage = currentPage - 1"
        >
          <ChevronLeftIcon class="w-5 h-5" />
        </button>
        <p class="flex">{{ currentPage }} of {{ totalPages }}</p>
        <button
          :disabled="currentPage === totalPages"
          class="h-10 w-10 flex justify-center items-center rounded-full hover:bg-sky-100 disabled:text-gray-400 disabled:hover:bg-transparent"
          @click="currentPage = currentPage + 1"
        >
          <ChevronRightIcon class="w-5 h-5" />
        </button>
      </div>
      <button
        @click="fetchUsers"
        class="h-10 w-10 flex justify-center items-center rounded-full hover:bg-sky-100 cursor-pointer"
      >
        <ArrowPathIcon class="w-5 h-5" />
      </button>
    </div>
    <div class="lex items-center justify-end min-w-[100px]">
      <router-link to="/users/add">
        <DefaultButton type="primary">Add User</DefaultButton>
      </router-link>
    </div>
  </div>
  <div class="flex flex-col p-5 overflow-x-scroll">
    <table class="table-auto text-sm min-w-[1100px]">
      <thead class="bg-sky-600 text-white">
        <tr>
          <th v-for="title in titles" :key="title" class="py-2 px-4 text-left">{{ title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in users"
          :key="user.id"
          :class="[index % 2 === 0 ? 'bg-sky-100' : 'bg-sky-50']"
        >
          <td class="py-2 px-4">
            <img
              v-if="user.profile_picture"
              :src="`http://localhost:8000/storage/${user.profile_picture}`"
              alt="Profile Picture"
              class="w-10 h-10 rounded-full object-cover"
            />
            <div v-else class="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
              <UserIcon class="w-6 h-6 text-gray-500" />
            </div>
          </td>
          <td class="py-2 px-4">{{ user.name }}</td>
          <td class="py-2 px-4">{{ user.email }}</td>
          <td class="py-2 px-4">{{ user.phone_number }}</td>
          <td class="py-2 px-4">{{ user.address }}</td>
          <td class="py-2 px-4">{{ user.age }}</td>
          <td class="py-2 px-4 grid grid-cols-2 gap-2">
            <router-link :to="`/users/update/${user.id}`">
              <DefaultButton type="success">Update</DefaultButton>
            </router-link>
            <DefaultButton type="danger" @click="openConfirmBox(user.id)">Delete</DefaultButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <ConfirmBox
    v-if="showConfirmBox"
    :message="confirmMessage"
    @confirm="deleteUser(userIdToDelete)"
    @cancel="handleCancel"
  />
  <AlertBox
    v-if="showAlert"
    :type="alertType"
    :message="alertMessage"
    @closeAlert="showAlert = false"
  />
  <FullScreenSpinner v-if="isLoading" />
</template>

<script setup>
  import { onMounted, ref, watch } from 'vue'
  import api from '@/api/axios.js'
  import DefaultButton from '@/components/DefaultButton.vue'
  import {
    ArrowPathIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    UserIcon,
  } from '@heroicons/vue/24/outline'
  import ConfirmBox from '@/components/ConfirmBox.vue'
  import AlertBox from '@/components/AlertBox.vue'
  import FullScreenSpinner from '@/components/FullScreenSpinner.vue'
  const users = ref([])
  const titles = ref(['', 'Name', 'Email', 'Phone Number', 'Address', 'Age', ''])
  const currentPage = ref(1)
  const totalPages = ref(1)
  const perPage = ref(5)
  const showConfirmBox = ref(false)
  const confirmMessage = ref('')
  const userIdToDelete = ref(null)
  const showAlert = ref(false)
  const alertMessage = ref('')
  const alertType = ref('success')
  const isLoading = ref(false)

  // Fetch Users
  const fetchUsers = async () => {
    isLoading.value = true
    const res = await api.get(`/users?page=${currentPage.value}&per_page=${perPage.value}`)
    users.value = res.data.data
    totalPages.value = res.data.last_page
    isLoading.value = false
  }

  // Fetch Users on Mount
  onMounted(fetchUsers)

  // Fetch Users on Page Change or Per Page Change
  watch([currentPage, perPage], fetchUsers)

  // Delete User
  const deleteUser = async (id) => {
    try {
      // Show loading
      isLoading.value = true

      // Delete User
      await api.delete(`/users/${id}`)

      // Update Users List
      users.value = users.value.filter((user) => user.id !== id)

      // Show success message
      showAlert.value = true
      alertMessage.value = 'User deleted successfully'
      alertType.value = 'success'
    } catch (error) {
      // Show error message
      console.error('Failed to delete user:', error)
      showAlert.value = true
      alertMessage.value = 'Failed to delete user'
      alertType.value = 'danger'
    } finally {
      // Close Confirm Box
      showConfirmBox.value = false
      // Hide loading
      isLoading.value = false
    }
  }

  // Open Confirm Box
  const openConfirmBox = (id) => {
    showConfirmBox.value = true
    confirmMessage.value = 'Are you sure you want to delete this user?'
    userIdToDelete.value = id
  }

  // Handle Cancel
  const handleCancel = () => {
    showConfirmBox.value = false
  }
</script>
