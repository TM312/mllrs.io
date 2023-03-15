<script lang="ts" setup>
import { ref } from "vue";

const video = ref(null);

function playVideo() {
    if (!!video.value) {
        video.value.play();
    }
}

function pauseVideo() {
    if (!!video.value) {
        video.value.pause();
    }
}

</script>

<template>
    <video ref="video" muted loop @mouseenter="playVideo" 
        @mouseleave="pauseVideo" src="../assets/project-assets/pantari.mp4" type="video/mp4">
    </video>
</template>