<script setup>
import { Link } from '@inertiajs/vue3';
import { routes } from '@admin/routes';
import { dateFormat } from '@shared/helpers';
import {
    Table,Page,Box
} from '@shared/components';
defineProps({
    cpfs: {
        type: Object,
        default: () => ({}),
    },
});
const headings = [
  { name: 'Moniteur' },
  { name: 'Elève' },
  { name: 'Produit' },
  { name: 'Présence' },
  { name: 'Date de session' },
  { name: 'Heure' },
  { name: 'Signée le' },
  { name: 'Signature' },
];
</script>

<template>
     <Page :actions="actions" title="Historique CPFs" width="xl">
     <Box sectionned>
  <Table v-slot="{ item }" :headings="headings" :items="cpfs" :is-loading="false">
    <td class="cell">{{ item.planning?.moniteur?.user?.name }}</td>

    <td class="cell">
      <Link :href="route(routes.users.eleve.general, item.eleve_id)" class="btn btn-link btn-info">
        {{ item.eleve?.user?.name }}
      </Link>
    </td>

    <td class="cell">
      <Link :href="route(routes.shop.products.edit, item.product_id)" class="btn btn-link btn-dark">
        {{ item.product?.name }}
      </Link>
    </td>

    <td class="cell">
      <span>{{ item.eleve_present ? 'Oui' : 'Non' }}</span>
    </td>

    <td class="cell">
      <span>{{ dateFormat(item.planning?.date, 'letter') }}</span>
    </td>

    <td class="cell">
      <span>{{ item.planning?.start_at }} - {{ item.planning?.end_at }}</span>
    </td>

    <td class="cell">
      <span>{{ dateFormat(item.cpf_signed_at, 'letter') }}</span>
    </td>

    <td class="cell text-center align-middle" style="padding: 0;">
  <table style="width: 100%; height: 100%;">
    <tr>
      <td style="text-align: center; vertical-align: middle; height: 80px;">
        <img
  v-if="item.cpf_signature_path"
  :src="`/storage/${item.cpf_signature_path}`"
  alt="signature"
  style="max-height: 50px; max-width: 120px; object-fit: contain; border: 1px solid #e5e7eb; border-radius: 4px; padding: 4px; background-color: white;"
/>

      </td>
    </tr>
  </table>
</td>




  </Table>
</Box>
</Page>

</template>