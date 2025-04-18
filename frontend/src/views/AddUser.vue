<template>
  <main
    class="flex flex-col gap-5 justify-center items-center min-h-[calc(100vh-64px)] w-full py-5"
  >
    <div class="max-w-[800px] w-full mx-auto rounded">
      <div>
        <h1 class="text-xl text-center font-bold uppercase col-span-2">Add New User</h1>
      </div>
    </div>
    <div
      class="max-w-[800px] w-full mx-auto flex flex-col gap-4 border border-gray-300 rounded p-5 pt-10 relative"
    >
      <router-link
        to="/users"
        class="absolute top-2 right-2 flex items-center gap-2 text-sm hover:text-red-600 p-2 justify-end w-fit rounded-full hover:bg-red-100"
      >
        <XMarkIcon class="w-5 h-5 font-bold" />
      </router-link>
      <div v-if="previewUrl" class="flex flex-col w-full justify-center items-center gap-2">
        <img :src="previewUrl" alt="Profile Preview" class="w-24 h-24 rounded object-cover" />
      </div>

      <div class="flex flex-col md:grid md:grid-cols-2 gap-4">
        <InputBox
          v-model="formData.name"
          label="Name"
          placeholder="eg: John Smith"
          id="name"
          :error="errors.name"
        />
        <InputBox
          v-model="formData.email"
          label="Email"
          placeholder="eg: name@example.com"
          id="email"
          :error="errors.email"
        />
        <InputBox
          v-model="formData.phone_number"
          label="Phone Number"
          placeholder="eg: 94771234567"
          id="phone"
          :error="errors.phone_number"
        />
        <InputBox
          v-model="formData.address"
          label="Address"
          placeholder="eg: No 123, Main Street, Kandy, Sri Lanka"
          id="address"
          :error="errors.address"
        />
        <InputBox
          v-model.number="formData.age"
          label="Age"
          placeholder="eg: 20"
          type="number"
          id="age"
          :error="errors.age"
        />
        <div class="flex flex-col gap-0.5 col-span-2">
          <label for="profile_picture" class="font-medium text-sm text-gray-700">
            <div
              class="w-full py-4 px-8 bg-gray-200 rounded-md flex justify-center items-center flex-col gap-1 border border-gray-300 border-dashed"
            >
              <CloudArrowUpIcon class="w-5 h-5 text-gray-500" />
              <p class="text-sm text-gray-500">Upload Profile Picture</p>
            </div>
          </label>
          <input
            type="file"
            id="profile_picture"
            accept="image/*"
            @change="onFileChange"
            class="border border-gray-300 rounded p-2"
            hidden
          />
          <span v-if="errors.profile_picture" class="text-red-500 text-sm">{{
            errors.profile_picture
          }}</span>
        </div>
        <div class="col-span-2 grid grid-cols-2 gap-4">
          <DefaultButton type="primary" @click="handleSubmit">Submit</DefaultButton>
          <DefaultButton type="danger" @click="handleReset">Reset</DefaultButton>
        </div>
      </div>
    </div>
  </main>
  <AlertBox
    v-if="showAlert"
    :type="alertType"
    :message="alertMessage"
    @closeAlert="showAlert = false"
    navigate="/users"
  />
  <FullScreenSpinner v-if="isLoading" />
</template>

<script setup>
  import InputBox from '@/components/InputBox.vue'
  import DefaultButton from '@/components/DefaultButton.vue'
  import { reactive, ref } from 'vue'
  import api from '@/api/axios.js'
  import AlertBox from '@/components/AlertBox.vue'
  import FullScreenSpinner from '@/components/FullScreenSpinner.vue'
  import { CloudArrowUpIcon, XMarkIcon } from '@heroicons/vue/24/outline'
  import { validateEmail, validatePhone } from '@/utils/validateHelpers.js'         

  const formData = reactive({
    name: '',
    email: '',
    phone_number: '',
    address: '',
    age: null,
  })

  const errors = reactive({
    name: '',
    email: '',
    phone_number: '',
    address: '',
    age: '',
    profile_picture: '',
  })

  const file = ref(null)
  const showAlert = ref(false)
  const alertType = ref('success')
  const alertMessage = ref('')
  const isLoading = ref(false)
  const previewUrl = ref(null)

  // File Upload
  const onFileChange = (event) => {
    file.value = event.target.files[0]
    if (file.value) {
      previewUrl.value = URL.createObjectURL(file.value)
    } else {
      previewUrl.value = null
    }
  }

  // Form Validation 
  const validateForm = () => {
    let isValid = true
    Object.keys(errors).forEach((key) => (errors[key] = ''))

    // Name Validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required'
      isValid = false
    }

    // Email Validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
      isValid = false
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address'
      isValid = false
    }

    // Phone Number Validation
    if (!validatePhone(formData.phone_number)) {
      errors.phone_number = 'Please enter a valid Sri Lankan phone number'
      isValid = false
    }

    // Age Validation
    if (isNaN(formData.age) || formData.age < 0) {
      errors.age = 'Please enter a valid age'
      isValid = false
    }

    // Profile Picture Validation
    if (file.value) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']
      if (!allowedTypes.includes(file.value.type)) {
        errors.profile_picture = 'Only JPG, PNG, and GIF files are allowed'
        isValid = false
      } else if (file.value.size > 2 * 1024 * 1024) {
        errors.profile_picture = 'File size must be less than 2MB'
        isValid = false
      }
    }

    return isValid
  }

  // Submit Form
  const handleSubmit = async () => {
    isLoading.value = true
    if (validateForm()) {
      const formPayload = new FormData()
      for (const key in formData) {
        const value = formData[key]
        formPayload.append(key, value === '' && key === 'age' ? null : value)
      }
      if (file.value) {
        formPayload.append('profile_picture', file.value)
      }

      try {
        const res = await api.post('/users', formPayload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        if (res.status === 201) {
          // Show success message
          showAlert.value = true
          alertType.value = 'success'
          alertMessage.value = 'User added successfully'
          handleReset()
        }
      } catch (error) {
        // Show error message
        showAlert.value = true
        alertType.value = 'danger'
        alertMessage.value = error.response?.data?.message || 'An error occurred'
      } finally {
        isLoading.value = false
      }
    } else {
      isLoading.value = false
    }
  }

  // Reset Form
  const handleReset = () => {
    Object.keys(formData).forEach((key) => (formData[key] = key === 'age' ? null : ''))
    Object.keys(errors).forEach((key) => (errors[key] = ''))
    file.value = null
    previewUrl.value = null
  }
</script>
