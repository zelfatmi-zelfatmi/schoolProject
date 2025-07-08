<template>
        <!-- <Head title="MoniteurIndependant" /> -->
    <main>
        <TopSection />
        <Section_4 class="!py-0" />
        <ProductsSection :products="products" />
    </main>
</template>

<script setup>
import { Section_4 } from '@front/modules/home/partials';
import { TopSection, ProductsSection } from './partials';
import {Head} from '@inertiajs/vue3';
import { useHead } from '@vueuse/head';

useHead({
  title: 'Nos offres',
  meta: [
    {
      name: 'title',
      content: 'Nos offres'
    }
  ]
})
defineProps({
    products: Object,
});
</script>
