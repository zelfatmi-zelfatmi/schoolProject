<template>
    <StripeElements v-slot="{ elements, instance }" ref="elms" :stripe-key="stripeKey">
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
                Card number
                <StripeElement
                    type="cardNumber"
                    ref="card"
                    :elements="elements"
                    class="p-2 border rounded"
                />
            </label>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
                Expiration date
                <StripeElement
                    type="cardExpiry"
                    ref="card"
                    :elements="elements"
                    class="p-2 border rounded"
                />
            </label>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
                CVC
                <StripeElement
                    type="cardCvc"
                    ref="card"
                    :elements="elements"
                    class="p-2 border rounded"
                />
            </label>
        </div>
    </StripeElements>
    <button type="button" @click="pay">Pay</button>
</template>

<script setup>
import {StripeElement, StripeElements} from 'vue-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import {onBeforeMount, ref} from 'vue'

const stripeKey = ref('pk_test_51La9ZrGAcbo4EI2kFXKVxyWslylb00Pb27zKtLrXafcb3c1F8UBLXyCYnzM6eVzOR1fSMuXRfDhnS2sx8wbkqnFQ00eivuVEs2') // test key

const stripeLoaded = ref(false)
const card = ref()
const elms = ref()

onBeforeMount(() => {
    const stripePromise = loadStripe(stripeKey.value)
    stripePromise.then(() => {
        stripeLoaded.value = true
    })
})
const pay = () => {
    // Get stripe element
    const cardElement = card.value.stripeElement
    // Access instance methods, e.g. createToken()
    elms.value.instance.createToken(cardElement).then((result) => {
        // Handle result.error or result.token
        axios.post("api/payment/complete", {
            token: result.token.id,
            amount: 20,
            solde: 200,
        })
    })
}


</script>
