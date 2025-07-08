<template>
    <div class="align-middle overflow-y-auto" @scroll="onScroll">
        <slot />
    </div>
</template>

<script setup>
import { useDebounce } from '@shared/hooks';

const emit = defineEmits(['scroll:end']);
const debounce = useDebounce(100);
// const scrollComponent = ref(null)
const onScroll = debounce((e) => {
    let el = e.target;
    const scrollHeight = el.scrollHeight;
    const top = el.scrollTop + el.offsetHeight;
    if (scrollHeight < top + 10) {
        emit('scroll:end');
        console.warn('end');
    }
});
</script>
