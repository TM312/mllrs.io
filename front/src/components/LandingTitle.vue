
<script lang="ts" setup>

const logos = [
  {
    'name': 'Python',
    'src': '/logos/python.svg',
  },
  {
    'name': 'VueJS',
    'src': '/logos/vue.svg',
  },
  {
    'name': 'Postgresql',
    'src': '/logos/postgresql.svg',
  },
  {
    'name': 'TailwindCSS',
    'src': '/logos/tailwindcss.svg',
  },
  {
    'name': 'Docker',
    'src': '/logos/docker.svg',
  },
  {
    'name': 'Terraform',
    'src': '/logos/terraform.svg',
  },
  {
    'name': 'RabbitMQ',
    'src': '/logos/rabbitmq.svg',
  },
  {
    'name': 'Redis',
    'src': '/logos/redis.svg',
  },
  {
    'name': 'AWS',
    'src': '/logos/aws.svg',
  },

]
</script>
<template>
  <div>
    <transition name="fade" appear>
      <div>
        <h1
          class="inline-block max-w-lg align-top mt-2 bg-gradient-to-br from-white to-gray-600 bg-clip-text text-transparent text-2xl leading-[28px] sm:text-4xl sm:leading-[48px] text-gray-400 font-bold">
          <br />I build digital products <br />for the web
        </h1>
        <p
          class="mt-4 mb-8 text-base font-normal text-gray-400">
          <span
            class="inline-block max-w-[591px] align-top">Hi,
            it's Thomas 👋 I'm a full-stack engineer and build
            digital solutions with a focus on NLP and
            text-analysis. I have worked with clients across a
            variety of industries ranging from financial
            institutions, to education and the automotive
            sector. </span>
        </p>
        <div class="flex items-center max-w-xs gap-x-4">
          <img v-for="logo, i in logos" :key="i"
            class="saturate-50 hover:saturate-100 w-6 h-6"
            :src="logo.src" :alt="`${logo.name} logo`"
            :title="logo.name" />
        </div>
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