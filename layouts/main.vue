<template>
  <div class="body">
    <Navbar />
    <Nuxt />
    <Footer class="footer" />
  </div>
</template>

<script>
export default {

}
</script>

<style>
.body{ height:100vh; margin:0; }
/* .navbar{ min-height:50px } */
.footer{ min-height:50px }

/* Trick */
.body{
  display:flex;
  flex-direction:column;
}

.footer{
  margin-top:auto;
}

</style>
