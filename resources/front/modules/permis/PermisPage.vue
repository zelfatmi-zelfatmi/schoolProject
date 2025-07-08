<script setup>
import { Section_3, Section_2, Section_4, Section_7 } from '@front/modules/home/partials';
import { HeroSection, EvaluationSection, PermisChezMoniteur, InscritsSection } from './partials';
import { useHead } from '@vueuse/head';

useHead({
  title: 'Permis',
  meta: [
    {
      name: 'title',
      content: 'Permis'
    }
  ]
})
</script>

<template>
    <main>
        <HeroSection />
        <Section_2 />
        <EvaluationSection />
        <PermisChezMoniteur />
        <Section_7 />
        <InscritsSection />
        <Section_3 />
        <Section_4 />
    </main>
</template>
