<template>
    <div class="bg-white">
        <template v-if="showContent">
            <Header  />

            <slot />
            <Footer />
        </template>
        <!-- <Teleport to="body"> -->
        <Modal
            :show="popup.show"
            :custom-class="
                ['flex-center ', popup.data?.type === 'full' ? 'w-screen h-sceen ' : 'p-4 relative mx-auto'].join(' ')
            "
            :class-name="popup.data?.type === 'full' ? '!p-0' : ''"
            :backdrop="popup.data?.type === 'center'"
            @close="popup.show = false"
        >
            <!-- :click="false" -->
            <PopupNotification
                v-if="popup.data"
                :data="popup.data"
                :class="popup.data?.type === 'full' ? 'w-screen h-[100vh] !max-h-[100vh] !rounded-none' : ''"
                @close="popup.show = false"
            />
        </Modal>
        <Toast />

        <!-- </Teleport> -->
    </div>
</template>

<script setup>

import Footer from './Footer.vue';
import { computed, onMounted, reactive, watch, onUnmounted,defineComponent,h,ref } from 'vue';
import { routes } from '@blogs/routes';
import axios from 'axios';
import { Modal, Toast } from '@shared/components';
import { PopupNotification } from '@blogs/components';
import { useToast } from '@shared/stores';
import Header from './Header.vue';
import { useHead } from '@vueuse/head'

const isProd = import.meta.env.PROD

 useHead({
    title: 'Accueil - Moniteur indépendant',
   meta: [
    {
      name: 'robots',
      content: isProd ? 'index, follow' : 'noindex, nofollow'
     }
  ]
 })

const props = defineProps({
    auth: Object,
    flash: Object,
});
const toast = useToast();
const popup = reactive({
    show: false,
    data: null,
    triggered: false,
});
const showContent = computed(() => {
    if (popup.show && popup.data) {
        return popup.data?.type !== 'full';
    }
    return true;
});

watch(props, ({ flash }) => {
    if (flash.success || flash.error) {
        toast.notify({
            title: flash.error || flash.success,
            type: flash.error ? 'error' : 'success',
        });
    }
});
const handlePopupTrigger = (data) => {
    switch (data.trigger) {
        case 'after_time':
            setTimeout(() => {
                popup.show = true;
            }, data.trigger_value * 1000);
            break;
        case 'scroll':
            document.addEventListener('scroll', () => {
                if (window.pageYOffset > data.trigger_value && !popup.triggered) {
                    popup.show = true;
                    popup.triggered = true;
                }
            });
            break;
        default:
            popup.show = true;
            break;
    }
};
const popupLink="api/blog/popups/show/by-url"
const fetchPopup = () => {
    const params = {
        url: typeof window !== "undefined" ? window.location.href : "http://localhost:8000", // Valeur par défaut en SSR
    };

    axios.get(popupLink, { params })
        .then((res) => {
            if (res?.status === 200) {
                popup.data = res.data;
                handlePopupTrigger(res.data);
            }
        })
        .catch((err) => {
            console.error("Erreur lors de la récupération du popup :", err);
        });
};


onMounted(() => {
    fetchPopup();
    window.document.addEventListener('inertia:navigate', () => {
        popup.triggered = false;
        fetchPopup();
    });
});
onUnmounted(() => {
    window.document.removeEventListener('inertia:navigate', () => {
        popup.triggered = false;
        fetchPopup();
    });
});
</script>
