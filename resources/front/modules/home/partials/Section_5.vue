<template>
    <div class="isolate overflow-hidden bg-white">
        <div class="max-w-[120rem] relative mx-auto">
            <section class="pb-24 pt-10 sm:pb-60 grid lg:grid-cols-2 container-app lg:py-6 md:items-end">
                <article class="lg:py-16 max-md:order-2">
                    <div class="mx-auto max-w-2xl">
                        <div class="max-w-lg">
                            <h1
                                class="mt-10 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black sm:text-[42px]"
                            >
                                Permis de conduire
                            </h1>
                            <div class="mt-6 flex flex-col text-md font-medium text-gray-600">
                                <span class="my-4">
                                    <span class="text-primary"> Le permis</span> B vous permet de conduire plusieurs
                                    types de véhicules : voiture, moto, scooter, camionnette/véhicule utilitaire,
                                    camping car et tracteur.
                                </span>
                                <span class="my-4">
                                    Il vous offre la possibilité de conduire des véhicules qui ont un usage courant.
                                </span>

                                <span class="flex mt-10">
                                    <OrangeButton :href="codeLink"> En savoir plus</OrangeButton>
                                </span>
                            </div>
                        </div>
                    </div>
                </article>
                <Icon
                    name="home/permis-conduite.png"
                    :is_icon="false"
                    class="abso lute md:top-0 top-72 right-0 -z-1 w-full max-md:order-1"
                />
            </section>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { OrangeButton } from '@front/components';
import { routes } from '@front/routes';
import Icon from '@shared/components/Icon.vue';
const codeLink=ref("code-route");
</script>
