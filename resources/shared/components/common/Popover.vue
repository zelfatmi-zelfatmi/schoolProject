<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { createPopper } from '@popperjs/core';
import { useDimensions } from '@shared/hooks';

const emit = defineEmits(['popover-opened', 'popover-closed']);
const props = defineProps({
    position: String,
    disabled: Boolean,
    dark: Boolean,
    mobile: Boolean,
    hoverable: Boolean,
    pa: Number,
    offset: Number,
    delay: Number,
    popperClasses: String,
    as: String,
    zIndex: String,
    arrow: {
        type: Boolean,
        default: true,
    },
});
const { md } = useDimensions();
// State variables
const isPopperVisible = ref(false);
const popperElement = ref(null);
const referenceElement = ref(null);
const arrowElement = ref(null); // Arrow reference
let popperInstance = null;

// Function to initialize Popper.js
const initializePopper = async () => {
    await nextTick(); // Wait for the DOM to update
    if (props.mobile && !md.value) {
        return;
    }
    if (referenceElement.value && popperElement.value) {
        const arrowOption =
            props.arrow && arrowElement.value
                ? [
                      {
                          name: 'arrow',
                          options: {
                              element: arrowElement.value,
                              padding: props.pa || 8, // Adjust padding between the arrow and the tooltip edge
                          },
                      },
                  ]
                : [];
        popperInstance = createPopper(referenceElement.value, popperElement.value, {
            placement: props.position || 'bottom', // Adjust placement as needed
            modifiers: [
                ...arrowOption,
                {
                    name: 'offset',
                    options: {
                        offset: [0, props.offset || 4], // Adjust the tooltip position relative to the reference element
                    },
                },
                {
                    name: 'preventOverflow',
                    options: {
                        boundary: 'viewport',
                    },
                },
                {
                    name: 'flip',
                    options: {
                        fallbackPlacements: ['top', 'right', 'left'],
                    },
                },
            ],
        });
    }
};
let timeout = null;
// Function to show the popper
const showPopper = (e) => {
    if (props.disabled) {
        return;
    }
    // if (props.delay) {
    timeout = setTimeout(() => {
        isPopperVisible.value = true;
        emit('popover-opened', e);
        initializePopper();
    }, props.delay ?? 0);
    // } else {
    // isPopperVisible.value = true;
    // emit('popover-opened');
    // initializePopper();
    //     if (!popperInstance) {
    //     initializePopper();
    //   } else {
    //     popperInstance.update();
    //   }
};

// Function to hide the popper
const hidePopper = () => {
    clearTimeout(timeout);
    if (props.hoverable) {
        const getHoverd = document.querySelector('.popper-content:hover');
        if (popperElement.value?.contains(getHoverd)) {
            return;
        }
    }
    isPopperVisible.value = false;
    emit('popover-closed');
};

// Function to toggle popper visibility
const togglePopper = (e) => {
    handleClickOutside(e);
    if (isPopperVisible.value) {
        hidePopper();
    } else {
        showPopper(e);
    }
};
// Event handler for clicks outside the tooltip
const handleClickOutside = (event) => {
    if (
        isPopperVisible.value &&
        popperElement.value &&
        referenceElement.value &&
        !popperElement.value.contains(event.target) &&
        !referenceElement.value.contains(event.target)
    ) {
        console.warn('click outside');

        hidePopper();
    }
};

// Setup click outside listener on mount
onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

// Cleanup on unmount
onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);

    if (popperInstance) {
        popperInstance.destroy();
        popperInstance = null;
    }
});
</script>
<template>
    <component :is="as || 'div'" :class="['contents']">
        <div
            ref="referenceElement"
            :class="[
                $attrs.class,
                'cursor-pointer t-3 inline-block relative before:z-0 before:absolute before:-inset-2',
                disabled ? 'pointer-events-none' : ' active:opacity-70',
            ]"
            @mouseenter="(e) => hoverable && showPopper(e)"
            @mouseleave="hoverable && hidePopper()"
            @click.prevent="togglePopper"
        >
            <slot />
        </div>

        <!-- Use Teleport to render outside parent container -->
        <Teleport to="body">
            <div
                v-if="isPopperVisible"
                ref="popperElement"
                :class="[
                    'mt-2 shadow-lg border min-h-8 min-w-fit h-fit popper-content ring-gray-100 overflow-hidden',
                    popperClasses || 'p-1.5',
                    zIndex || 'z-[899]',
                    dark ? 'popper-dark' : 'popper-light',
                    !md && mobile ? ' popper-mobile animate-up' : ' animate-down w-48 absolute rounded-xl ',
                ]"
                :style="{
                    width: !md && mobile ? '100%' : referenceElement?.offsetWidth + 'px',
                }"
                @mouseleave="hoverable && hidePopper()"
            >
                <slot name="content" :close="hidePopper" :show="isPopperVisible" />
                <div v-if="arrow" ref="arrowElement" class="popper-arrow"></div>
            </div>
        </Teleport>
    </component>
</template>

<style scoped lang="scss">
.popper {
    &-light {
        --border-color: #d1d5db;
        @apply bg-white text-black border-gray-300;
        .popper-arrow:before {
            @apply bg-white;
        }
    }
    &-dark {
        --border-color: #000000;
        @apply bg-black text-white border-white/30;
        .popper-arrow:before {
            @apply bg-black;
        }
    }
}
.popper-mobile {
    @apply fixed bottom-0 z-900;
    &:before {
        content: '';
        @apply fixed inset-0 bg-black/40 -z-1 pointer-events-none;
    }
}
.popper-arrow {
    position: absolute;
    z-index: -1;
}
.popper-arrow::before {
    content: '';
    @apply w-[10px] h-[10px] block border border-transparent transform rotate-45 z-1;
    // border: 1px solid transparent;
}

[data-popper-placement^='top'] .popper-arrow {
    bottom: -5px; /* Position the arrow at the top edge */
    &::before {
        border-bottom-right-radius: 4px;
        border-color: transparent var(--border-color) var(--border-color) transparent;
    }
}

[data-popper-placement^='right'] .popper-arrow {
    left: -5px;

    &::before {
        border-bottom-left-radius: 4px;
        border-color: transparent transparent var(--border-color) var(--border-color);
    }
}

[data-popper-placement^='bottom'] .popper-arrow {
    top: -5px;
    &::before {
        border-top-left-radius: 4px;
        border-color: var(--border-color) transparent transparent var(--border-color);
    }
}

[data-popper-placement^='left'] .popper-arrow {
    right: -5px;
    &::before {
        border-bottom-right-radius: 4px;
        border-color: var(--border-color) var(--border-color) transparent transparent;
    }
}
</style>
