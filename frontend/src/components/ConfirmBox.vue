<template>
  <div class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.7)]">
    <div class="bg-white p-4 rounded-md flex flex-col gap-8 max-w-[300px]">
      <p class="text-md font-semibold text-center">{{ message }}</p>
      <div class="flex justify-end gap-2">
        <DefaultButton type="success" @click="handleConfirm">Confirm</DefaultButton>
        <DefaultButton type="danger" @click="handleCancel">Cancel</DefaultButton>
      </div>
    </div>
  </div>
</template>

<script setup>
  import DefaultButton from '@/components/DefaultButton.vue'

  defineProps({
    message: {
      type: String,
      required: true,
    },
  })

  const emit = defineEmits(['confirm', 'cancel'])

  const handleConfirm = () => {
    emit('confirm')
  }

  const handleCancel = () => {
    emit('cancel')
  }
</script>
