<template>
  <main class="flex flex-col gap-5 justify-center items-center min-h-screen w-full py-5">
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
        <DefaultButton type="primary" @click="handleSubmit">Submit</DefaultButton>
        <DefaultButton type="danger" @click="handleReset">Reset</DefaultButton>
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
import InputBox from "@/components/InputBox.vue";
import DefaultButton from "@/components/DefaultButton.vue";
import { reactive, ref } from "vue";
import api from "@/api/axios.js";
import AlertBox from "@/components/AlertBox.vue";
import FullScreenSpinner from "@/components/FullScreenSpinner.vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

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
      const res = await api.post("/users", formData);
      console.log(res);
      if (res.status == 201) {
        showAlert.value = true;
        alertType.value = "success";
        alertMessage.value = "User added successfully";
        handleReset();
      }
    } catch (error) {
      showAlert.value = true;
      alertType.value = "danger";
      alertMessage.value = error.response.data.message;
    } finally {
      isLoading.value = false;
    }
  }
};

const handleReset = () => {
  Object.keys(formData).forEach((key) => (formData[key] = key === "age" ? null : ""));
  Object.keys(errors).forEach((key) => (errors[key] = ""));
};
</script>
