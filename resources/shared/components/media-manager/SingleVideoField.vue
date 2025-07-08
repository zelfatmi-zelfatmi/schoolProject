<template>
    <div class="space-y-1">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        {{ label }}
      </label>
  
      <div
        class="border border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50 transition"
        v-if="!modelValue"
        @click="input?.click()"
      >
        <input
          type="file"
          accept="video/*"
          class="hidden"
          ref="input"
          @change="handleChange"
        />
        <p class="text-center text-sm">
          <span class="text-blue-600 font-semibold">+</span> Ajouter un fichier vidéo
        </p>
      </div>
  
      <div v-else class="space-y-2">
        <video
          controls
          class="w-full rounded shadow"
        >
          <source :src="modelValue" type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
  
        <div class="flex gap-2">
          <button
            type="button"
            class="text-blue-600 text-sm underline hover:opacity-80"
            @click="input?.click()"
          >
            Remplacer la vidéo
          </button>
          <button
            type="button"
            class="text-red-500 text-sm underline hover:opacity-80"
            @click="removeVideo"
          >
            Supprimer
          </button>
        </div>
  
        <input
          type="file"
          accept="video/*"
          class="hidden"
          ref="input"
          @change="handleChange"
        />
      </div>
  
      <p v-if="error" class="text-xs text-red-500 mt-1">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    modelValue: String,
    error: String,
    label: String,
  });
  
  const emit = defineEmits(['update:modelValue']);
  const input = ref(null);
  
  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      emit('update:modelValue', url);
    }
  };
  
  const removeVideo = () => {
    emit('update:modelValue', null);
  };
  </script>
  