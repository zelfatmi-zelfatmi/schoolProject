<template>
    <Box title="Couleurs" sectionned padding>
        <ColorField v-model="form.color" label="Text couleur" />
        <ColorField v-model="form.background_color" label="L'arrier plein couleur" />
    </Box>
    <Box title="Font" sectionned padding>
        <Listbox
            v-model="form.font_family"
            placeholder="Arial"
            label="Font family"
            :items="safeWebFonts"
            :error="form.errors.font_family"
        />

        <!-- <TextField
            v-model="form.font_size"
            placeholder="16"
            type="number"
            label="Text Taille"
            :error="form.errors.font_size"
        /> -->
    </Box>
    <Box title="Style de Formulaire" sectionned padding>
        <div class="flex gap-5 items-center">
            <TextField v-model="form.styles.firstname.size" placeholder="16" type="number" label="Taille de Nom" />
            <ColorField v-model="form.styles.firstname.color" label="Couleur" class="mt-6" />
        </div>

        <div class="flex gap-5 items-center">
            <TextField v-model="form.styles.lastname.size" placeholder="12" type="number" label="Taille de Prénom" />
            <ColorField v-model="form.styles.lastname.color" label="Couleur" class="mt-6" />
        </div>

        <div class="flex gap-5 items-center">
            <TextField v-model="form.styles.email.size" placeholder="12" type="number" label="Email Taille" />
            <ColorField v-model="form.styles.email.color" label="Couleur" class="mt-6" />
        </div>

        <div class="flex gap-5 items-center">
            <TextField v-model="form.styles.phone.size" placeholder="12" type="number" label="Taille de Télephone" />
            <ColorField v-model="form.styles.phone.color" label="Couleur" class="mt-6" />
        </div>
    </Box>
</template>
<script setup>
import { computed, ref, toRef } from 'vue';
import { Box, Button, ColorField, Listbox, TextField } from '@shared/components';
import { safeWebFonts } from '../../PopupsConst';

const props = defineProps({
    values: {
        type: Object,
        default: () => ({}),
    },
});

const form = toRef(props, 'values');
</script>
