<template>
    <div class="isolate overflow-hidden bg-orange-50">
        <div class="max-w-[120rem] relative mx-auto">
            <div class="pb-24 pt-20 sm:pb-60 lg:grid lg:grid-cols-2 container-app lg:py-36">
                <!-- Texte -->
                <div class="lg:py-16">
                    <div class="mx-auto max-w-2xl max-md:px-4">
                        <div class="max-w-lg">
                            <h2 class="text-3xl font-bold leading-10 tracking-tight text-black md:text-[56px]">
                                Permis de conduire
                            </h2>
                            <span class="mt-6 flex flex-col md:text-2xl font-medium text-gray-700">
                                <p class="my-4">
                                    Prenez le volant de votre avenir avec Moniteur Indépendant pour obtenir votre permis
                                    de conduire en toute sérénité !
                                </p>
                                <OrangeButton class="mt-5 md:mt-10 w-fit tracking-wide">
                                    S’inscrire maintenant
                                </OrangeButton>
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Image -->
                <Icon
                    name="permis/permis-hero.png"
                    :is_icon="false"
                    class="absolute bottom-0 right-0 md:-right-40 -z-1 max-w-xs md:max-w-2xl"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { OrangeButton } from '@front/components';
import Icon from '@shared/components/Icon.vue';
</script>
