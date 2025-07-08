<template>
    <div class="isolate overflow-hidden bg-orange-50">
        <div class="max-w-[120rem] relative mx-auto">
            <div class="pb-24 pt-10 sm:pb-60 lg:grid lg:grid-cols-2 container-app lg:py-36">
                <div class="lg:py-16">
                    <div class="mx-auto max-w-2xl">
                        <div class="max-w-lg">
                            <h2 class="text-3xl font-bold leading-10 tracking-tight text-black md:text-[56px]">
                                Code de la route
                            </h2>
                            <span class="mt-6 flex flex-col md:text-2xl font-medium text-gray-700">
                                <p class="my-4">
                                    Devenez plus fort et gagnez en assurance grâce au milliers de questions que nous
                                    vous proposons
                                </p>
                                <OrangeButton :href="linkInscription" class="mt-10 w-fit tracking-wide"> S’inscrire maintenant </OrangeButton>
                            </span>
                        </div>
                    </div>
                </div>
                <Icon
                    name="code-route/code-route.png"
                    :is_icon="false"
                    class="absolute bottom-0 right-0 -z-1 max-w-72 md:max-w-2xl"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { OrangeButton } from '@front/components';
import Icon from '@shared/components/Icon.vue';
const linkInscription=ref("inscription/eleve");

</script>
