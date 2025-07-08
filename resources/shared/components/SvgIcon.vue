
<template>
   <svg>
     <use :href="`#${name}`" />
    </svg>
</template>
<script setup>
const props = defineProps({
    name: String,
});
</script>
