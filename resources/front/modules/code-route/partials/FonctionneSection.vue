<template>
    <section class="isolate overflow-hidden bg-orange-50">
        <div class="container-app py-6 lg:py-12">
            <article class="text-center text-black mt-10">
                <h2 class="text-2xl font-bold tracking-tight text-black sm:text-[42px]">Comment ça fonctionne</h2>
                <p class="text-lg py-6 leading-8 max-w-xl mx-auto">
                    Le code de la route porte sur une série de 10 thématiques couvrant l’ensemble des différents
                    éléments liés aux règles de circulation.
                </p>
            </article>
            <article class="flex max-md:flex-col items-start mt-32">
                <div class="flex-1 lg:order-2 max-md:mx-auto">
                    <Icon
                        name="code-route/thematique.png"
                        :is_icon="false"
                        class="w-full max-w-60 md:max-w-[537px] mix-blend-darken lg:translate-x-10 md:ml-auto"
                    />
                </div>
                <div class="flex-1 lg:order-1 mt-12">
                    <h3 class="text-3xl font-bold tracking-tight text-black sm:text-[42px] leading-snug lg:max-w-md">
                        Test par thématique
                    </h3>
                    <div class="space-y-5 mt-10 text-gray-444 lg:max-w-lg">
                        <p class="leading-normal">
                            Le code de la route porte sur une série de 10 thématiques couvrant l’ensemble des différents
                            éléments liés aux règles de circulation des véhicules sur les routes avec d’autres usagers.
                        </p>
                        <ul class="flex flex-wrap gap-3">
                            <li
                                v-for="tag in tags"
                                :key="tag"
                                class="leading-8 text-xs md:text-sm border border-orange-100 rounded-full md:py-[10px] px-2 md:px-5 bg-white"
                            >
                                {{ tag }}
                            </li>
                        </ul>
                    </div>
                </div>
            </article>
            <article class="flex max-md:flex-col items-center mt-32">
                <div class="flex-1">
                    <Icon
                        name="code-route/examen.png"
                        :is_icon="false"
                        class="w-full max-w-60 md:max-w-[495px] mix-blend-darken lg:-translate-x-20"
                    />
                </div>
                <div class="flex-1">
                    <h3 class="text-2xl font-bold tracking-tight text-black sm:text-[42px] leading-snug">
                        Test en mode examen
                    </h3>
                    <div class="space-y-5 mt-10 text-gray-444">
                        <p class="leading-normal">
                            Lors du Test en mode examen vous serez soumis à une série d'épreuves pratiques et théoriques
                            qui évalueront vos connaissances et vos compétences en matière de conduite.
                        </p>
                        <p class="leading-normal">
                            Ces tests vous permettront de vous familiariser avec le format de l'examen, la durée des
                            épreuves, ainsi que les différentes situations que vous pourriez rencontrer sur la route.
                        </p>
                    </div>
                </div>
            </article>

            <article class="flex justify-center py-10">
                <OrangeButton :href="linkInscription" class="mt-10 w-fit tracking-wide"> S’inscrire maintenant </OrangeButton>
            </article>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import Icon from '@shared/components/Icon.vue';
import { OrangeButton } from '@front/components';
const linkInscription=ref("inscription/eleve");

const tags = [
    'La signalisation',
    'Les ronds points',
    'Equipement du véhicule',
    'Visibilités / Eclairage',
    'Arrêt / Stationnement',
    'Signalisation 2',
    'Croisement / Dépassement',
    'Questions écrites',
    'Règles de circulation',
    'Signalisation au sol',
];
</script>
