<template>
  <div class="w-full h-screen fixed top-0 left-0 pointer-events-none">
    <div class="absolute right-5 bottom-5 drop-shadow-[0_0_5px_rgba(0,0,0,0.5)] z-[100]">
      <div
        :class="[
          'min-h-[50px] min-w-[300px] rounded text-white flex justify-between px-5 items-center',
          type == 'success'
            ? 'bg-green-600'
            : type == 'danger'
              ? 'bg-red-500'
              : type == 'warning'
                ? 'bg-yellow-500'
                : '',
        ]"
      >
        <p class="text-sm">{{ message }}</p>
        <XMarkIcon
          @click="closeAlert"
          class="w-5 h-5 cursor-pointer hover:scale-125 duration-300"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { XMarkIcon } from '@heroicons/vue/24/outline'
  import { defineEmits, defineProps, onMounted } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const emit = defineEmits(['closeAlert'])

  const props = defineProps({
    type: {
      type: String,
      default: 'success',
    },
    message: {
      type: String,
      default: 'Success',
    },
    duration: {
      type: Number,
      default: 3000,
    },
    autoClose: {
      type: Boolean,
      default: true,
    },
    navigate: {
      type: String,
      default: '',
    },
  })

  const closeAlert = () => {
    emit('closeAlert')

    if (props.navigate) {
      router.push(props.navigate)
    }
  }

  onMounted(() => {
    if (props.autoClose) {
      setTimeout(closeAlert, props.duration)
    }
  })
</script>
