<template>
    <svg width="50" height="50" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="90" fill="#E25626" opacity="0.3" />
        <path :d="arcPath" :fill="fillColor" />
    </svg>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    hours: {
        type: Number,
        default: 0,
    },
});

const arcPath = computed(() => {
    const angle = (props.hours / 12) * 360;
    const radius = 90;
    const startAngle = -90; // Start from the bottom of the circle
    const endAngle = startAngle + angle;

    const x1 = 100 + radius * Math.cos((startAngle * Math.PI) / 180);
    const y1 = 100 + radius * Math.sin((startAngle * Math.PI) / 180);
    const x2 = 100 + radius * Math.cos((endAngle * Math.PI) / 180);
    const y2 = 100 + radius * Math.sin((endAngle * Math.PI) / 180);
    const largeArcFlag = angle > 180 ? 1 : 0;

    // Handle the case where hours is 12 to ensure full circle
    if (props.hours === 12) {
        return `M 100,10 A ${radius},${radius} 0 1,1 100,190 A ${radius},${radius} 0 1,1 100,10`;
    } else {
        return `M ${x1},${y1} A ${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2} L 100,100`;
    }
});

const fillColor = computed(() => {
    return props.hours > 0 ? '#E25626' : 'transparent'; // Adjust fill color as needed
});
</script>
