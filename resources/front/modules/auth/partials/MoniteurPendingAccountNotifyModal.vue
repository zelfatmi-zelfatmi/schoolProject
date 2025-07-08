<script setup>
import {LightButton, OrangeButton} from '@front/components';
import {routes} from '@front/routes';
import {IdentificationIcon} from '@heroicons/vue/20/solid';
import {Modal} from '@shared/components';

const show = defineModel({
    key: 'show',
    type: Boolean,
    default: false,
});
</script>
<template>
    <Modal :show="show" max-width="sm" @close="show = false">
        <div class="p-5 text-center">
            <div class="w-28 h-28 flex-center rounded-full bg-orange-100 text-white mx-auto my-5">
                <IdentificationIcon class="w-12" />
            </div>
            <h2 class="font-medium text-2xl my-5">
                Votre compte est en attente de validation. Vous serez notifié par email dès que votre compte sera
                activé.
            </h2>
            <p class="text-gray-600">
                Si vous avez des questions, veuillez nous contacter à l'adresse suivante :
                <a class="btn btn-link btn-perimary" href="mailto:contactmoniteurindependant@gmail.com">
                    contactmoniteurindependant@gmail.com </a>
            </p>
        </div>
        <div class="flex p-5 gap-5">
            <LightButton class="!px-6" @click="show = false">Continue votre navigation</LightButton>
            <OrangeButton reload class="flex-1 !px-2" :href="route(routes.login)">
                Connect sur votre espace moniteur
            </OrangeButton>
        </div>
    </Modal>
</template>
