<template>
  <div class="flex flex-col gap-0.5">
    <label v-if="label" :for="id" class="text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="
        $emit(
          'update:modelValue',
          type === 'number' ? Number($event.target.value) : $event.target.value
        )
      "
      :disabled="disabled"
      :class="[
        'w-full p-3 border rounded focus:outline-gray-500 text-sm font-medium placeholder:text-gray-400 placeholder:italic placeholder:font-medium',
        error ? 'border-red-500' : 'border-gray-300',
      ]"
    />
    <p v-if="error" class="text-red-500 text-xs font-medium">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number, null],
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  id: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
});

defineEmits(["update:modelValue"]);
</script>
