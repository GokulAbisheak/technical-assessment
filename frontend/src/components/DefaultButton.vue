<template>
  <button
    :class="[
      'w-full text-xs p-3 rounded uppercase font-medium duration-300 cursor-pointer',
      type == 'primary'
        ? 'text-white bg-sky-600 hover:bg-sky-700 border-2 border-sky-600 hover:border-sky-700'
        : type == 'secondary'
          ? 'text-sky-600 hover:text-white border-2 border-sky-600 hover:bg-sky-600'
          : type == 'success'
            ? 'text-white bg-green-600 hover:bg-green-700 border-2 border-green-600 hover:border-green-700'
            : type == 'danger'
              ? 'text-white bg-red-600 hover:bg-red-700 border-2 border-red-600 hover:border-red-700'
              : type == 'warning'
                ? 'text-white bg-yellow-500 hover:bg-yellow-600 border-2 border-yellow-500 hover:border-yellow-600'
                : type == 'disabled'
                  ? 'text-gray-400 border-2 border-gray-400 border-dotted'
                  : '',
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup>
  import { defineEmits, defineProps } from 'vue'

  const props = defineProps({
    type: {
      type: String,
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  })

  const emit = defineEmits(['click'])

  const handleClick = (event) => {
    if (!props.disabled) {
      emit('click', event)
    }
  }
</script>
