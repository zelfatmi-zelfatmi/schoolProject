
<template>
    <article class="text-black py-10 md:py-32 flex-1">
        <h1
            class="text-3xl font-bold leading-relaxed tracking-tight md:text-[56px]"
        >
        Devenir moniteur
        </h1>
        <p class="text-2xl font-medium md:max-w-sm mb-10">Vous désirez nous rejoindre et devenir moniteur? Voici quelques démarches</p>
        <ul class="space-y-7">
            <li v-for="item in steps" :key="item.id" class="flex gap-5 relative" >
                <span class="flex justify-center items-center w-10 h-10 rounded-full bg-orange-100 relative z-1">
                    {{ item.id }}
                </span>
                <span v-if="item.id !== 3" class="absolute left-5 top-5 -bottom-8 border-r border-black border-dashed z-0  "></span>
                <div>
                    <h3 class="text-black text-lg font-medium mb-5">{{ item.title }}</h3>
                    <p class="text-gray-444 font-light max-w-md text-sm">{{ item.content }}
                        <span v-if="item.actions" class="text-primary cursor-pointer hover:underline">{{ item.actions }}</span>
                    </p>
                </div>
            </li>
        </ul>
    </article>
</template>

<script setup>
const steps = [
    {
        id: 1,
        title: 'Recrutement',
        content: 'Afin de démarrer le partenariat, il est important que la demande des élèves soit suffisamment importante dans la zone d’activité visée afin de permettre de booster au maximum le planning de nos partenaires.',
    },
    {
        id: 2,
        title: 'Point sur les documents requis',
        content: 'Si votre profil correspond à notre besoin, nous rentrerons en contact avec vous afin de faire le point sur les documents requis pour rejoindre notre groupe de partenaires.',
        actions: 'Voir les documents',

    },
    {
        id: 3,
        title: 'Accompagnement',
        content: 'Un interlocuteur est ainsi à même de vous suivre dans chacune de vos démarches, vous permettant de démarrer votre partenariat dans les meilleures conditions.',
    }
];
</script>
