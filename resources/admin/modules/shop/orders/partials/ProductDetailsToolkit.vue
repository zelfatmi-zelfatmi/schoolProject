<template>
    <Popover :disabled="disabled" dark>
        <ArchiveBoxArrowDownIcon class="w-5 h-5 text-gray-500" />
        <template #content>
            <article class="flex -m-1.5 rounded-xl overflow-y-auto">
                <Table
                    v-slot="{ item }"
                    :headings="headings"
                    :is-loading="false"
                    :items="products"
                    is-black
                    class="w-full"
                >
                    <td class="py-1 px-2 !text-xs">
                        <div class="flex-center justify-start gap-3">
                            <Thumb
                                :src="item.product?.media?.storage_media ? item?.product?.media?.storage_media?.path : null"
                                class="!w-10 !h-10 !object-cover"
                            />
                            <b class="!text-xxs">
                                {{ item.product?.name }}
                            </b>
                        </div>
                    </td>

                    <td class="py-1 px-2 text-center text-xxs">
                        {{ item.product?.type }}
                    </td>
                    <td class="py-1 px-2 text-center text-xxs">
                        <b>
                            {{ item.product?.type_offre }}
                        </b>
                    </td>
                    <td class="py-1 px-2 text-center text-xxs">
                        <b>
                            {{ item.product?.prix }}
                        </b>
                    </td>
                    <td class="py-1 px-2 text-center text-xxs">
                        <b> {{ item.product?.promo }} % </b>
                    </td>
                    <td class="py-1 px-2 text-center text-xxs">
                        <b>
                            {{ item.product?.solde }}
                        </b>
                    </td>
                </Table>
            </article>
        </template>
    </Popover>
</template>

<script setup>
import {ArchiveBoxArrowDownIcon} from '@heroicons/vue/20/solid';
import {Popover, Table, Thumb} from '@shared/components';
import {onMounted, ref, watch} from 'vue';

const props = defineProps({
    details: Array,
    price: Number,
    disabled: Boolean,
});
const products = ref(null);
onMounted(() => {
    products.value = { data: props.details };
});
watch(
    () => props.details,
    (data) => {
        if (data) {
            products.value = { data: props.details };
        }
    }
);
const headStyling = 'text-center text-xxs sticky top-0 pb-2 px-2 bg-gray-950';
const headings = [
    { name: 'Produit', className: headStyling },
    { name: 'Type', className: headStyling },
    { name: 'Offre', className: headStyling },
    { name: 'Prix', className: headStyling },
    { name: 'Promo', className: headStyling },
    { name: 'Solde', className: headStyling },
];
</script>
