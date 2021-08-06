<template>
<div>
  <b-list-group>
    <b-list-group-item @click="console.log(this.max)">表示数: {{ max }}</b-list-group-item>
  </b-list-group>
</div>
</template>

<script>
export default {
  components: { },
  props: ['max' ],
  data: function(){
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
