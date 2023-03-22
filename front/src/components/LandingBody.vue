<script lang="ts" setup>
import LandingGallery from "../components/LandingGallery.vue";

import LandingTitle from "../components/LandingTitle.vue";

</script>
<template>
    <div class="md:flex md:items-center md:justify-between md:gap-x-20">
    <LandingTitle class="py-20 md:py-0"/>
    <div
        class="md:h-[600px] md:overflow-y-auto flex items-center max-w-xl py-20 md:py-0">
        <LandingGallery id="landing-gallery"
            class="block" />
    </div>
    </div>
</template>