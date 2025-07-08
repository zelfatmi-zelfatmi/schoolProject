<script setup>
import { StarIcon, AdjustmentsVerticalIcon } from '@heroicons/vue/20/solid';
import { ref } from 'vue';
import { Badge } from '@shared/components';
import SoldManipulationDrawer from './modals/SoldManipulationDrawer.vue';
import { Box, TextField } from '@shared/components';

const props = defineProps({
    user: {
        type: Object,
        default: () => ({}),
    },
    solde: Object,
});

const currentRating = ref(0);
const currentSold = ref(props.user.eleve?.solde);
console.log("solde et user",props.user.id,props.user.eleve?.solde);
const selectedSold = ref(false);
const rate = (rating) => {
    currentRating.value = rating === currentRating.value ? 0 : rating;
};
const setNewSold = (sold) => {
    currentSold.value = sold;
};
</script>

<template>
    <Box class="grid grid-cols-3 p-4">
        <Box class="col-span-2 py-3 border-r pr-5" title="Détails de l'élève">
  <div class="grid md:grid-cols-2 gap-2">
    <TextField
      id="frequence"
      :model-value="user.eleve?.frequence"
      disabled
      label="Frequence"
      type="number"
    />
    <TextField
      id="NEPH"
      :model-value="user.eleve?.neph"
      disabled
      readonly
      label="NEPH"
      :length="12"
    />

    <TextField
      id="soldeDispo"
      :model-value="solde?.dispo"
      disabled
      label="Solde Dispo"
      type="number"
      class="w-full"
      :suffix="AdjustmentsVerticalIcon"
      suffix-event
      @click:suffix="selectedSold = true"
    />
    <TextField
      id="soldeUsed"
      :model-value="solde?.used"
      disabled
      label="Solde Utilisé"
      type="number"
      class="w-full"
    />
  </div>
</Box>

        <Box class="flex flex-col p-3 pl-5 justify-between" title="Localisation & évaluation">
            <div class="flex flex-wrap gap-2">
                <Badge v-if="user.ville" success>{{ user.ville }}</Badge>
                <Badge v-if="user.postal" success>{{ user.postal }}</Badge>
            </div>
            <hr />
            <div class="flex">
                <div class="flex gap-2">
                    <div v-for="star in 5" :key="star" class="flex">
                        <span
                            :key="star"
                            :class="{
                                'text-yellow-500': star <= currentRating,
                                'text-gray-500': star > currentRating,
                            }"
                            class="cursor-pointer focus:outline-none focus:text-yellow-500 transition duration-300 transform hover:scale-125"
                            @click="rate(star)"
                        >
                            <StarIcon class="w-5" />
                        </span>
                    </div>
                </div>
            </div>
        </Box>

        <SoldManipulationDrawer
            :show="selectedSold"
            :user="user"
            @close="selectedSold = false"
            @new-sold="setNewSold"
        />
    </Box>
    <!-- <SoldManipulationModal v-if="selectedSold" :data="user" @close="selectedSold = false" @new-sold="setNewSold" /> -->
</template>
