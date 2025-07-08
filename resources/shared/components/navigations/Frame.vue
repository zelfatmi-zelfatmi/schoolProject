<script setup>
defineEmits(['sidebar:change']);
const props = defineProps({
    header: Object,
    sidebar: Object,
});
const Header = props.header;
const Sidebar = props.sidebar;
</script>
<template>
    <div class="min-h-screen w-full pt-9">
        <Header @sidebar:change="$emit('sidebar:change', $event)" />
        <div className="flex rounded-2xl bg-gray-50  min-h-[calc(100dvh-36px)]">
            <Sidebar class="lg:w-60 max-lg:hidden h-[calc(100dvh-36px)]" />
            <div
                class="before:z-[-1] before:top-9 before:fixed before:bg-gray-50 before:rounded-2xl before:inset-0 flex-1"
            >
                <slot />
            </div>
        </div>
    </div>
</template>
