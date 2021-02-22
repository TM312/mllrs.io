<template>
  <b-row cols="1" cols-lg="2" cols-xl="4">
    <b-col v-for="item in items" :key="item.id" class="py-3">
      <b-card class="h-100" :title="item.title">
        <b-card-text>{{ item.text }}</b-card-text>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'FooComponent',
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
