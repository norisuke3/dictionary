<template>
<div class="home">
  <iframe frameborder="0" :src="url"></iframe>
</div>
</template>

<script>
import _ from "lodash"

export default {
  components: { },
  props: [ ],
  data: function(){
    return {
    }
  },
  computed: {
    url: function(){
      return "https://ejje.weblio.jp/content/" + (this.$route.params.word || "");
    }
  },
  methods: {
  },
  created(){
    var storage = localStorage;
    var max = 100;
    var history = storage["history"] ? JSON.parse(storage["history"]) : [];
    var word = this.$route.params.word;

    if ( !_.includes(history, word) ) {
      history.length == max && history.shift();
      history.push(word);
      storage["history"] = JSON.stringify(history);
    }
  }
}
</script>

<style scoped>
.home, .home > iframe {
  height: 100%;
  width: 100%;
}
</style>
