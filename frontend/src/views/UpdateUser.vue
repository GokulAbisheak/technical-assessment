<template>
  <main class="flex flex-col gap-5 justify-center items-center min-h-screen w-full">
    <div class="max-w-[400px] w-full mx-auto grid grid-cols-4 items-center">
      <span class="col-span-1"></span>
      <h1 class="text-xl text-center font-bold uppercase col-span-2">Add New User</h1>
      <div class="col-span-1 flex justify-end">
        <router-link
          to="/users"
          class="flex items-center gap-2 text-sm hover:text-red-600 p-2 justify-end w-fit rounded-full hover:bg-red-100"
        >
          <XMarkIcon class="w-5 h-5 font-bold" />
        </router-link>
      </div>
    </div>
    <div
      class="max-w-[400px] w-full mx-auto flex flex-col gap-4 border border-gray-300 rounded p-5"
    >
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
      <div class="flex flex-col gap-2">
        <DefaultButton type="success" @click="handleSubmit">Update</DefaultButton>
        <DefaultButton type="danger" @click="handleCancel">Cancel</DefaultButton>
      </div>
    </div>
    <AlertBox
      v-if="showAlert"
      :type="alertType"
      :message="alertMessage"
      @closeAlert="showAlert = false"
      navigate="/users"
    />
    <FullScreenSpinner v-if="isLoading" />
  </main>
</template>

<script setup>
import InputBox from "@/components/InputBox.vue";
import DefaultButton from "@/components/DefaultButton.vue";
import AlertBox from "@/components/AlertBox.vue";
import api from "@/api/axios.js";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import FullScreenSpinner from "@/components/FullScreenSpinner.vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const route = useRoute();
const router = useRouter();

const id = route.params.id;

const formData = reactive({
  name: "",
  email: "",
  phone_number: "",
  address: "",
  age: null,
});

const errors = reactive({
  name: "",
  email: "",
  phone_number: "",
  address: "",
  age: "",
});

const showAlert = ref(false);
const alertType = ref("success");
const alertMessage = ref("");
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  try {
    const res = await api.get(`/users/${id}`);
    Object.assign(formData, res.data);
  } catch (err) {
    console.error("Failed to fetch users:", err);
  } finally {
    isLoading.value = false;
  }
});

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  if (!phone) return true;

  const phoneRegex = /^(?:\+94|94|0)?7\d{8}$/;
  return phoneRegex.test(phone);
};

const validateForm = () => {
  let isValid = true;
  Object.keys(errors).forEach((key) => (errors[key] = ""));

  if (!formData.name.trim()) {
    errors.name = "Name is required";
    isValid = false;
  } else {
    errors.name = "";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
    isValid = false;
  } else {
    errors.email = "";
  }

  if (!validatePhone(formData.phone_number)) {
    errors.phone_number = "Please enter a valid Sri Lankan phone number";
    isValid = false;
  } else {
    errors.phone_number = "";
  }

  if (isNaN(+formData.age) || +formData.age < 0) {
    errors.age = "Please enter a valid age";
    isValid = false;
  } else {
    errors.age = "";
  }

  return isValid;
};

const handleSubmit = async () => {
  isLoading.value = true;
  if (validateForm()) {
    try {
      const res = await api.put(`/users/${id}`, formData);
      if (res.status == 200) {
        showAlert.value = true;
        alertType.value = "success";
        alertMessage.value = "User updated successfully";
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }
};

const handleCancel = () => {
  router.push("/users");
};
</script>
