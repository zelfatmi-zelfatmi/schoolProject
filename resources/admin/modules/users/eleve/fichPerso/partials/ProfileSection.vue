<script setup>
import { onMounted } from 'vue';
import { UserInfoWithCopy } from '@common/components';
import { Thumb, Box } from '@shared/components';
import { Gradient } from '@shared/helpers';
import { useStatusSwitch } from '@shared/hooks';
import { EleveBoiteEnum } from '@shared/constants';
import { StatusBadge } from '@shared/components';

var props=defineProps({
    user: {
        type: Object,
        default: () => ({}),
    },
});
console.log("user is ",props.user)
console.log("user fiche perso",props.user.eleve.realise_hour); // doit afficher un nombre comme 5.5

onMounted(() => {
    let gradient = new Gradient({ height: 500 });
    gradient?.initGradient?.('#gradient-canvas');
});
</script>

<template>
    <Box class="bg-white rounded-xl !p-0 !mb-0" as="section">
        <article class="relative rounded-t-xl overflow-hidden h-28 bg-primary" :style="{ '--ah': 2 }">
            <canvas id="gradient-canvas"></canvas>
        </article>
        <article class="relative -mt-14 mb-10">
            <div class="flex-center flex-col mx-auto max-w-2xl text-center lg:max-w-4xl justify-center">
                <Thumb :src="user?.profile_photo_url" size="xl" class="!rounded-full" />
                <h2 class="font-bold tracking-tight text-gray-900 sm:text-xl mt-3">{{ user.name }}</h2>
                <UserInfoWithCopy :email="user?.email" :phone="user?.telephone" is-icons class="pb-3 !text-3xs ml-6" />
                <StatusBadge
    class="w-fit mt-2"
    :id="user?.eleve?.boite_type"
    :attr="EleveBoiteEnum"
    :name="useStatusSwitch(EleveBoiteEnum, user?.eleve?.boite_type)"
  >
    {{ useStatusSwitch(EleveBoiteEnum, user?.eleve?.boite_type) }}
  </StatusBadge>
<!-- ✅ Progression compacte et centrée -->
<div v-if="user.eleve?.latest_estimation?.valeur" class="mt-4 flex flex-col items-center">
  <div class="text-sm text-gray-700 font-medium">
    Progression :
    <span
      :class="[
        (user.eleve.realise_hour / user.eleve.latest_estimation.valeur) < 0.5
          ? 'text-red-500'
          : (user.eleve.realise_hour / user.eleve.latest_estimation.valeur) < 0.75
          ? 'text-yellow-500'
          : 'text-green-600'
      ]"
    >
      {{ Math.round(user.eleve.realise_hour || 0) }}h /
      {{ user.eleve.latest_estimation.valeur }}h
      ({{ ((user.eleve.realise_hour || 0) / user.eleve.latest_estimation.valeur * 100).toFixed(0) }}%)
    </span>
  </div>

  <!-- 💡 Plus large, plus épais, plus stylé -->
  <div class="mt-2 w-52 h-3 rounded-full bg-gray-200 overflow-hidden shadow-sm">
    <div
      class="h-full transition-all duration-300 rounded-full"
      :class="[
        (user.eleve.realise_hour / user.eleve.latest_estimation.valeur) < 0.5
          ? 'bg-red-500'
          : (user.eleve.realise_hour / user.eleve.latest_estimation.valeur) < 0.75
          ? 'bg-yellow-400'
          : 'bg-green-500'
      ]"
      :style="{ width: ((user.eleve.realise_hour || 0) / user.eleve.latest_estimation.valeur * 100) + '%' }"
    ></div>
  </div>
</div>
  </div>
        </article>
    </Box>
</template>
