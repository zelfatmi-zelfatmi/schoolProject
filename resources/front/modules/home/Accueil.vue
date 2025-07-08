<script setup>
import {
    Section_1,
    Section_2,
    Section_3,
    Section_4,
    Section_5,
    Section_6,
    Section_8,
    Section_9,
    Section_7,
} from './partials';
import { useHead } from '@vueuse/head';

defineProps({
    articles: Object,
});

useHead({
  title: 'Auto école pas cher et rapide, le permis de conduire pour tous !',
  meta: [
    {
      name: 'title',
      content: 'Auto école pas cher et rapide, le permis de conduire pour tous !'
    },
    {
      name: 'robots',
      content: import.meta.env.PROD ? 'index, follow' : 'noindex, nofollow'
    }
  ]
})
</script>
<template>
    <main>
        <Section_1 />
        <Section_2 /> 
         <Section_3 />
        <Section_4 />
        <Section_5 />
        <Section_6 />
        <Section_7 />
        <Section_8 />
        <Section_9 :articles="articles" /> 
    </main>
</template>
