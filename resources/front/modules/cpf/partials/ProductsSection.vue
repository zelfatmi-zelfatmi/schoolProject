<template>
    <section class="isolate overflow-hidden bg-white text-black py-20">
        <div
            v-if="cart.state.successMsg"
            class="text-sm text-green-700 bg-green-100 text-center py-2 rounded-full border border-green-400 max-w-xl md:mx-auto mb-3 md:mb-5 mx-4"
        >
            {{ cart.state.successMsg }}
        </div>
        <article class="container-app lg:pb-24">
            <ul class="grid md:grid-cols-3 gap-3 md:gap-5">
                <li
                    v-for="(item, idx) in list"
                    :key="idx"
                    class="flex-1 text-center flex flex-col shadow-box-2 rounded-3xl p-6 gap-5"
                >
                    <div class="relative w-full flex-center my-6">
                        <template v-if="item.solde">
                            <SvgHourCount v-for="(hour, key) in getIconValues(item.solde)" :key="key" :hours="hour" />
                        </template>
                        <Icon v-else name="cpf/forfais-user" class="w-fit mx-auto" />
                    </div>
                    <h4 class="text-xl leading-8 text-gray-444 font-semibold max-w-[16rem] mx-auto min-h-[4rem]">
                        {{ item.name }}
                    </h4>
                    <h3 class="text-[52px] font-bold flex items-start justify-center">
                        {{ moneyFormat(item.price, '') }}
                        <span class="text-3xl mt-1"> € </span>
                    </h3>
                    <LightButton reload target="_blank" class="w-full md:w-fit mx-auto" :href="item.href">
                        Choisir cette offre
                    </LightButton>
                </li>
            </ul>
        </article>
    </section>
</template>

<script setup>
import { LightButton, OrangeButton } from '@front/components';
import Icon from '@shared/components/Icon.vue';
import SvgHourCount from './SvgHourCount.vue';
import { moneyFormat } from '@shared/helpers';
import { useCart } from '@shared/stores';
import { Button } from '@shared/components';
import { getIconValues } from '@common/helpers';
defineProps({
    products: Object,
});
const cart = useCart();
const list = [
    {
        name: 'CPF 5H BM',
        href: 'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/88354652500014_Offre3/88354652500014_Offre3?contexteFormation=ACTIVITE_PROFESSIONNELLE',
        price: 299,
        solde: 5,
    },
    {
        name: 'CPF 10H BM',
        href: 'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/88354652500014_Offre6/88354652500014_Offre6?contexteFormation=ACTIVITE_PROFESSIONNELLE',
        price: 590,
        solde: 10,
    },
    {
        name: 'CPF 20H BM',
        href: 'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/88354652500014_Offre9/88354652500014_Offre9?contexteFormation=ACTIVITE_PROFESSIONNELLE',
        price: 1160,
        solde: 20,
    },
    {
        name: 'CPF 5H BA',
        href: 'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/88354652500014_Offre4/88354652500014_Offre4?contexteFormation=ACTIVITE_PROFESSIONNELLE',
        price: 350,
        solde: 5,
    },
    {
        name: '20 heures de conduite en boite automatique',
        href: 'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/88354652500014_a23/88354652500014_a23?contexteFormation=ACTIVITE_PROFESSIONNELLE',
        price: 1300,
        solde: 20,
    },
    {
        name: '13 heures de conduite sur boite automatique',
        href: 'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/88354652500014_Offre8/88354652500014_Offre8?contexteFormation=ACTIVITE_PROFESSIONNELLE',
        price: 850,
        solde: 13,
    },
    {
        name: 'Forfait permis premium boîte manuelle (30 heures)',
        href: 'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/88354652500014_Offre11/88354652500014_Offre11?contexteFormation=ACTIVITE_PROFESSIONNELLE',
        price: 1750,
        solde: 30,
    },
    {
        name: 'Forfait permis premium boite automatique (30 heures) ',
        href: 'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/88354652500014_Offre12/88354652500014_Offre12?contexteFormation=ACTIVITE_PROFESSIONNELLE',
        price: 1990,
        solde: 30,
    },
    {
        name: 'Pass Permis Express',
        href: 'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/88354652500014_Offre7/88354652500014_Offre7?contexteFormation=ACTIVITE_PROFESSIONNELLE',
        price: 490,
        solde: 5,
    }
];
</script>
