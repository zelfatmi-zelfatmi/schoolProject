<template>
    <div class="bg-white py-8 sm:py-12">
        <div class="relative isolate">
            <div class="container-app">
                <div
                    class="flex flex-col gap-16 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:py-8 lg:mx-0 lg:flex-row lg:items-center lg:py-20 xl:gap-x-20">
                    <div
                        class="h-auto lg:h-[447px] bg-gray-70 flex justify-center items-center w-full flex-none rounded-2xl object-cover  lg:aspect-square  lg:max-w-sm">
                        <img src="/assets/images/home/section_6.png" class="w-full h-full object-contain mix-blend-darken">
                    </div>
                    <div class="w-full flex flex-col gap-4">
                        <div>
                        <span
                            class="text-3xl font-bold tracking-tight text-black sm:text-[42px]">Code de la route en ligne</span>
                        <p class="mt-6 text-sm leading-8 text-black">Devenez plus fort et gagnez en assurance grâce au
                            milliers de questions que nous vous proposons</p>
                        </div>
                        <div class="flex gap-8 flex-col">
                            <div class="flex gap-4 justify-start items-center">
                                <Icon name="home/test_tematique" class="w-16 h-16"/>
                                <div class="flex flex-col gap-2">
                                    <p class="text-md font-semibold ">Passez le test par thématique</p>
                                    <p>Besoin de réviser une thématique en particulier ? Entrainez-vous pour combler vos
                                        lacunes</p>
                                </div>
                            </div>

                            <div class="flex gap-4 justify-start items-center">
                                <Icon name="home/test_examan.png" :is_icon="false" class="w-16 h-16"/>
                                <div class="flex flex-col gap-2">
                                    <p class="text-md font-semibold ">Passez le test en mode examen</p>
                                    <p>Plongez dans le grand bain et testez vos connaissances en condition d'examen</p>
                                </div>
                            </div>
                        </div>

                        <div class="flex mt-10">
                        <OrangeButton > En savoir plus</OrangeButton>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import Icon from "@shared/components/Icon.vue";
import {OrangeButton} from "@front/components";

</script>
