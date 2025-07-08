import { useToast } from '@shared/stores';
import axios from 'axios';
import { ref } from 'vue';

export const fileTypes = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'zip', 'rar'];
export const MEDIA_TYPES = {
    all: ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'],
    docs: ['application/pdf'],
    images: ['image/png', 'image/jpeg', 'image/jpg'],
    videos: ['video/mp4', 'video/webm', 'video/ogg'],
    audios: ['audio/mpeg', 'audio/ogg', 'audio/wav'],
};
export const api = {
    medias: 'api.media.show.all',
    mediaShow: 'api.media.show',
    mediaStore: 'api.media.store',
    mediaStoreMany: 'api.media.store.many',
    mediaDestroy: 'api.media.destroy',
    mediaDestroyMany: 'api.media.destroy.many',
    mediaDestroyMedia: 'api.media.destroy.media',
};

export function useMedias() {
    const toast = useToast();
    const deletingModel = ref(false);
    const deleteMedia = () => { };

    const deleteMediaModel = (id, callback) => {
        deletingModel.value = true;
        axios
            .delete(route(api.mediaDestroyMedia, id))
            .then((res) => {
                callback(res);
                // toast.notify({ type: 'success', title: 'Media supprime avec succes' });
            })
            .catch((err) => {
                console.warn('err', err);
                toast.notify({ type: 'error', title: 'Une erreur est survenue' });
            })
            .finally(() => {
                deletingModel.value = false;
            });
    };
    const upload = (files, { multiple, onSuccess = () => { }, onFinish = () => { }, onError = () => { } } = {}) => {
        const formData = new FormData();
        if (!multiple) {
            formData.append('media', files[0]);
        } else {
            for (const file of files) {
                formData.append('media', file);
            }
        }
        axios
            .post(route(multiple ? api.mediaStoreMany : api.mediaStore), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(({ data }) => {
                if (data?.storageMedia || data?.message) {
                    onSuccess(data);
                }
            })
            .catch((err) => {
                console.error("Erreur upload :", err.response?.data);

                console.warn('err', err);
                toast.notify({ type: 'error', title: 'Une erreur est survenue' });
                onError(err);
            })
            .finally(onFinish);
    };
    return {
        api,
        deletingModel,
        deleteMedia,
        deleteMediaModel,
        upload,
    };
}
