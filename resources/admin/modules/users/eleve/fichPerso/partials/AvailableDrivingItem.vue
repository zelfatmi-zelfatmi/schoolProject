<script setup>
import { Badge, Button, Popover, Spinner, Thumb } from '@shared/components';
import { dateFormat } from '@shared/helpers';
import { computed } from 'vue';
import { getListMoniteurs } from '../fishPerso';

const props = defineProps({
    item: Array,
    reservedTab: Boolean,
    loading: Boolean,
    disabled: Boolean,
    dispoMutating: Boolean,
    isDisponible: [Object, null],
});
defineEmits(['add']);
const reservation = computed(() => [...props.item].find((v) => !!v.session));
const getUniqueMoniteurs = computed(() => {
    const data = reservation.value;
    if (data) {
        return [{ ...data, ...data?.moniteur }];
    }
    return getListMoniteurs(props.item);
});
</script>
<template>
    <div :class="['h-14 flex-center p-1 relative', item.length && 'bg-white', dispoMutating && 'pointer-events-none']">
        <div
            :class="[
                'rounded-md t-200 ',
                !disabled &&
                    !reservation &&
                    `${reservedTab ? 'hover:bg-primary' : 'hover:bg-indigo-500'} active:bg-opacity-70 cursor-pointer`,
                !!reservation
                    ? `${disabled ? 'bg-gray-400' : 'bg-primary'} absolute w-[calc(100%-8px)] inset-1 `
                    : 'w-full !h-full',
                !!isDisponible && !disabled && 'bg-indigo-500 ',
                !!isDisponible && reservedTab && !reservation && 'bg-opacity-20',
                !!reservation && !reservedTab && 'bg-opacity-20 ',
                // item?.le
            ]"
            :style="{
                height: `calc(${(reservation?.hour || 1) * 100}% - 8px)`,
            }"
        >
            <Popover
                v-if="(item.length && !disabled) || reservation"
                class="flex-center w-full h-full"
                :dark="!!reservation"
                :arrow="false"
                :offset="reservedTab ? 10 : 2"
                position="top"
            >
                <ul :class="['p-2 flex-center w-full h-full', (reservation || disabled) && 'pointer-events-none']">
                    <li
                        v-for="moniteur in getUniqueMoniteurs?.slice(0, 3)"
                        :key="moniteur.id"
                        class="-ml-4 first:!ml-0"
                    >
                        <Thumb :src="moniteur.user?.profile_photo_url" size="sm" class="!rounded-full" />
                    </li>
                    <li
                        v-if="getUniqueMoniteurs.length > 3"
                        class="-ml-4 w-8 h-8 border border-slate-400 rounded-full text-xxs text-nowrap bg-white flex-center font-medium"
                    >
                        + {{ getUniqueMoniteurs.length - 3 }}
                    </li>
                </ul>
                <template #content="{ close }">
                    <dl class="flex flex-col justify-center text-nowrap gap-1">
                        <dd :class="['font-bold py-1.5 px-1 text-lg', disabled && 'text-red-500']">
                            {{
                                reservation
                                    ? 'Reservée pour:'
                                    : disabled
                                    ? 'La date est déjà dépassée'
                                    : 'Disponible pour:'
                            }}
                        </dd>
                        <dd
                            v-for="moniteur in getUniqueMoniteurs"
                            :key="moniteur.id"
                            class="flex items-center gap-2 bg-gray-400/20 p-1 pr-2 rounded-xl"
                        >
                            <Thumb :src="moniteur?.user?.profile_photo_url" size="sm" class="!rounded-full" />
                            <p class="text-xs font-bold mt-1 flex-1">
                                {{ moniteur?.user?.name }}
                                <small class="block text-gray-400 font-normal">{{ moniteur?.lieu?.name }}</small>
                            </p>
                        </dd>
                        <dd v-if="reservation">
                            <ul class="space-y-1.5 divide-y pb-3 bg-gray-400/20 rounded-xl divide-slate-700">
                                <li class="grid grid-cols-3 pt-1.5 px-1">
                                    <span>Status:</span>
                                    <div class="col-span-2">
                                        <Badge
                                            :info="reservation?.is_active == 1"
                                            :warning="reservation?.is_active == 2"
                                        >
                                            {{ reservation?.is_active == 1 ? 'Actif' : 'Inactif' }}
                                        </Badge>
                                    </div>
                                </li>
                                <li class="grid grid-cols-3 pt-1.5 px-1">
                                    <span>Date:</span>
                                    <b class="col-span-2">{{ dateFormat(reservation?.date, 'fr') }}</b>
                                </li>
                                <li class="grid grid-cols-3 pt-1.5 px-1">
                                    <span>Heure:</span>
                                    <b class="col-span-2"
                                        >{{ reservation?.start_at?.slice(0, 5) }} -
                                        {{ reservation?.end_at?.slice(0, 5) }}</b
                                    >
                                </li>
                                <li class="grid grid-cols-3 pt-1.5 px-1">
                                    <span>Lieu:</span>
                                    <b class="col-span-2">{{ reservation.lieu?.name }}</b>
                                </li>
                            </ul>
                        </dd>
                        <Button v-else-if="reservedTab" dark class="mt-3" @click="$emit('add')">
                            Réservez votre séance de conduite
                        </Button>
                    </dl>
                    <dl v-if="!reservedTab && !disabled && !reservation">
                        <dd class="px-1 py-3">
                            {{ `Vous voulez ${isDisponible ? 'supprimer' : 'ajouter'} la disponibilite?` }}
                            <span
                                class="text-primary hover:underline cursor-pointer mx-1"
                                @click.stop="$emit('add', { close, isDisponible })"
                            >
                                {{ isDisponible ? 'Retirer' : 'Ajouter' }}
                            </span>
                            <span class="hover:underline hover:text-blue-500 cursor-pointer mx-1" @click="close"
                                >Annuler</span
                            >
                        </dd>
                    </dl>
                </template>
            </Popover>
            <div v-else-if="!disabled && !reservation && reservedTab" class="block w-full h-full" @click="$emit('add')">
                <Spinner v-if="loading" class="flex-center w-5" />
            </div>
            <div
                v-else-if="!reservedTab && !disabled"
                :class="[
                    '!m-0 flex-center w-full h-full !border-none first-of-type:*:h-full',
                    dispoMutating && 'pointer-events-none',
                ]"
                @click="$emit('add', { isDisponible })"
            >
                <Spinner v-if="loading" class="flex-center w-5" />
            </div>
        </div>
    </div>
</template>
