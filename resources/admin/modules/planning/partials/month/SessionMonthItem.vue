<template>
    <Popover as="li" class="popper-native first-of-type:*:h-full group" position="top" :delay="100">
        <button
            class="group flex gap-1 items-center border border-slate-300 rounded-full p-0.5 bg-slate-50 w-full"
            @click.stop="$emit('select')"
        >
            <span
                :class="[
                    bgStyle.className,
                    'btn-m drop-shadow',
                    'rounded-full w-6 h-6 uppercase flex-center font-bold mx-auto text-3xs ',
                ]"
                :style="bgStyle.style"
            >
                sd
            </span>
            <span class="flex-1 text-left truncate font-medium text-gray-900 group-hover:text-primary">
                {{ item?.session?.eleve?.user?.name ?? item?.moniteur?.user?.name }}
            </span>
            <time
                :datetime="item.start_at"
                class="ml-1 hidden flex-none text-gray-500 group-hover:text-primary xl:block pr-0.5"
            >
                {{ item.start_at?.slice(0, 5) }}
            </time>
        </button>
        <template #content>
            <div class="w-full min-w-[200px] py-2">
                <dl class="flex flex-col justify-center text-nowrap gap-1">
                    <dd class="flex items-center gap-2 bg-slate-200 p-1 rounded-xl">
                        <Thumb
                            :src="item?.moniteur?.user?.media || item?.moniteur?.user?.profile_photo_url"
                            size="sm"
                            class="!rounded-full"
                        />
                        <p class="text-xs font-bold flex-1 leading-snug">
                            {{ item?.moniteur?.user?.name }}
                            <small class="block text-gray-500 font-normal">Moniteur</small>
                        </p>
                    </dd>
                    <dd v-if="item?.session" class="flex items-center gap-2 bg-slate-200 p-1 rounded-xl">
                        <Thumb
                            :src="eleve?.user?.media || eleve?.user?.profile_photo_url"
                            size="sm"
                            class="!rounded-full"
                        />
                        <p class="text-xs font-bold flex-1 leading-snug">
                            {{ eleve?.user?.name }}
                            <small class="block text-gray-500 font-normal">Eleve</small>
                        </p>
                    </dd>
                </dl>

                <ul class="text-xxs border-t border-slate-400 -mx-1.5 pt-2 mt-1.5">
                    <li class="flex gap-1 items-center justify-between h-6 px-2">
                        <span>Status:</span>
                        <div class="col-span-2">
                            <Badge :info="item?.is_active == 1" :warning="item?.is_active == 2" class="text-xxs !h-4">
                                {{ item?.is_active == 1 ? 'Actif' : 'Inactif' }}
                            </Badge>
                        </div>
                    </li>
                    <li class="flex gap-1 items-center justify-between h-6 px-2">
                        <span>Date:</span>
                        <b class="col-span-2">{{ dateFormat(item?.date, 'fr') }}</b>
                    </li>
                    <li class="flex gap-1 items-center justify-between h-6 px-2">
                        <span>Heure:</span>
                        <b class="col-span-2">{{ item?.start_at?.slice(0, 5) }} - {{ item?.end_at?.slice(0, 5) }}</b>
                    </li>
                    <li class="flex gap-1 items-center justify-between h-6 px-2">
                        <span>Lieu:</span>
                        <b class="col-span-2">{{ item.lieu?.name }}</b>
                    </li>
                </ul>
            </div>
        </template>
    </Popover>
</template>

<script setup>
import { Badge, Popover, Thumb } from '@shared/components';
import { dateFormat } from '@shared/helpers';
import { computed } from 'vue';

const props = defineProps({
    item: {
        type: Object,
        default: () => ({}),
    },
    count: Number,
});

defineEmits(['select']);

const eleve = computed(() => props.item?.session?.eleve || null);
const bgStyle = computed(() => {
    const product = props.item?.session?.product || {};
    const color = props.item?.color || product.color || '#222';

    return {
        className: product.is_cpf ? 'bg-planning-cpf text-black' : 'bg-planning-general text-white',
        style: {
            '--planning-color': product.is_cpf ? product?.color || props.item?.color || '#222' : color,
        },
    };
});
</script>
