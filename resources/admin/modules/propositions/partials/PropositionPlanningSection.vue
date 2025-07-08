<script setup>
import {Badge, Button, IndexFilters, Popover, Table} from '@shared/components';
import moment from 'moment-timezone';
import {getMediaUrl} from '@shared/helpers';
import {ItemAvatar} from '@common/components';
import {routes} from '@admin/routes';
import {PencilIcon} from '@heroicons/vue/20/solid';
import {
    PROPOSITION_ACTIVE,
    PROPOSITION_CANCELLED,
    PROPOSITION_PENDING,
    PROPOSITION_RESERVER,
    propositionSessionStatus,
} from '@common/constants';

defineEmits(['proposition:edit']);
defineProps({
    propositions: {
        type: Object,
        default: () => ({}),
    },
});
const headings = [
    { name: 'Proposition', className: 'text-center w-16 !min-w-16' },
    { name: 'Session', className: 'text-center w-16 !min-w-16' },
    { name: 'Eleve' },
    { name: 'Moniteur' },
    { name: 'Message' },
    { name: 'Statut', className: 'text-center' },
    { name: '', className: 'text-center' },
];
</script>
<template>
    <div>
        <IndexFilters />
        <Table v-slot="{ item }" :items="propositions" :headings="headings">
            <td class="cell text-ce nter w-16 !min-w-16">
                <div class="capitalize bg-black/10 text-black flex-center flex-col w-16 h-12 rounded-xl min-w-20">
                    <span class="text-lg font-bold">
                        {{ moment(item.created_at).format('DD') }}
                    </span>
                </div>
            </td>
            <td class="cell text-ce nter w-16 !min-w-16">
                <div class="capitalize bg-primary/10 text-primary flex-center flex-col w-16 h-12 rounded-xl min-w-20">
                    <span class="text-lg font-bold">
                        {{ moment(item.planning.date).format('DD') }}
                    </span>
                    <span class="block text-[10px] font-medium text-primary/80">
                        {{ item.planning.start_at + '-' + item.planning.end_at }}
                    </span>
                </div>
            </td>

            <td class="cell">
                <ItemAvatar
                    :src="getMediaUrl(item.eleve?.user)"
                    size="w-10 h-10"
                    :title="item.eleve?.user?.name"
                    :content="item.eleve?.user?.email"
                    :phone="item.eleve?.user?.telephone"
                    :href="route(routes.users.eleve.general, item?.eleve.id)"
                />
            </td>
            <td class="cell">
                <ItemAvatar
                    v-if="item.planning"
                    :src="getMediaUrl(item.planning.moniteur?.user)"
                    size="w-10 h-10"
                    :title="item.planning.moniteur?.user?.name"
                    :content="item.planning.moniteur?.user?.email"
                    :phone="item.planning.moniteur?.user?.telephone"
                    :href="route(routes.users.moniteur.edit, item.planning.moniteur.id)"
                />
            </td>
            <td class="cell">
                <Popover class="popper-native text-wrap" position="top">
                    <p class="max-w-lg line-clamp-2 w-full text-xs text-gray-500">
                        {{ item.comment }}
                    </p>
                    <template #content>
                        <p class="max-w-md">{{ item.comment }}</p>
                    </template>
                </Popover>
            </td>
            <td class="cell">
                <Badge
                    class="mx-auto"
                    :secondary="item.status === PROPOSITION_PENDING"
                    :success="item.status === PROPOSITION_ACTIVE"
                    :warning="item.status === PROPOSITION_CANCELLED || item.status === PROPOSITION_RESERVER"
                >
                    {{ propositionSessionStatus[item.status]?.name }}
                </Badge>
            </td>
            <td class="cell text-right">
                <Button
                    :icon="PencilIcon"
                    info
                    grouped
                    title="Edit Proposition"
                    @click="$emit('proposition:edit', item)"
                />
            </td>
        </Table>
    </div>
</template>
