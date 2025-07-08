<template>
    <div class="bg-white py-24 sm:py-32 relative">
        <div class="relative isolate">
            <div class="container-app max-md:px-0">
                <div
                    class="mx-auto flex max-w-2xl flex-col gap-16 bg-bleu-100 px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20"
                >
                    <div class="w-full flex-auto">
                        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-[42px] leading-snug">
                            Financez votre permis grâce à votre compte CPF
                        </h2>
                        <p class="mt-6 text-lg leading-8 text-gray-300">
                            Avec nos offres CPF, vous pouvez financer entiérement votre formation.
                        </p>

                        <div class="flex flex-wrap gap-6 mt-10 w-full">
                            <OrangeButton class="w-full sm:w-[50%]" :href="link1" >JE veux être rappelé</OrangeButton>
                            <LightButton
                                class="w-full sm:w-[45%] shadow-box-3 font-semibold ring-white hover:ring-primary" :href="link2"
                            >
                                Voir les offres</LightButton
                            >
                        </div>
                    </div>
                    <div
                        class="px-4 text-center bg-white flex justify-center items-center h-auto sm:w-64 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:max-w-xs"
                    >
                        <img
                            src="@img/home/formation.png"
                            alt="Mon Compte Formation"
                            class="flex justify-center items-center w-64"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { LightButton, OrangeButton } from '@front/components';
import { routes } from '@front/routes';
const link1=ref("contact");
const link2=ref("cpf")
</script>
