import { copy } from '@shared/helpers';
import { useToast } from '@shared/stores';

export const copyText = (tele, name) => {
    const toast = useToast();
    copy(tele)
        .then(() => toast.notify({ type: 'success', title: name + ' est bien copie' }))
        .catch((e) => toast.notify({ type: 'error', title: e }));
};
