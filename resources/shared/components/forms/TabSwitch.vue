<script setup>
import { useParams } from '@shared/hooks';
import { computed } from 'vue';

const emit = defineEmits(['update:model-value', 'change']);

const props = defineProps({
    modelValue: {
        type: [String, Number, Boolean],
        default: '',
    },
    items: Array,
    label: String,
    size: String,
    color: String,
    disabled: Boolean,
    full: Boolean,
    param: String,
});
const params = useParams();
const isActive = ({ value, id }) => {
    const mv = props.modelValue ?? params[props.param] ?? '';
    return mv == id || (mv === value && !id);
};

const getActiveItem = () => {
    return props.items?.find(isActive);
};

const indexOfActive = computed(() => props.items?.findIndex(isActive));

const getStyleSize = () => {
    switch (props.size) {
        case 'sm':
            return 'h-6 text-xs px-2';
        case 'lg':
            return 'h-10 text-md px-4';
        case 'xl':
            return 'h-14 text-xl px-6 md:px-10';
        default:
            return 'h-8 text-sm px-3';
    }
};
const handleChange = ({ id, value }) => {
    emit('change', id ?? value);
    emit('update:model-value', id ?? value);
    if (props.param) {
        params.update({ [props.param]: id ?? value });
    }
};
</script>

<template>
    <div :class="['p-0.5 rounded-full h-fit', full ? 'w-full' : 'w-fit']">
        <ul
            class="grid items-center flex-wrap relative w-full"
            :style="{
                gridTemplateColumns: `repeat(${items.length}, 1fr)`,
            }"
        >
            <li
                aria-hidden="true"
                :style="{
                    transform: `translateX(${indexOfActive * 100}%)`,
                    width: 100 / items.length + '%',
                }"
                :class="[
                    'absolute inset-0 pointer-events-none inline-block rounded-full  t-300',
                    disabled ? '' : 'shadow-lg',
                    getActiveItem()?.color ?? 'bg-primary',
                ]"
            />
            <li
                v-for="(item, key) in items"
                :key="key"
                :class="[
                    'flex-center flex-1 btn-hover !outline-none relative t-2 flex-col leading-4',
                    getStyleSize(),
                    item.className || '',
                    disabled && 'opacity-70 cursor-not-allowed pointer-events-none select-none',

                    isActive(item) ? 'text-white' : 'text-current',
                ]"
                @click="handleChange(item)"
            >
                <component
                    :is="item.icon"
                    v-if="item.icon"
                    class="w-6 h-6"
                    :class="[isActive(item) ? 'text-white' : disabled ? 'text-gray-500' : 'text-black']"
                />
                <span>{{ item.name }}</span>
                <b v-if="item.content" class="text-xxs opacity-70">{{ item.content }}</b>

                <!-- isActive(item) ? disabled ? 'text-white' : 'text-white' : disabled ? 'text-gray-500' : 'text-black', -->
            </li>
        </ul>
    </div>
</template>
