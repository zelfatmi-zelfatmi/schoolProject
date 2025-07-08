<!-- components/BaseModal.vue -->
<template>
    <teleport to="body">
      <transition name="fade">
        <div v-if="show" class="modal-backdrop" @click.self="closeModal">
          <div class="modal-content">
            <header class="modal-header">
              <h2>{{ title }}</h2>
              <button class="close-btn" @click="closeModal">×</button>
            </header>
            <div class="modal-body">
              <slot></slot>
            </div>
            <footer v-if="$slots.footer" class="modal-footer">
              <slot name="footer"></slot>
            </footer>
          </div>
        </div>
      </transition>
    </teleport>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from "vue";
  
  defineProps({
    show: Boolean,
    title: String,
  });
  
  const emit = defineEmits(["close"]);
  
  const closeModal = () => {
    emit("close");
  };
  </script>
  
  <style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    max-width: 90%;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  }
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
  }
  .close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
  .modal-body {
    margin: 15px 0;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  