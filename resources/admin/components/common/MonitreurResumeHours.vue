<script setup>
import { ref, watch ,computed} from "vue";
import { Button, Modal, Table, TabSwitch } from "@shared/components";
import { useQuery } from "@shared/hooks";
import { dateFormat, getMediaUrl } from "@shared/helpers";
import { routes } from "@admin/routes";
import { ItemAvatar } from "@common/components";
import { SimplePaginate }  from '@admin/components/common';

defineEmits(["close"]);

const props = defineProps({
    item: [Object, null], // ✅ Vérifier que `item` est bien passé en props
    href: String,
});

const resumeHours = useQuery();
const localItem = ref(null);
const modalVisible = ref(false); // ✅ Variable pour afficher/cacher la modal
const selectedTab = ref("is_facturable");
const totalPages = computed(() => {
  if (resumeHours.meta && resumeHours.meta.total && resumeHours.meta.per_page) {
    return Math.ceil(resumeHours.meta.total / resumeHours.meta.per_page);
  }
  return 1;
});
const headings = [
    { name: "Heures" },
    { name: "Date" },
    { name: "Élève" },
    { name: "Produit" },
    { name: "Lieu" },
];

const tabs = [
    { name: "Facturable", id: "is_facturable" },
    { name: "Non Facturable", id: "is_not_facturable" },
    { name: "Historique", id: "all" },
];


console.log("resumeHours", resumeHours.data?.count);


// ✅ Fonction de chargement des données avec pagination
const handleChangeInvoices = (tab, page = 1) => {
    if (!localItem.value?.moniteur) {
        console.warn("❌ Aucun moniteur disponible pour charger les heures.");
        return;
    }

    console.log("📌 Changement d'onglet :", tab, "Page :", page);

    const payload = { page };
    if (tab === "is_facturable") payload.is_facturable = true;
    if (tab === "is_not_facturable") payload.is_not_facturable = true;

    if (localItem.value?.period) {
        payload.period = localItem.value.period;
    }

    resumeHours.fetch(
        props.href || route(routes.api.moniteurs.factures.resumeHours, { moniteur: localItem.value.moniteur }),
        payload
    );
};
// ✅ Mettre à jour `localItem` et afficher la modal quand `props.item` change
watch(
    () => props.item,
    (newItem) => {
        if (newItem) {
            console.log("🔄 Mise à jour de localItem :", newItem);
            localItem.value = { ...newItem }; // Stockage local
            selectedTab.value = "is_facturable";
            modalVisible.value = true; // ✅ Afficher la modal
            handleChangeInvoices("is_facturable");
        }
    },
    { immediate: true }
);
// ✅ Gestion de la pagination (éviter la fermeture du modal)
const changePage = (page, event) => {
    console.log("clicked next page") 
      event?.preventDefault(); // ✅ Empêche l'événement de fermer le modal
    console.log("📌 Changement de page :", page);
    handleChangeInvoices(selectedTab.value, page);
};
const onPageClick = (page, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    handleChangeInvoices(selectedTab.value, page);
  };
</script>

<template>
    <div class="contents">
        <Modal
            :show="modalVisible"  
            class-name="!p-0"
            custom-class="modal-mobile h-[calc(90%-3.5rem)] md:h-fit max-h-screen md:max-h-[calc(100vh-2rem)]"
            max-width="md"
            title="Résumé des heures"
            subtitle="Vérifier les détails de la session et de l'activité"
            :persistent="true" 
            @close="modalVisible = false"
        >
            <TabSwitch
                v-model="selectedTab"
                :items="tabs"
                class="p-2 text-nowrap sticky top-0 z-40 bg-white shadow-box-2 !rounded-none"
                full
                size="md"
                @change="handleChangeInvoices"
            />

            <div class="flex-1">
                <Table
                    v-slot="{ item: resume }"
                    :headings="headings"
                    :items="resumeHours"
                    :paginate="false"
                    :is-loading="resumeHours.fetching"
                    class="w-full text-sm"

                >
                    <td class="cell">
                        <span class="block">{{ resume.start_at }}</span>
                        <span class="">{{ resume.end_at }}</span>
                    </td>
                    <td class="cell">
                        {{ dateFormat(resume.date, "letter") }}
                    </td>
                    <td class="cell">
                        <ItemAvatar
                            :phone="resume.session?.eleve?.user?.telephone"
                            :src="getMediaUrl(resume.session?.eleve?.user || {})"
                            :title="resume.session?.eleve?.user?.name"
                            size="w-8"
                        />
                    </td>
                    <td class="cell">
                        {{ resume.session?.product?.name }}
                    </td>
                    <td class="cell max-w-lg w-full whitespace-normal">
                        {{ resume.lieu?.name }}, {{ resume.lieu?.zone?.name }}
                    </td>

 
                </Table>
    
                <div class="flex justify-center my-4">
    <SimplePaginate 
      :currentPage="resumeHours.meta.current_page" 
      :totalPages="totalPages" 
      @changePage="onPageClick"
    />
  </div>
            </div>
        </Modal>
    </div>
</template>
