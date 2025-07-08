<template>
    <Popover class="inline-block text-left">
        <slot>
            <EllipsisHorizontalIcon
                class="w-8 h-8 p-1.5 cursor-pointer active:bg-slate-100 hover:text-primary rounded-full"
            />
        </slot>
        <template #content>
            <ul class="flex flex-col gap-1">
                <template v-for="(action, idx) in actions.filter(Boolean)" :key="idx">
                    <li v-if="action.divider">
                        <hr />
                    </li>
                    <li v-else>
                        <Button
                            v-bind="action"
                            :class="[action.link && '!px-3', 'hover:bg-gray-100 !justify-start !rounded-xl !h-9']"
                            fullwidth
                        >
                            {{ action.title }}
                        </Button>
                    </li>
                </template>
            </ul>
        </template>
    </Popover>
</template>

<script setup>
import Button from './Button.vue';
import { EllipsisHorizontalIcon } from '@heroicons/vue/20/solid';
import Popover from './Popover.vue';

defineProps({
    actions: {
        type: Array,
        default: () => [],
    },
});
</script>
