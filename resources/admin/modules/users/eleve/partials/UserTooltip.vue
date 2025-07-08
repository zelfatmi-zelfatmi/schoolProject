<template>
    <Popover :delay="200" class="popper-native">
        <slot />
        <template #content>
            <div class="flex flex-col gap-5 justify-between rounded-xl w-72">
                <h2 class="font-semibold text-lg text-left px-2 border-b border-gray-444/50 pb-2">Eleve details</h2>
                <dl class="flex flex-col gap-3">
                    <dd class="flex justify-between gap-2 text-white px-2">
                        <span class="text-sm text-gray-300">Nom et prenom :</span>
                        <span class="font-semibold">{{ user?.name }}</span>
                    </dd>
                    <dd class="flex justify-between gap-2 px-2">
                        <span class="text-sm text-gray-300">N° tele :</span>
                        <span class="font-semibold">{{ user?.telephone ?? '_' }}</span>
                    </dd>
                    <dd class="flex justify-between gap-2 px-2">
                        <span class="text-sm text-gray-300">Email :</span>
                        <span class="font-semibold">{{ user?.email ?? '_' }}</span>
                    </dd>
                    <dd class="flex justify-between gap-2 px-2">
                        <span class="text-sm text-gray-300">Solde :</span>
                        <span class="font-semibold">{{ user?.eleve.solde ?? '_' }}</span>
                    </dd>
                    <dd class="flex justify-between gap-2 px-2">
                        <span class="text-sm text-gray-300">Neph code :</span>
                        <span class="font-semibold">{{ user?.eleve.neph ?? '_' }}</span>
                    </dd>
                </dl>
            </div>
        </template>
    </Popover>
</template>

<script setup>
import { Popover } from '@shared/components';

defineProps({
    user: Object,
});
</script>
