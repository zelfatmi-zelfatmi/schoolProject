<script setup>
import { Head } from '@inertiajs/vue3';
import { TabSwitch } from '@shared/components';
import { ref } from 'vue';
import { CGUsection, CGVsection } from './partials';
import { useParams } from '@shared/hooks';
import { useHead } from '@vueuse/head';

useHead({
  title: 'Conditions générales d\'utilisation',
  meta: [
    {
      name: 'title',
      content: 'Conditions générales d\'utilisation'
    }
  ]
})

const tabs = [
    {
        name: "Conditions générales d'utilisation",
        id: 'cgu',
    },
    {
        name: 'Conditions générales de vente',
        id: 'cgv',
    },
];
const params = useParams({ reload: false });
const tab = ref(params.tab || tabs[0].id);
</script>

<template>
    <!-- <Head title="Mentions légales" /> -->

    <div class="font-sans text-gray-900 antialiased">
        <div class="pt-4 bg-gray-100">
            <div class="min-h-screen flex flex-col items-center pt-6 sm:pt-0">
                <div class="mt-10">
                    <TabSwitch v-model="tab" full size="xl" :items="tabs" @change="params.update({ tab: $event })" />
                </div>

                <div class="w-full sm:max-w-7xl mt-6 p-6 sm:rounded-lg prose">
                    <CGUsection v-if="tab === 'cgu'" />
                    <CGVsection v-else />
                </div>
            </div>
        </div>
    </div>
</template>
