<template>
    <li v-if="item.divider" class="border-t border-slate-300 my-1">
        <span v-show="!sideStore.sidebarCollapse" class="px-4 font-semibold text-xxs pt-3 pb-1 block">
            {{ item.name }}
        </span>
    </li>
    <li v-else-if="item.grow" class="flex-1"></li>
    <li v-else :class="sideStore.sidebarCollapse ? 'flex max-lg:flex-col lg:justify-center' : 'pr-2'">
        <Disclosure v-slot="{ open }" :default-open="hasActiveChild || !!item.openByDefault" as="template">
            <DisclosureButton
                :as="item.href ? Link : 'div'"
                :href="item.href"
                :class="[
                    isActive(item.href) && !hasActiveChild
                        ? 'bg-gradient-to-tr to-orange-100 from-primary text-white rounded-r-full'
                        : 'text-gray-700 hover:text-primary',
                    sideStore.sidebarCollapse
                        ? 'lg:rounded-l-full lg:w-8 lg:h-8 lg:justify-center pl-4 lg:pl-0 w-full mr-4 lg:mr-0'
                        : 'pl-4',
                    'group flex gap-x-2 rounded-md py-1.5 text-sm leading-6 font-semibold cursor-pointer',
                ]"
            >
                <ToolkitItems
                    :is-disabled="!item.children?.length || !sideStore.sidebarCollapse"
                    :childs="item.children"
                >
                    <component
                        :is="item.icon"
                        :class="[
                            isActive(item.href) && !hasActiveChild
                                ? 'text-white'
                                : 'text-slate-600 group-hover:text-primary',
                            hasActiveChild && '!text-primary',
                            'h-5 w-5 shrink-0',
                        ]"
                        aria-hidden="true"
                    />
                </ToolkitItems>
                <span :class="!sideStore.sidebarCollapse ? 'flex-1' : 'md:hidden'">{{ item.name }}</span>
                <ChevronDownIcon
                    v-if="item.children?.length && !sideStore.sidebarCollapse"
                    :class="['w-4 t-200', open ? '-rotate-180' : '']"
                />
            </DisclosureButton>
            <transition
                enter-active-class="transition-all duration-700 ease-in"
                enter-from-class="transform max-h-[0px] overflow-hidden"
                enter-to-class="transform max-h-[25rem] overflow-hidden"
                leave-active-class="transition-all duration-500 ease-out"
                leave-from-class="transform max-h-[25rem]"
                leave-to-class="transform max-h-[0px] overflow-hidden"
            >
                <DisclosurePanel v-if="item.children?.length" class="flex flex-col gap-px mt-px h-full" as="ul">
                    <NavigationSubItem
                        v-for="(subitem, index) in item.children"
                        :key="index"
                        :subitem="subitem"
                        :is-passed="hasSelectedPassed(item.children || [], index)"
                        :class="!sideStore.sidebarCollapse ? '' : 'lg:hidden'"
                    />
                </DisclosurePanel>
            </transition>
        </Disclosure>
    </li>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import { isActive } from '@shared/helpers';
import NavigationSubItem from './NavigationSubItem.vue';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { computed } from 'vue';
// import Popover from '@shared/components/common/Popover.vue';
// import Button from '@shared/components/common/Button.vue';
import { ToolkitItems } from '@shared/components';
import { useSideBarControll } from '@shared/stores';

const sideStore = useSideBarControll();

const props = defineProps({
    item: Object,
});
const hasActiveChild = computed(() => {
    return props.item.children?.some((item) => isActive(item.href));
});
const hasSelectedPassed = (subItems, index) => {
    const findIndex = subItems.findIndex((item) => isActive(item.href));
    if (findIndex !== -1) {
        return index < findIndex; // 0 3
    }
    return false;
};
// const isMiniBar = false;
</script>
