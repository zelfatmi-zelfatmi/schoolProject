<script setup>
import { ref, computed, onMounted } from 'vue';
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue';
import BoiteManuelle from '@assets/icons/home/boite-manuelle.svg';
import BoiteAuto from '@assets/icons/home/boite-auto.svg';
import { useQuery } from '@shared/hooks';
import { getMediaUrl, strip } from '@shared/helpers';
import { useCart } from '@shared/stores';
import { Button, TabSwitch } from '@shared/components';
import { OrangeButton } from '@front/components';

const formatUrl = (href) => {
    if (!href.startsWith('http')) {
        return new URL(href, import.meta.env.VITE_APP_URL).href;
    }
    return href;
};

const pageQuery = useQuery(
    {
        url: formatUrl("api/pages/home"),
        dataType: {},
    },
    true
);

const linkInscription = ref("inscription/eleve");
const cart = useCart();
const enabled = ref(false);
const products = computed(() => (enabled.value ? pageQuery.data?.extra_product_auto : pageQuery.data?.products));

const currentSlide = ref(0);
const slider = ref(null);

const onScroll = () => {
    if (!slider.value) return;
    const scrollLeft = slider.value.scrollLeft;
    const slideWidth = slider.value.offsetWidth;
    const index = Math.round(scrollLeft / slideWidth);
    currentSlide.value = index;
};

onMounted(() => {
    if (slider.value) {
        slider.value.addEventListener('scroll', onScroll, { passive: true });
    }
});
</script>

<template>
    <div class="bg-white py-24 sm:py-10">
        <div class="container-app">
            <div class="mx-auto max-w-4xl text-center">
                <p class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-[42px]">
                    Tarifs simple et clairs
                </p>
            </div>
            <p class="mt-4 text-center text-lg leading-8 text-gray-600">
                Avec moniteurindependant.fr passez votre permis sans vous ruiner
            </p>

            <div class="mt-16 flex justify-center">
                <!-- Mobile Switch -->
                <TabSwitch
                    v-model="enabled"
                    full
                    class="bg-slate-200 md:hidden"
                    size="lg"
                    :items="[
                        {
                            name: 'Boîte manuelle',
                            className: '!flex-row gap-x-2 text-xs',
                            id: false,
                            icon: BoiteManuelle,
                        },
                        {
                            name: 'Boîte automatique',
                            className: '!flex-row gap-x-2 text-xs',
                            id: true,
                            icon: BoiteAuto,
                        },
                    ]"
                />

                <!-- Desktop Switch -->
                <SwitchGroup as="div" class="hidden md:flex items-center gap-3">
                    <SwitchLabel as="span" class="ml-3 text-sm flex gap-3 justify-center items-center">
                        <span class="font-medium md:text-2xl text-gray-900">Boîte manuelle</span>
                        <BoiteManuelle class="text-primary" />
                    </SwitchLabel>
                    <Switch
                        v-model="enabled"
                        class="relative inline-flex h-8 w-16 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-100 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                        <span
                            aria-hidden="true"
                            :class="[
                                enabled ? 'translate-x-8' : 'translate-x-0',
                                'pointer-events-none inline-block h-7 w-7 transform rounded-full bg-primary shadow ring-0 transition duration-200 ease-in-out',
                            ]"
                        />
                    </Switch>
                    <SwitchLabel as="span" class="ml-3 text-sm flex gap-2 justify-center items-center">
                        <BoiteAuto class="text-primary" />
                        <span class="font-medium md:text-2xl text-gray-900">Boîte automatique</span>
                    </SwitchLabel>
                </SwitchGroup>
            </div>
            <!-- BULLES MOBILE -->
<!-- BULLES DE NAVIGATION AMÉLIORÉES -->
             <div class="flex justify-center items-center mt-6 md:hidden gap-3">
             <span
              v-for="(item, index) in products"
             :key="index"
             :class="[
             'h-3 w-3 rounded-full border transition-all duration-300',
              currentSlide === index
              ? 'bg-primary border-primary scale-110'
             : 'bg-white border-gray-300'
             ]"
            ></span>
            </div>

            <!-- SLIDER -->
            <div
                class="slider-mobile mt-6 md:grid grid-cols-1 gap-8 lg:grid-cols-3 overflow-x-auto scroll-smooth snap-x snap-mandatory md:overflow-visible max-md:py-16"
                ref="slider"
            >
                <fieldset
                    v-for="(item, index) in products"
                    :key="item.id"
                    :class="[
                        item.multi_payment
                            ? 'border-[1px] border-solid border-primary shadow-inner-cover p-6 xl:p-8'
                            : 'shadow-box-2 p-6 xl:p-8 mt-8',
                        'rounded-3xl shrink-0 md:w-full snap-start w-[85%] mx-2',
                    ]"
                >
                    <legend
                        v-if="item.multi_payment"
                        class="text-xs uppercase text-primary font-medium text-center ring-1 ring-primary rounded-full px-3 py-1"
                    >
                        paiement en {{ item.multi_payment }} fois
                    </legend>

                    <div class="flex flex-col justify-between h-full">
                        <div>
                            <div class="flex flex-col items-center justify-center gap-4">
                                <img :src="getMediaUrl(item, true)" class="h-20 w-20 object-cover" :alt="item.name" />
                                <h3 :id="item.id" class="text-black text-lg font-semibold leading-8">
                                    {{ item.name }}
                                </h3>
                            </div>
                            <p class="mt-6 flex items-baseline justify-center gap-x-1 py-6">
                                <span class="text-6xl font-bold tracking-tight text-gray-900">
                                    {{ strip(item.prix, 0) }}
                                </span>
                                <span class="text-4xl font-bold leading-6 text-gray-900">€</span>
                            </p>
                            <div class="prose prose-sm my-6" v-html="item.caracteristiques"></div>
                        </div>

                        <Button
                            :href="item.href"
                            :aria-describedby="item.id"
                            full
                            :disabled="!!cart.isExist(item)"
                            :loading="cart.state.loading[item.id]"
                            :class="[
                                item.multi_payment
                                    ? 'bg-primary text-white border border-primary shadow-box hover:bg-white hover:text-primary'
                                    : 'text-primary ring-1 ring-inset ring-primary hover:bg-primary hover:text-white hover:shadow-box',
                                ' uppercase !h-auto block py-3 px-5 text-sm font-semibold leading-6 ',
                            ]"
                            @click="cart.isExist(item) ? cart.remove(item) : cart.add(item)"
                        >
                            {{ cart.isExist(item) ? 'Le produit a été Ajouté' : 'Ajouter au panier' }}
                        </Button>
                    </div>
                </fieldset>
            </div>


        </div>

        <!-- FOOTER -->
        <div class="bg-[#181530] text-white py-4 mt-12">
            <div class="container-app flex flex-col md:flex-row justify-between items-center">
                <p class="text-lg font-medium leading-7 tracking-tight text-center md:text-left">
                    Avec moniteurindependant.fr passez votre permis sans vous ruiner
                </p>
                <OrangeButton :href="linkInscription">Inscription gratuite</OrangeButton>
            </div>
        </div>
    </div>
</template>

<style scoped>
.slider-mobile::-webkit-scrollbar {
  display: none;
}
</style>
