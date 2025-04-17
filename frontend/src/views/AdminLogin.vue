<template>
  <main class="flex flex-col gap-5 justify-center items-center min-h-screen w-full">
    <div class="max-w-[400px] w-full mx-auto grid grid-cols-4 items-center">
      <span class="col-span-1"></span>
      <h1 class="text-xl text-center font-bold uppercase col-span-2">Admin Login</h1>
      <div class="col-span-1"></div>
    </div>
    <div class="max-w-[400px] w-full mx-auto flex flex-col gap-4 border border-gray-300 rounded p-5">
      <InputBox
        v-model="formData.username"
        label="Username"
        placeholder="Enter your username"
        id="username"
        :error="errors.username"
      />
      <InputBox
        v-model="formData.password"
        label="Password"
        placeholder="Enter your password"
        id="password"
        type="password"
        :error="errors.password"
      />
      <div class="flex flex-col gap-2">
        <DefaultButton type="primary" @click="handleLogin" :disabled="isLoading">
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </DefaultButton>
      </div>
    </div>
    <AlertBox
      v-if="showAlert"
      :type="alertType"
      :message="alertMessage"
      @closeAlert="showAlert = false"
    />
    <FullScreenSpinner v-if="isLoading" />
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import InputBox from '@/components/InputBox.vue';
import DefaultButton from '@/components/DefaultButton.vue';
import AlertBox from '@/components/AlertBox.vue';
import FullScreenSpinner from '@/components/FullScreenSpinner.vue';
import api from '@/api/axios.js';

const router = useRouter();

const formData = reactive({
  username: '',
  password: '',
});

const errors = reactive({
  username: '',
  password: '',
});

const showAlert = ref(false);
const alertType = ref('success');
const alertMessage = ref('');
const isLoading = ref(false);

const validateForm = () => {
  let isValid = true;
  Object.keys(errors).forEach(key => errors[key] = '');

  if (!formData.username.trim()) {
    errors.username = 'Username is required';
    isValid = false;
  }

  if (!formData.password.trim()) {
    errors.password = 'Password is required';
    isValid = false;
  }

  return isValid;
};

const handleLogin = async () => {
  if (validateForm()) {
    isLoading.value = true;
    try {
      const response = await api.post('/admin/login', formData);
      
      if (response.data.token) {
        // Store the token
        localStorage.setItem('admin_token', response.data.token);
        
        // Set the token in axios defaults
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        // Show success message
        showAlert.value = true;
        alertType.value = 'success';
        alertMessage.value = 'Login successful';
        
        // Redirect to users list
        setTimeout(() => {
          router.push('/users');
        }, 1000);
      }
    } catch (error) {
      showAlert.value = true;
      alertType.value = 'danger';
      alertMessage.value = error.response?.data?.message || 'Login failed. Please try again.';
    } finally {
      isLoading.value = false;
    }
  }
};
</script>

