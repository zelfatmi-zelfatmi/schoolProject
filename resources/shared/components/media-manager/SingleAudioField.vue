<template>
  <div class="space-y-1">
    <label class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>

    <div
      class="relative flex items-center justify-center h-24 rounded-lg border border-dashed border-gray-300 bg-white hover:border-blue-400 cursor-pointer transition"
    >
      <input
        type="file"
        accept="audio/*"
        @change="handleChange"
        class="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
      />
      <div class="flex flex-col items-center text-sm text-gray-500 pointer-events-none">
        <span class="text-xl font-bold text-blue-600">+</span>
        <span>Ajouter un fichier audio</span>
      </div>
    </div>

    <div v-if="previewUrl" class="mt-2">
      <audio controls :src="previewUrl" class="w-full rounded-md" />
    </div>

    <p v-if="error" class="text-xs text-red-500 mt-1">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: [File, String, Object],
  error: String,
  label: String,
});

const emit = defineEmits(['update:modelValue']);

const previewUrl = ref(null);

const handleChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    emit('update:modelValue', file);
    previewUrl.value = URL.createObjectURL(file);
  }
};

// Si on passe une URL directement (ex: édition), on la montre aussi
watch(
  () => props.modelValue,
  (val) => {
    if (val instanceof File) {
      previewUrl.value = URL.createObjectURL(val);
    } else if (typeof val === 'string') {
      if (val.startsWith('http') || val.startsWith('/storage')) {
        previewUrl.value = val;
      } else {
        // Chemin relatif (ex: "questions/xxx.mp3") → on préfixe
        previewUrl.value = `/storage/${val}`;
      }
    }
  },
  { immediate: true }
);
</script>
