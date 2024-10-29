<template>
<div>
  <b-card title="Firefox Focus 辞書登録用 URL">
    <input id="url" class="me-2" type="text" :value="data" readonly/>
    <b-button @click="copy">Copy</b-button>
  </b-card>
</div>
</template>

<script>
import utils from '@/js/utils';

export default {
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
