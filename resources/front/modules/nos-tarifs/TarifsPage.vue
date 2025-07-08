<template>
    <main>
        <TopSection />
        <TarifsSection :products="products" class="isolate overflow-hidden bg-white text-black lg:py-20" />
        <ContentSection />
    </main>
</template>

<script setup>
import { TopSection, ContentSection } from './partials';
import { TarifsSection } from '@common/components';
import { useHead } from '@vueuse/head';

useHead({
  title: 'Tarifs',
  meta: [
    {
      name: 'title',
      content: 'Tarifs'
    }
  ]
})
defineProps({
    products: {
        type: Object,
        default: () => ({}),
    },
});
</script>
