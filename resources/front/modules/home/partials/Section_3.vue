<template>
    <section class="bg-orange-50 relative z-0 isolate">
      <div class="max-w-[120rem] relative mx-auto py-1">
        <div class="container-app flex flex-col md:flex-row gap-8 lg:gap-12 xl:gap-20 relative mb-8">
  
          <!-- Partie Gauche -->
          <article class="md:w-1/3 max-md:px-2 mt-20 md:py-40 top-0 relative md:sticky md:h-fit">
            <h2 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-[42px] leading-snug">
              Nos clients sont notre fierté
            </h2>
            <p class="mt-4 text-lg leading-8 text-gray-600">
              Les témoignages et retours de nos clients sont très positifs comme ci-dessous
            </p>
            <Icon
              name="/home/nos-client.png"
              :is_icon="false"
              class="max-w-3xl block max-md:w-full md:absolute object-contain top-full -left-full mix-blend-multiply md:-mt-32"
            />
          </article>
  
          <!-- Partie Droite Desktop -->
          <article class="hidden md:flex gap-10 md:w-2/3 pb-20 md:py-36">
            <ul class="md:flex md:flex-col gap-4 md:gap-8 md:-rotate-6">
              <ClientItem
                v-for="(item, idx) in posts.col1"
                :key="'col1-' + idx"
                class="md:w-full"
                :item="item"
              />
            </ul>
            <ul class="md:flex md:flex-col gap-4 md:gap-8 md:-rotate-6">
              <ClientItem
                v-for="(item, idx) in posts.col2"
                :key="'col2-' + idx"
                class="md:w-full"
                :item="item"
              />
            </ul>
          </article>
  
          <!-- Partie Mobile - Swiper -->
          <article class="md:hidden w-full px-4">
            <Swiper
            :modules="[Pagination]"
    :slides-per-view="1.1"
    :space-between="16"
    :pagination="{
      clickable: true,
      el: '.custom-swiper-pagination'
    }"
    class="pb-6"
            >
            <SwiperSlide
    v-for="(item, index) in allClients"
    :key="'client-' + index"
      >
    <ClientItem :item="item" />
  </SwiperSlide>
  
            </Swiper>
            <div class="custom-swiper-pagination mt-4 flex justify-center gap-2"></div>
  
          </article>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import Icon from '@shared/components/Icon.vue';
  import ClientItem from './ClientItem.vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination } from 'swiper/modules';
  import 'swiper/css';
  import 'swiper/css/pagination';
  const posts = {
      col1: [
          {
              name: 'Mathilde Loison',
              description:
                  'Auto école au top, permis obtenu en moins d’un mois, Secrétaire disponible et attentive, moniteur patient et expliquant très bien Accepte les élèves ayant déjà louper plusieurs fois le permis et sans aucun jugement Je recommande pleinement 🙂',
              stars: 5,
              image_url: '/home/client_1.png',
          },
          {
              name: 'aatillah Assed',
              description:
                  'Après avoir raté mon permis 3 fois, je suis passé par moniteur indépendant et j’ai enfin réussi à obtenir mon permis grâce à leur professionnel et leur pédagogie. Merci pour tous, la meilleure auto école que j’ai eu 😀 vraiment un grand merci à toute l’équipe qui est reste derrière moi et qui ne m’a pas lâché. Mille merci à vous',
              stars: 5,
              image_url: '/home/client_2.png',
          },
          {
              name: 'Agam',
              description:
                  "Les meilleurs moniteurs à Creil et aux alentours. Ils sont hyper drôle mais sont surtout pédagogues et vous apprennent réellement à conduire en sécurité. J'ai eue mon permis très rapidement avec une très bonne note. En plus ils volent pas les élèves ! Rien à dire",
              stars: 5,
              image_url: '/home/client_3.png',
          },
      ],
      col2: [
          {
              name: 'Tom Milesi',
              description:
                  'Excellent Excellent moniteurs, secrétaires… au top à l’écoute détendu et qui mettent à l’aise les candidats pendant la conduite et à l’examen. Meilleure Auto-école de la région. Meilleures pourquoi? Car après avoir contacté une multiple d’auto école du secteur vous êtes la seule à m’avoir proposé une date en une semaine au lieu de minimum 4 mois d’après les autres Auto-école.',
              stars: 5,
              image_url: '/home/client_4.png',
          },
          {
              name: 'Noupoue Noupoue',
              description:
                  'A recommander à d’autres élèves. Professionnels disponibles à l’écoute. Ne refuse pas les élèves ayant déjà échoué le permis comme d’autres auto école. Motive L’élève à prendre confiance en soi',
              stars: 5,
              image_url: '/home/client_5.png',
          },
          {
              name: 'Wendy Richomme',
              description:
                  'Équipe pédagogique ! A l’écoute , Compréhensif, après avoir échoué plusieurs fois dans une auto école j’ai enfin obtenu mon permis en grande partie grâce à l’équipe , merci à mon moniteur exceptionnel ! il m’a donné beaucoup de bons conseils , il a su m’apprendre sans me brusquer ! Merci',
              stars: 5,
              image_url: '/home/client_6.png',
          },
      ],
  };
  
  const allClients = [...posts.col1, ...posts.col2];
  </script>
  <style scoped>
  /* Supprime les marges internes au slide */
  .swiper-slide {
    display: flex;
    align-items: stretch;
    min-height: 360px;
  }
  
  /* Bullets dans le conteneur externe */
  .custom-swiper-pagination .swiper-pagination-bullet {
    background-color: #d1d5db;
    opacity: 1;
    width: 10px;
    height: 10px;
    margin: 0 4px;
    border-radius: 9999px;
  }
  
  .custom-swiper-pagination .swiper-pagination-bullet-active {
    background-color: #f97316;
  }
  
  </style>