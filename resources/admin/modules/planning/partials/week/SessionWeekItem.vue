<template>
    <Popover as="li" class="w-full h-full !inline-block" position="top" hoverable :style="bgStyle.style">
        <div
            :class="[
                bgStyle.className,
                'btn-m  drop-shadow',
                'group w-full h-full rounded-xl p-1.5 text-[11px] hover:opacity-80 t-300 overflow-hidden  flex flex-col ',
            ]"
            @click="$emit('select', item)"
        >
            <div class="flex justify-between flex-wrap font-bold">
                <span class="text-balance">
                    {{ eleve ? eleve.user.name : item?.moniteur?.user?.name }}
                </span>
                <time v-if="item?.start_at" class="group-hover:font-bold" :datetime="item?.start_at">
                    {{ item?.start_at.slice(0, 5) }} à {{ item.end_at?.slice(0, 5) }}
                </time>
            </div>
            <p>{{ item?.lieu?.name }}</p>
        </div>
        <template #content>
            <div class="w-full min-w-[200px] py-2">
                <dl class="flex flex-col justify-center text-nowrap gap-1">
                    <dd class="flex items-center gap-2 bg-slate-200 p-1 rounded-xl">
                        <Thumb
                            :src="item?.moniteur?.user?.media || item?.moniteur?.user?.profile_photo_url"
                            size="sm"
                            class="!rounded-full"
                        />
                        <p class="text-xs font-bold mt-1 flex-1">
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
                        <p class="text-xs font-bold mt-1 flex-1">
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
                        <b class="col-span-2">{{ item?.start_at?.slice(0, 5) }} à {{ item?.end_at?.slice(0, 5) }}</b>
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
// import { hoursColors } from '@admin/constants';
import { Badge, Popover, Thumb } from '@shared/components';
import { dateFormat } from '@shared/helpers';
import { computed } from 'vue';

const props = defineProps({
    item: {
        type: Object,
        default: () => ({}),
    },
    monitorPerOrder: {
        type: Object,
        default: () => ({}),
    },
    count: Number,
});
console.log("item is ",props.item)
defineEmits(['select']);

const eleve = computed(() => props.item?.session?.eleve || null);
const bgStyle = computed(() => {
    const product = props.item?.session?.product || {};
    const color = props.item?.color || product.color || '#444';

    return {
        className: product.is_cpf ? 'bg-planning-cpf text-black' : 'bg-planning-general text-white',
        color: product?.color,
        isCpf: product.is_cpf,
        style: {
            '--planning-color': product.is_cpf ? product?.color || props.item?.color || '#444' : color,
        },
    };
});
</script>
