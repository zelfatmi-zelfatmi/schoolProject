import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const useTable = defineStore('shared/indexTable', () => {
    const state = reactive({
        bulkActions: [],
        promotedBulkActions: [],
        selectedItem: null,
    });

    return state;
});
