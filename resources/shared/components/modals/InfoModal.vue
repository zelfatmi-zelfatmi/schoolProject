<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h3 class="text-lg font-bold mb-4">{{ title }}</h3>
      <p class="text-gray-700">{{ message }}</p>
      <div class="mt-4 flex justify-end gap-2">
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          @click="closeModal"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Information',
  },
  message: {
    type: String,
    default: 'Ceci est une modale informative.',
  },
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
/* Ajoutez vos styles personnalisés ici si nécessaire */
</style>
