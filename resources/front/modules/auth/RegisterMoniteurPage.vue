<script setup>
import { Icon } from '@shared/components';
import { ContentFormSection, RegisterMoniteurform } from './partials';
import { useHead } from '@vueuse/head';

useHead({
  title: 'Devenir Moniteur',
  meta: [
    {
      name: 'title',
      content: 'Devenir Moniteur'
    }
  ]
})
</script>
<template>
    <main>
        <div class="bg-orange-50">
            <section class="container-app flex flex-col lg:flex-row">
                <ContentFormSection />
                <RegisterMoniteurform />
            </section>
            <section class="bg-white">
                <article class="container-app -translate-y-8 -mb-9">
                    <Icon
                        name="devenir-moniteur/car.png"
                        :is_icon="false"
                        class="md:-translate-x-20 xl:-translate-x-36 -z-1 max-w-[722px] w-full"
                    />
                </article>
            </section>
        </div>
    </main>
</template>
