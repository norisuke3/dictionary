<template>
<div>
  <b-card title="URL">
    <input id="url" type="text" :value="data" readonly/>
  </b-card>
  <b-button @click="copy">Copy</b-button>
</div>
</template>

<script>
import utils from '@/js/utils';

export default {
  components: { },
  props: [ ],
  data: function(){
    return {
      data: null
    }
  },
  computed: {
  },
  methods: {
    copy: function(){
      var txt = document.getElementById("url");
      txt.select();
      document.execCommand("Copy");
    }
  },
  async created(){
    this.data = "https://my-dictionary-723fe.web.app/" + utils.getUniqueStr() + "/search/%s";
  }
}
</script>

<style scoped>
</style>
