<script setup>
defineProps({
    value: Number,
    min: Number,
    max: Number,
});
</script>
<template>
    <div class="flex gap-5 justify-between items-center text-sm font-semibold text-gray-600 mt-1">
        <div
            class="flex-1 h-2 rounded-full overflow-hidden"
            :class="{
                'bg-orange-500': value < min,
                'bg-green-500': min <= value && value <= max,
                'bg-red-500': value > max,
            }"
        />
        <span>{{ value }} / {{ max }}</span>
    </div>
</template>
