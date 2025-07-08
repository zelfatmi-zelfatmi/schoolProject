<script setup>
import { Button, Checkbox, Modal, TextField } from '@shared/components';
import { routes } from '@front/routes';
import { useCart } from '@shared/stores';
import { useMutation } from '@shared/hooks';
import { Link } from '@inertiajs/vue3';
const cart = useCart();
const form = useMutation(
    {
        email: '',
        password: '',
        remember: false,
    },
    { grouped: true, notify: true }
);
const handleSubmit = () => {
    form.transform((data) => ({
        ...data,
        remember: data.remember ? 'on' : '',
    }));
    form.mutate(route(routes.api.auth.login)).then(() => {
        cart.syncCart();
    });
};
</script>

<template>
    <Modal title="Se Connecter" :show="cart.state.authModal" max-width="md" @close="cart.state.authModal = false">
        <div class="relative lg:grid lg:grid-cols-2 bg-white h-full">
            <div class="flex flex-col w-full items-center justify-center h-full lg:ml-10">
                <form class="py-5 flex flex-col gap-3 w-full items-start" @submit.prevent="handleSubmit">
                    <TextField
                        v-model="form.email"
                        class="w-full h-9"
                        label="Email"
                        type="email"
                        autocomplete
                        :error="form.errors.email"
                    />
                    <TextField
                        v-model="form.password"
                        class="w-full h-9"
                        label="Password"
                        type="password"
                        :error="form.errors.password"
                    />
                    <div class="block mt-4 justify-start self-start">
                        <Checkbox v-model:checked="form.remember" label="Rappelez-vous de moi" name="remember" />
                    </div>
                    <div class="flex gap-2 w-full items-center justify-center mt-5">
                        <Button secondary full :disabled="form.mutating" @click="cart.state.authModal = false">
                            Fermer
                        </Button>
                        <Button submit primary full :loading="form.mutating" :disabled="!form.isDirty">
                            Se connecter
                        </Button>
                    </div>
                    <Link
                        :href="route(routes.register.eleve.create)"
                        class="btn btn-link btn-info mt-4"
                        @click="cart.state.authModal = false"
                    >
                        Vous n'avez pas de compte ? Inscrivez-vous
                    </Link>
                </form>
            </div>
            <section class="self-center justify-end w-full hidden lg:flex">
                <img :src="`/assets/icons/auth/manCar.svg`" alt="auth image" class="w-10/12" />
            </section>
        </div>
    </Modal>
</template>
