<script setup>
import { Link } from '@inertiajs/vue3';
import { BgAnimated } from '@moniteur/components';
import { RegisterEleveform, RegisterElevePart2form } from './partials';
import { useHead } from '@vueuse/head';

useHead({
  title: 'Inscription',
  meta: [
    {
      name: 'title',
      content: 'Inscription'
    }
  ]
})
</script>
<template>
    <main class="relative">
        <!-- <main class="h-full relative"> -->
        <div class="flex min-h-full flex-1 relative z-1 mix-blend-multiply  mb-32">
            <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24 isolate">
                <div class="w-full max-w-md mx-auto">
                    <div class="mix-blend-overlay block text-black">
                        <h2 class="text-4xl font-bold l eading-9 tracking-tight">

                            S'inscrire a Votre Espace
</h2>
                        <!-- <h2 class="text-4xl font-bold l eading-9 tracking-tight">S'inscrire a votre espace</h2> -->
                        <p class="mt-2 text-sm leading-6 text-gray-500 flex justify-between">
    <span>Tu es déjà membre?
        <Link href="/login" class="font-semibold text-orange-500 hover:text-primary">
            Se connecter
        </Link>
    </span>
    <span>Etape 1/3</span>
</p>

                    </div>

                    <RegisterEleveform />
                </div>
            </div>

        </div>
        <!-- </main> -->
    </main>
</template>
