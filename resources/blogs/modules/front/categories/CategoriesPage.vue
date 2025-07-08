<template>
    <BlogPageLayout>
        <div class="bg-white pt-10 pb-24 sm:pb-32 container-app">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <div
                    class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                >
                    <CategoryCard v-for="category in categories.data" :key="category.id" :category="category" />
                </div>
            </div>
            <div v-if="categories?.total" class="py-4 px-2 flex-1 flex justify-center mt-10">
                <Paginate :links="categories?.links || []" />
            </div>
        </div>
    </BlogPageLayout>
</template>

<script setup>
import { CategoryCard } from '@blogs/components';
import { BlogPageLayout } from '@blogs/layouts';
import { Paginate } from '@shared/components';
defineProps({
    categories: Object,
});
</script>
