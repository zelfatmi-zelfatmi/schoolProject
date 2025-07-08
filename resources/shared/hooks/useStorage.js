import { STORAGE_TYPE } from '@constants';
import { ref, readonly } from 'vue';

// ✅ Vérifie si `window` est défini avant d'utiliser `sessionStorage` ou `localStorage`
const isClient = typeof window !== "undefined";

const getItem = (key, storage) => {
    if (!isClient || !storage) return null;
    let value = storage.getItem(key);
    if (!value) return null;

    try {
        return JSON.parse(value);
    } catch (error) {
        return value;
    }
};

export const useStorage = (key = '', defaultValue = null, type = STORAGE_TYPE.local) => {
    let storage = null;

    if (isClient) { // ✅ Vérification pour éviter les erreurs en SSR
        switch (type) {
            case STORAGE_TYPE.session:
                storage = sessionStorage;
                break;
            case STORAGE_TYPE.local:
                storage = localStorage;
                break;
            default:
                return [readonly(ref(defaultValue)), () => { }, () => { }, () => defaultValue]; // Retourne des valeurs par défaut en SSR
        }
    }

    // ✅ Utilisation d'une valeur par défaut si on est en SSR
    const storageValue = ref(isClient ? getItem(key, storage) || defaultValue : defaultValue);

    const setValue = (storage) => {
        return (newValue) => {
            storageValue.value = newValue;
            if (isClient && storage) {
                storage.setItem(key, JSON.stringify(newValue));
            }
        };
    };

    const getStorageValue = () => (isClient && storage ? getItem(key, storage) : defaultValue);
    const setCustomValue = (key, newValue) => {
        if (isClient && storage) {
            storage.setItem(key, JSON.stringify(newValue));
        }
    };

    return [
        readonly(storageValue),
        isClient && storage ? setValue(storage) : () => { }, // Empêche l'erreur en SSR
        setCustomValue,
        getStorageValue
    ];
};
