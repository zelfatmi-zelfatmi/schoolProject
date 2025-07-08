<template>
    <main>
        <HeroSection />
        <MethodeSection />
        <FonctionneSection />

        <Section_2 />
        <Section_3 />
        <Section_4 />
    </main>
</template>

<script setup>
import { Section_3, Section_2, Section_4 } from '@front/modules/home/partials';
import { HeroSection, MethodeSection, FonctionneSection } from './partials';
import { useHead } from '@vueuse/head';

useHead({
  title: 'Code de la route Oise : Forfait express et illimité en ligne pas cher',
  meta: [
    {
      name: 'title',
      content: 'Code de la route Oise : Forfait express et illimité en ligne pas cher'
    }
  ]
})
</script>
