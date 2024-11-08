<template>
<div>
  <b-card title="Firefox Focus 辞書登録用 URL">
    <input id="url" class="me-2" type="text" :value="data" readonly/>
    <b-button @click="copy">Copy</b-button>
  </b-card>
</div>
</template>


<script setup>
import { ref } from 'vue';
import utils from '@/js/utils';

const data = ref(`https://my-dictionary-723fe.web.app/${utils.getUniqueStr()}/search/%s`);

const copy = () => {
  const txt = document.getElementById("url");
  if (txt) {
    txt.select();
    document.execCommand("copy");
  }
};
</script>


<style scoped>
</style>
