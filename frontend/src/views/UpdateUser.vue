<template>
  <main class="flex flex-col gap-5 justify-center items-center min-h-[calc(100vh-64px)] w-full py-5">
    <div class="max-w-[800px] w-full mx-auto rounded">
      <div>
        <h1 class="text-xl text-center font-bold uppercase col-span-2">Update User</h1>
      </div>
    </div>

    <div class="max-w-[800px] w-full mx-auto flex flex-col gap-4 border border-gray-300 rounded p-5 pt-10 relative">
      <router-link to="/users"
        class="absolute top-2 right-2 flex items-center gap-2 text-sm hover:text-red-600 p-2 justify-end w-fit rounded-full hover:bg-red-100">
        <XMarkIcon class="w-5 h-5 font-bold" />
      </router-link>
      <div v-if="formData.profile_picture" class="flex flex-col w-full justify-center items-center gap-2">
        <img :src="`http://localhost:8000/storage/${formData.profile_picture}`" alt="Profile Picture"
          class="w-24 h-24 rounded object-cover">
        <button @click="removeProfilePicture"
          class="text-red-500 text-xs border border-red-500 rounded-md px-2 py-1 uppercase font-medium hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer">Remove</button>
      </div>
      <div class="flex flex-col md:grid md:grid-cols-2 gap-4">
        <InputBox v-model="formData.name" label="Name" placeholder="eg: John Smith" id="name" :error="errors.name" />
        <InputBox v-model="formData.email" label="Email" placeholder="eg: name@example.com" id="email"
          :error="errors.email" />
        <InputBox v-model="formData.phone_number" label="Phone Number" placeholder="eg: 94771234567" id="phone"
          :error="errors.phone_number" />
        <InputBox v-model="formData.address" label="Address" placeholder="eg: No 123, Main Street, Kandy, Sri Lanka"
          id="address" :error="errors.address" />
        <InputBox v-model.number="formData.age" label="Age" placeholder="eg: 20" type="number" id="age"
          :error="errors.age" />
        <div class="flex flex-col gap-0.5 col-span-2">
          <label for="profile_picture" class="font-medium text-sm text-gray-700">
            <div
              class="w-full py-4 px-8 bg-gray-200 rounded-md flex justify-center items-center flex-col gap-1 border border-gray-300 border-dashed">
              <CloudArrowUpIcon class="w-5 h-5 text-gray-500" />
              <p class="text-sm text-gray-500">Upload New Profile Picture</p>
            </div>
          </label>
          <input type="file" id="profile_picture" accept="image/*" @change="onFileChange"
            class="border border-gray-300 rounded p-2" hidden />
          <span v-if="errors.profile_picture" class="text-red-500 text-sm">{{ errors.profile_picture }}</span>
        </div>
        <div class="col-span-2 grid grid-cols-2 gap-4">
          <DefaultButton type="primary" @click="handleUpdate">Update</DefaultButton>
          <DefaultButton type="danger" @click="handleReset">Reset</DefaultButton>
        </div>
      </div>
    </div>
  </main>

  <AlertBox v-if="showAlert" :type="alertType" :message="alertMessage" @closeAlert="showAlert = false"
    navigate="/users" />
  <FullScreenSpinner v-if="isLoading" />
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import api from "@/api/axios.js";
import InputBox from "@/components/InputBox.vue";
import DefaultButton from "@/components/DefaultButton.vue";
import AlertBox from "@/components/AlertBox.vue";
import FullScreenSpinner from "@/components/FullScreenSpinner.vue";
import { CloudArrowUpIcon, XMarkIcon } from "@heroicons/vue/24/outline";

const route = useRoute();
const userId = route.params.id;

const formData = reactive({
  name: "",
  email: "",
  phone_number: "",
  address: "",
  age: null,
  profile_picture: "",
});

const errors = reactive({
  name: "",
  email: "",
  phone_number: "",
  address: "",
  age: "",
});

const file = ref(null);
const showAlert = ref(false);
const alertType = ref("success");
const alertMessage = ref("");
const isLoading = ref(false);

const onFileChange = (event) => {
  file.value = event.target.files[0];
  uploadProfilePicture();
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => !phone || /^(?:\+94|94|0)?7\d{8}$/.test(phone);

const validateForm = () => {
  let isValid = true;
  Object.keys(errors).forEach((key) => (errors[key] = ""));

  if (!formData.name.trim()) {
    errors.name = "Name is required";
    isValid = false;
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
    isValid = false;
  }

  if (!validatePhone(formData.phone_number)) {
    errors.phone_number = "Please enter a valid Sri Lankan phone number";
    isValid = false;
  }

  if (isNaN(+formData.age) || +formData.age < 0) {
    errors.age = "Please enter a valid age";
    isValid = false;
  }

  return isValid;
};

const handleUpdate = async () => {
  isLoading.value = true;
  if (validateForm()) {
    const formPayload = new FormData();
    for (const key in formData) {
      if (key !== 'profile_picture') {
        formPayload.append(key, formData[key]);
      }
    }

    try {
      const res = await api.put(`/users/${userId}`, formPayload);
      if (res.status === 200) {
        showAlert.value = true;
        alertType.value = "success";
        alertMessage.value = "User updated successfully";
      }
    } catch (error) {
      showAlert.value = true;
      alertType.value = "danger";
      alertMessage.value = error.response?.data?.message || "Update failed";
    } finally {
      isLoading.value = false;
    }
  } else {
    isLoading.value = false;
  }
};


const handleReset = () => {
  Object.keys(errors).forEach((key) => (errors[key] = ""));
  file.value = null;
};

const fetchUserData = async () => {
  isLoading.value = true;
  try {
    const res = await api.get(`/users/${userId}`);
    const user = res.data;
    Object.assign(formData, {
      name: user.name,
      email: user.email,
      phone_number: user.phone_number || "",
      address: user.address || "",
      age: user.age,
      profile_picture: user.profile_picture || "",
    });
  } catch (error) {
    alertMessage.value = "Failed to load user data";
    alertType.value = "danger";
    showAlert.value = true;
  } finally {
    isLoading.value = false;
  }
};

const uploadProfilePicture = async () => {
  const formData = new FormData();
  formData.append('profile_picture', file.value);

  try {
    const res = await api.post(`/users/${userId}/upload-profile-picture`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    formData.profile_picture = res.data.profile_picture;
    window.location.reload();
  } catch (err) {
    console.error('Upload error:', err.response?.data);
  }
};

const removeProfilePicture = async () => {
  try {
    const res = await api.put(`/users/${userId}`, { "profile_picture": null });
    formData.profile_picture = res.data.profile_picture;
    window.location.reload();
  } catch (err) {
    console.error('Upload error:', err.response?.data);
  }
};


onMounted(fetchUserData);
</script>