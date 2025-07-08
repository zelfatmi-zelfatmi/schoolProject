<script setup>
import { Popover, NavigationSubItem } from '@shared/components';
import { isActive } from '@shared/helpers';

const props = defineProps({
    childs: Object,
    isDisabled: Boolean,
});
const hasSelectedPassed = (subItems, index) => {
    const findIndex = subItems.findIndex((item) => isActive(item.href));
    if (findIndex !== -1) {
        return index < findIndex; // 0 3
    }
    return false;
};
</script>

<template>
    <Popover :disabled="isDisabled" hoverable dark arrow :offset="0" position="right-start">
        <slot />
        <template #content>
            <ul class="hidden flex-col gap-1 justify-between w-56 lg:flex -ml-1">
                <NavigationSubItem
                    v-for="(subitem, index) in props.childs"
                    :key="index"
                    class="-ml-3"
                    :is-passed="hasSelectedPassed(props.childs || [], index)"
                    :subitem="subitem"
                />
            </ul>
        </template>
    </Popover>
</template>

<style scoped></style>
