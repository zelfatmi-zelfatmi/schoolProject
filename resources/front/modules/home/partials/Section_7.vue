<template>
    <div class="bg-bleu-200 pt-10 sm:pt-20 pb-6 sm:pb-[90px]">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-2xl text-center">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-[42px]">Votre permis en 5 étapes</h2>
                <p class="mt-2 text-lg leading-8 text-gray-600">
                    Les témoignages et retours de nos clients sont très positifs comme ci-dessous
                </p>
            </div>
            <div class="flex justify-center items-center w-full flex-col mt-24 relative gap-5 md:gap-64">
                <div class="absolute xl:-top-8 xl:-left-20 sm:-top-24 sm:-left-28 w-full h-full max-md:hidden">
                    <Icon name="home/step/round" class="-z-1 w-full" />
                </div>

                <div class="flex max-md:flex-col md:justify-between gap-5 md:gap-40">
                    <div class="flex gap-3 md:gap-6 md:w-1/2">
                        <div class="flex relative">
                            <span
                                class="max-md:hidden after:bg-orange-100 after:h-36 after:w-1 after:absolute after:-bottom-32 after:left-8 before:bg-orange-100 before:h-5 before:w-5 before:rounded-full before:absolute before:-bottom-36 before:left-6"
                            >
                            </span>
                            <Icon name="home/step/avatar-1" class="w-12 md:w-full" />
                        </div>
                        <div class="flex flex-col justify-center gap-1 flex-1">
                            <span class="text-lg md:text-xl font-semibold">
                                <span class="text-primary">1</span>
                                <span class="uppercase">. Inscription</span>
                            </span>
                            <span class="text-sm font-medium">Inscrivez-vous pour accédez à l’accès formation</span>
                        </div>
                    </div>

                    <div class="flex gap-3 md:gap-6 md:w-1/2">
                        <div class="flex relative">
                            <Icon name="home/step/avatar-2" class="w-12 md:w-full" />
                            <span
                                class="max-md:hidden after:bg-orange-100 after:h-32 after:w-1 after:absolute after:-bottom-32 after:left-8 before:bg-orange-100 before:h-5 before:w-5 before:rounded-full before:absolute before:-bottom-36 before:left-6"
                            >
                            </span>
                        </div>
                        <div class="flex flex-col justify-center gap-1 flex-1">
                            <span class="text-lg md:text-xl font-semibold">
                                <span class="text-primary">2</span>
                                <span class="uppercase">. achetez des heures de conduite</span>
                            </span>
                            <span class="text-sm font-medium"
                                >Achetez des heures de conduite suivant votre budget et vos besoins</span
                            >
                        </div>
                    </div>
                </div>
                <div class="flex max-md:flex-col gap-5 md:gap-40">
                    <div class="flex gap-3 md:gap-6 md:w-1/3">
                        <div class="flex relative">
                            <span class="max-md:hidden absolute top-28 left-14 w-32">
                                <Icon name="home/step/line" class="w-full" />
                            </span>
                            <Icon name="home/step/avatar-3" class="w-12 md:w-44" />
                        </div>
                        <div class="flex flex-col justify-center gap-1 flex-1">
                            <span class="text-lg md:text-xl font-semibold">
                                <span class="text-bleu-300">4</span>
                                <span class="uppercase">. progressez sereinement</span>
                            </span>
                            <span class="text-sm font-medium"
                                >Plus vous conduisez, plus vous gagnerez en confiance et en compétences.</span
                            >
                        </div>
                    </div>

                    <div class="flex gap-3 md:gap-6 md:w-1/3">
                        <div class="flex relative">
                            <Icon name="home/step/avatar-4" class="w-12 md:w-44" />
                            <span
                                class="max-md:hidden after:bg-orange-100 after:h-32 after:w-1 after:absolute after:-bottom-32 after:left-8 before:bg-orange-100 before:h-5 before:w-5 before:rounded-full before:absolute before:-bottom-32 before:left-6"
                            >
                            </span>
                        </div>
                        <div class="flex flex-col justify-center gap-1 flex-1">
                            <span class="text-lg md:text-xl font-semibold">
                                <span class="text-primary">3</span>
                                <span class="uppercase">. choisissez vos moniteurs</span>
                            </span>
                            <span class="text-sm font-medium"
                                >Choisissez un moniteur pour vous acquérir les compétences nécessaires.</span
                            >
                        </div>
                    </div>
                </div>
                <div class="flex gap-3 md:gap-6 max-md:w-full">
                    <div class="flex flex-col md:justify-center gap-1 max-md:flex-1">
                        <span class="text-lg md:text-2xl font-semibold">
                            <span class="text-bleu-300">5</span>
                            <span class="uppercase"
                                >. obtention du permis <br />
                                de conduire
                            </span>
                        </span>
                    </div>
                    <div class="flex relative">
                        <Icon name="home/step/avatar-5" class="max-md:w-20" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Icon from '@shared/components/Icon.vue';
</script>
