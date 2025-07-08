<template>
    <div class="contents">
        <Drawer :show="sidebarOpen" position="left" z-index="z-[999]" @close="sidebarOpen = false">
            <Sidebar class="flex grow flex-col gap-y-5 overflow-y-auto bg-white" />
        </Drawer>
        <DrawerAdmin />
        <Frame :header="Header" :sidebar="Sidebar" @sidebar:change="sidebarOpen = $event">
            <ImpersonateBanner />
            <slot />
        </Frame>
        <Toast />
    </div>
</template>

<script setup>
import { watch, ref } from 'vue';
import { useToast } from '@shared/stores';
import { useParams } from '@shared/hooks';
import { Toast, Frame, Drawer } from '@shared/components';
import { DrawerAdmin, Sidebar, Header } from '@admin/components';
import { ImpersonateBanner } from '@common/components';
import { errorsMessages } from '@admin/constants';

const props = defineProps({
    auth: Object,
    flash: Object,
    adminUser: Object,
});

const toast = useToast();
const sidebarOpen = ref(false);
const params = useParams();
watch(props, ({ flash }) => {
    if (flash.success || flash.error) {
        const { created, updated } = params.getUrlParams();
        toast.showBanner.created = !!created;
        toast.showBanner.updated = !!updated;
        toast.showBanner.key = performance.now();
        let msg = flash.success || flash.error;
        if (msg?.startsWith('E0')) {
            msg = errorsMessages[msg];
        }
        toast.notify({
            title: msg,
            type: flash.success ? 'success' : 'error',
        });
    }
});
</script>
