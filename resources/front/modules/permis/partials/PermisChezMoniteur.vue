<template>
    <section class="isolate overflow-hidden bg-white">
        <div class="container-app max-md:px-4 py-6 lg:py-12 flex flex-col max-md:gap-10 max-md:text-center">
            <article class="text-center text-black mt-10">
                <h2 class="text-3xl font-bold tracking-tight text-black sm:text-[42px]">
                    Le permis chez Moniteur indépendant
                </h2>
                <p class="text-lg py-6 leading-8">Les avantages de passer le permis chez nous</p>
            </article>
            <article class="flex max-md:flex-col items-center md:mt-32">
                <div class="flex-1 max-md:py-10">
                    <Icon
                        name="permis/permis-chez-moniteur.png"
                        :is_icon="false"
                        class="w-full max-w-60 md:max-w-[495px] mix-blend-darken lg:-translate-x-20"
                    />
                </div>
                <div class="flex-1">
                    <h3 class="text-2xl font-bold tracking-tight text-black sm:text-[42px] leading-snug">
                        Conduite avec un moniteur de votre choix
                    </h3>
                    <div class="space-y-5 mt-10 text-gray-444">
                        <p class="leading-normal">
                            Nos moniteurs professionnels et expérimentés sont tous certifiés et passionnés par
                            l'enseignement de la conduite.
                        </p>
                        <p class="leading-normal">
                            Ils s'adapteront à votre rythme et vous fourniront un soutien personnalisé tout au long de
                            votre parcours vers l'obtention du permis de conduire.
                        </p>
                    </div>
                </div>
            </article>
            <article class="flex max-md:flex-col items-start md:mt-32">
                <div class="flex-1 lg:order-2 max-md:mx-auto max-md:py-16">
                    <Icon
                        name="permis/suivi-progression.png"
                        :is_icon="false"
                        class="w-full max-w-60 md:max-w-[495px] mix-blend-darken lg:translate-x-5 md:ml-auto"
                    />
                </div>
                <div class="flex-1 lg:order-1 md:mt-12">
                    <h3 class="text-2xl font-bold tracking-tight text-black sm:text-[42px] leading-snug lg:max-w-md">
                        Suivi de votre progression en ligne
                    </h3>
                    <div class="space-y-5 mt-10 text-gray-444 lg:max-w-lg">
                        <p class="leading-normal">
                            Avec notre système de suivi de progression en ligne, votre réussite est entre vos mains !
                        </p>
                        <p class="leading-normal">
                            Nous comprenons l'importance de suivre vos avancées tout au long de votre parcours
                            d'apprentissage, c'est pourquoi nous avons créé une plateforme conviviale et interactive
                            pour vous permettre de suivre vos progrès en temps réel.
                        </p>
                    </div>
                </div>
            </article>
            <article class="flex justify-center py-10">
                <OrangeButton class="mt-10 w-fit tracking-wide"> S’inscrire maintenant </OrangeButton>
            </article>
        </div>
    </section>
</template>

<script setup>
import Icon from '@shared/components/Icon.vue';
import { OrangeButton } from '@front/components';
</script>
