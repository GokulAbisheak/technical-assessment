<template>
    <div class="min-h-screen flex flex-col bg-gray-50">
        <!-- Header -->
        <header class="bg-sky-600 shadow-sm sticky top-0 z-50 w-full flex justify-between items-center px-5 py-3">
            <div class="text-lg font-bold text-white">
                Admin Panel
            </div>
            <nav class="flex gap-4 text-sm text-white items-center">
                <button @click="handleLogout" class="hover:bg-sky-500 cursor-pointer p-2 rounded-full transition-all duration-300"><ArrowLeftStartOnRectangleIcon class="w-6 h-6" /></button>
            </nav>
        </header>
        <main class="px-5">
            <router-view />
        </main>
        <AlertBox
            v-if="showAlert"
            :type="alertType"
            :message="alertMessage"
            @closeAlert="showAlert = false"
        />
        <FullScreenSpinner v-if="isLoading" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AlertBox from '@/components/AlertBox.vue';
import FullScreenSpinner from '@/components/FullScreenSpinner.vue';
import api from '@/api/axios.js';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const showAlert = ref(false);
const alertType = ref('success');
const alertMessage = ref('');
const isLoading = ref(false);

const handleLogout = async () => {
    isLoading.value = true;
    try {
        await api.post('/admin/logout');
        localStorage.removeItem('admin_token');
        api.defaults.headers.common['Authorization'] = '';
        showAlert.value = true;
        alertType.value = 'success';
        alertMessage.value = 'Logged out successfully';
        
        setTimeout(() => {
            router.push('/login');
        }, 1000);
    } catch (error) {
        showAlert.value = true;
        alertType.value = 'danger';
        alertMessage.value = error.response?.data?.message || 'Logout failed. Please try again.';
    } finally {
        isLoading.value = false;
    }
};
</script>