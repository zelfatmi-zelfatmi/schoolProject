<template>
    <div class="isolate overflow-hidden bg-orange-50">
        <div class="">
            <div class="relative pb-24 pt-10 sm:pb-60 lg:grid lg:grid-cols-2 container-app lg:py-24">
                <div class="lg:py-16">
                    <div class="mx-auto max-w-2xl">
                        <div class="max-w-lg">
                            <h2 class="mt-10 text-3xl font-bold tracking-tight text-black sm:text-[42px]">
                                L’heure d’évaluation est à 35€ seulement
                            </h2>
                            <div class="mt-6 flex flex-col text-lg text-black">
                                <p class="mt-4 mb-6">
                                    Cette évaluation de départ s'effectue au début de la formation du candidat et dure
                                    1h. Elle permet d'évaluer deux éléments essentiel dans le cadre de la formation des
                                    aspirants conducteurs :
                                </p>
                                <ul class="flex flex-col gap-5">
                                    <li v-for="(item, idx) in list" :key="idx" class="flex items-start gap-3">
                                        <SvgIcon :name="item.icon" fill="none" class="w-5 h-5" />
                                        <p class="flex-1 -mt-0.5">
                                            {{ item.content }}
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <Icon
                    name="permis/evalution.png"
                    :is_icon="false"
                    class="absolute max-md:bottom-0 md:top-1/2 md:-translate-y-1/2 -right-5 -z-1 max-w-xs md:max-w-[542px] mix-blend-darken"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import Icon from '@shared/components/Icon.vue';
import { SvgIcon } from '@shared/components';
const list = [
    {
        icon: 'circle-check',
        content: "Diagnostiquer les compétences de l'élève en matière de conduite",
    },
    {
        icon: 'circle-check',
        content:
            'Èvaluer le volume horaire de formation nécessaire pour atteindre les compétences requises pour être un conducteur sûr et responsable',
    },
];
</script>
