<template>
  <div class="flex space-x-2">
    <button 
      type="button" 
      @click="prevPage" 
      :disabled="currentPage <= 1"
      class="px-3 py-2 border rounded transition-colors duration-200 disabled:cursor-not-allowed"
      :class="currentPage > 1 
                ? 'border-primary text-primary hover:bg-primary hover:text-white' 
                : 'border-gray-300 text-gray-500 disabled:bg-gray-200 disabled:text-gray-700 disabled:border-gray-400'"
    >
      Précédent
    </button>
    <button 
      v-for="page in totalPages" 
      :key="page" 
      type="button"
      @click="goToPage(page)"
      class="px-3 py-2 border rounded transition-colors duration-200"
      :class="page === currentPage 
                ? 'bg-primary text-white border-primary' 
                : 'bg-white text-primary border-primary hover:bg-primary hover:text-white'"
    >
      {{ page }}
    </button>
    <button 
      type="button" 
      @click="nextPage" 
      :disabled="currentPage >= totalPages"
      class="px-3 py-2 border rounded transition-colors duration-200 disabled:cursor-not-allowed"
      :class="currentPage < totalPages 
                ? 'border-primary text-primary hover:bg-primary hover:text-white' 
                : 'border-gray-300 text-gray-500 disabled:bg-gray-200 disabled:text-gray-700 disabled:border-gray-400'"
    >
      Suivant
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  currentPage: { type: Number, default: 1 },
  totalPages: { type: Number, required: true },
});
const emit = defineEmits(['changePage']);

const prevPage = () => {
  if (props.currentPage > 1) {
    emit('changePage', props.currentPage - 1);
  }
};

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit('changePage', props.currentPage + 1);
  }
};

const goToPage = (page) => {
  emit('changePage', page);
};
</script>
