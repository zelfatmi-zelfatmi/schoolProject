
<template>
    <li class="bg-white rounded-[30px] p-4 md:p-9">
        <div class="flex items-center gap-4">
            <Icon :name="item.image_url" :is_icon="false" class="w-16" />
            <div class="mb-2">
                <h3 class="font-semibold text-xl ">{{ item.name }}</h3>
                <div class="flex gap-1.5 mt-2 "> 
                    <Icon v-for="idx in item.stars" :key="idx" name="star"  class="w-fit" />
                </div>
            </div>
        </div>
        <p class="text-sm mt-5 text-[#444]">
            {{item.description}}
        </p>
    </li>
</template>

<script setup>
import Icon from "@shared/components/Icon.vue";
defineProps({
    item: {
        type: Object,
        default: ()=> ({})
    }
})

</script>
