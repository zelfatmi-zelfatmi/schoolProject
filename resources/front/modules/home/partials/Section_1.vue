<template>
    <section class="overflow-hidden bg-orange-50 py-8">
        <div class="relative container-app flex flex-col md:flex-row items-center md:items-end gap-x-6">
            
            <!-- Bloc Gauche : Texte et Illustration -->
            <div class="w-full max-w-3xl flex-shrink-0 lg:mx-0 lg:max-w-2xl transform md:-translate-y-28 text-center md:text-left">
                <div>
                    <h1 class="text-2xl md:text-[56px] font-medium leading-10 tracking-tight text-black">
                        L'auto école en ligne
                    </h1>
                    <h2 class="font-outfit relative mt-3 text-4xl md:text-6xl font-bold leading-none inline-block">
                        <span class="relative">
                            <span class="absolute left-0 bottom-0 w-full h-[16px] md:h-[26px] bg-yellow-300 z-0"></span>
                            <span class="relative text-3xl md:text-6xl font-bold tracking-tight text-black">
                                qui ne te lâche pas !
                            </span>
                        </span>
                    </h2>
                </div>

                <!-- Illustration Personnage + Voiture -->
                <Icon
                    name="home/nos-client.png"
                    :is_icon="false"
                    class="flex-1 object-contain w-full max-w-sm md:max-w-xl mix-blend-multiply mt-6 mx-auto md:mx-0"
                />

                <!-- Numéro de Téléphone -->
                <div class="flex justify-center md:justify-start w-full -mt-10 md:-mt-28">
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c40ae2154c2408a0c379eec933f187f2022b23ee2b43aa854778da0b5546f8a7"
                        alt="Numéro de téléphone"
                        class="w-[280px] md:w-[450px]"
                    />
                </div>
            </div>

            <!-- Bloc Droit : Formulaire -->
            <div class="w-full md:w-[45%] lg:w-[50%] flex-shrink-0 lg:mx-0 max-w-xl mx-auto">
                <ContactForm />
            </div>

        </div>
    </section>
</template>

<script setup>
import Icon from '@shared/components/Icon.vue';
import ContactForm from './ContactForm.vue';

</script>

<style scoped>
.font-outfit {
  font-family: 'Outfit', sans-serif;
}
</style>
