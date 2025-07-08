import { computed } from 'vue';

export const useStatusSwitch = (data, id) => {
    const matchedStatus = Object.values(data).find((status) => status.id == id);
    console.log("useStatusSwitch - ID:", id, "Result:", matchedStatus);

    return matchedStatus ? matchedStatus?.name : null;
};

export const statusEnumToArray = (status) => {
    return Object.values(status).map((status) => ({
        value: status.id,
        name: status.name,
    }));
};
export const getStatusObjectById = computed(() => {
    return (data, id) => {
        return Object.values(data).find((obj) => obj.id === parseInt(id));
    };
});
