<script setup>
import { Modal, Button, Thumb } from '@shared/components';
import { dateFormat } from '@shared/helpers';
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/20/solid';
import { usePlanningSession } from '@admin/stores';

defineProps({
    sessions: [Array, null],
});

const session = usePlanningSession();
const emit = defineEmits(['close']);

const close = () => {
    emit('close');
};
const handleEdit = (item) => {
    session.selectedSession = item;
    session.show = true;
};
const handleDelete = (item) => {
    session.selectedSession = item;
    session.delete = true;
};
</script>

<template>
    <Modal :show="!!sessions && !session.show && !session.delete" max-width="md" title="Session Details" @close="close">
        <div class="border-y bg-white border-y-slate-300 flex gap-5">
            <div class="flex-1">
                <ul class="divide-y-4 divide-white px-2 pb-1">
                    <li class="grid grid-cols-9 gap-3 pt-2 px-2 pb-1 font-medium text-sm">
                        <span class="col-span-2 pl-1.5">Eleve</span>
                        <span class="col-span-2">Moniteur</span>
                        <span class="col-span-2">Session</span>
                        <span class="col-span-2">Lieu</span>
                    </li>
                    <li
                        v-for="(item, index) in sessions"
                        :key="index"
                        :class="['grid grid-cols-9 py-1 gap-3 bg-opacity-10 rounded-lg']"
                        :style="{
                            backgroundColor: item?.session?.product?.color || '',
                        }"
                    >
                        <div class="col-span-2 flex gap-3 items-center relative pl-3">
                            <span
                                :class="['absolute left-0 inset-y-1 w-1 rounded-r-full']"
                                :style="{
                                    backgroundColor: item?.session?.product?.color || '',
                                }"
                            ></span>
                            <Thumb
                                :src="item.session?.eleve?.user?.media || item.session?.eleve?.user?.profile_photo_url"
                                size="md"
                            />
                            <p class="text-lg">{{ item.session?.eleve?.user?.name }}</p>
                        </div>
                        <div class="col-span-2 flex gap-3 items-center">
                            <Thumb
                                :src="item.moniteur?.user?.media || item.moniteur?.user?.profile_photo_url"
                                size="md"
                            />
                            <p class="text-lg">{{ item.moniteur?.user?.name }}</p>
                        </div>
                        <div class="col-span-2 flex flex-col text-sm">
                            <b>{{ dateFormat(item?.date, 'fr') }}</b>
                            {{ item?.start_at?.slice(0, 5) }} - {{ item?.end_at?.slice(0, 5) }}
                        </div>
                        <div class="col-span-2 flex-center justify-start text-sm">
                            {{ item.lieu?.name }}
                        </div>
                        <div class="flex gap-2 justify-end items-center">
                            <Button link info @click="handleEdit(item)"><PencilSquareIcon class="w-5" /></Button>
                            <Button link danger @click="handleDelete(item)"><TrashIcon class="w-5" /></Button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="flex flex-row justify-end p-4 bg-gray-100 text-right">
            <Button secondary @click="close">Annuler</Button>
        </div>
    </Modal>
</template>
