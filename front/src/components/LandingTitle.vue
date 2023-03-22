
<template>
  <div>
    <transition name="fade" appear>
      <div>
      <h1
        class="inline-block max-w-lg align-top mt-2 bg-gradient-to-br from-white to-gray-600 bg-clip-text text-transparent text-2xl leading-[28px] sm:text-4xl sm:leading-[48px] text-gray-400 font-bold">
        Hi, I'm Thomas,<br />a developer and project manager
        based in Singapore </h1>
        <p class="mt-4 mb-8 text-base font-normal text-gray-400">
          <span class="inline-block max-w-[591px] align-top">I've
            built and shipped digital products both as a solo
            maker and product owner in the finance, automotive,
            and education sectors.</span>
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