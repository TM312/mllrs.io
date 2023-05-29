
<template>
  <div>
    <transition name="fade" appear>
      <div>
        <h1
          class="inline-block max-w-lg align-top mt-2 bg-gradient-to-br from-white to-gray-600 bg-clip-text text-transparent text-2xl leading-[28px] sm:text-4xl sm:leading-[48px] text-gray-400 font-bold">
          Hi, I'm Thomas,<br /> I build digital products for
          the web</h1>
        <p
          class="mt-4 mb-8 text-base font-normal text-gray-400">
          <span class="inline-block max-w-[591px] align-top">I
            enjoy working across the full stack and on
            NLP-related problems. Have a look at some of my
            projects or check out my resume. If you have any
            questions or would like to discuss a potential
            collaboration, I'd be thrilled to connect with
            you.</span>
        </p>
      </div>
    </transition>
  </div>
</template>

<style>
.fade-enter-active {
  transition: 1.4s ease-out;
}

.fade-leave-active {
  transition: 1.3s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  transition: scale(0.95);
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  transition: scale(1);
  opacity: 1;
}
</style>

<script lang="ts" setup>
function playVideo() {
  console.log("HELLO from JS")
}
</script>