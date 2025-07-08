<template>
    <!--   <Card/>-->
    <Button @click="click">Pay Paypal</Button>
</template>

<script setup>
// import Card from './components/Card.vue';
import { Button } from '@shared/components';
// import { router } from '@inertiajs/vue3';
import { routes } from '@front/routes';
const linkProcess=ref("api/paypal/transaction/process");
const click = () => {
    // router.post(route(routes.api.eleve.paypal.process),{
    //         amount: 240,
    //         solde: 200,
    // })
    axios
        .get(linkProcess, {
            params: {
                amount: 240,
                solde: 200,
            },
        })
        .then((response) => {
            if (typeof window !== "undefined" && window.location) {
                window.location.href = response.data.approval_link;
            } else {
        console.warn("⚠️ Redirection ignorée : window.location n'est pas disponible en SSR.");
                }
        })
        .catch((error) => {
            console.error(error);
        });
    // axios.get("https://www.sandbox.paypal.com/checkoutnow", {
    //     amount: 20,
    //     solde: 200,
    // })
};
</script>
