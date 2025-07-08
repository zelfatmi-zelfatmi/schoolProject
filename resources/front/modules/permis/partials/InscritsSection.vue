<template>
    <section class="isolate overflow-hidden bg-white">
        <div class="container-app max-md:px-4">
            <article class="md:flex items-center mt-16 md:mt-32">
                <div class="flex-1 md:order-2">
                    <Icon
                        name="permis/inscris.png"
                        :is_icon="false"
                        class="w-full max-w-[535px] mix-blend-darken lg:translate-x-10 md:ml-auto"
                    />
                </div>
                <div class="flex-1 md:order-1 max-md:text-center max-md:my-10">
                    <h3 class="text-2xl font-bold tracking-tight text-black sm:text-[42px] leading-snug lg:max-w-md">
                        Plus de 1000 inscrits chaque année
                    </h3>
                    <div class="space-y-5 mt-10 text-gray-444 lg:max-w-lg">
                        <p class="leading-normal">
                            Chaque année, Moniteur Indépendant attire plus de 1000 inscrits, et nous en sommes fiers !
                            Nous sommes ravis de voir toujours plus d'élèves nous faire confiance pour leur formation à
                            la conduite.
                        </p>
                    </div>
                    <OrangeButton class="mt-10 max-md:mx-auto md:mt-16 w-fit tracking-wide">
                        Je passe le mien
                    </OrangeButton>
                </div>
            </article>
        </div>
    </section>
</template>

<script setup>
import Icon from '@shared/components/Icon.vue';
import { OrangeButton } from '@front/components';
</script>
