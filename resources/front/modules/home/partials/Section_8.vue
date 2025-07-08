<template>
    <div class="bg-white py-8 sm:py-12">
        <div class="relative isolate">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div
                    class="mx-auto flex max-w-2xl flex-col gap-24 bg-white px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20"
                >
                    <Icon name="home/section_7" />

                    <div class="flex flex-col items-center gap-4 md:ml-24">
                        <div class="max-md:text-center">
                            <span class="text-3xl font-bold tracking-tight text-black sm:text-[42px]"
                                >Appelez-nous</span
                            >
                            <p class="mt-6 text-sm leading-8 text-black">
                                Vous pouvez nous joindre directement
                                <br />
                                au +33 01 84 80 03 00
                            </p>
                        </div>

                        <div class="flex mt-10">
                            <OrangeButton>Appelez maintenant</OrangeButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Icon from '@shared/components/Icon.vue';
import { OrangeButton } from '@front/components';
</script>
