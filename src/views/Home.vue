<template>
<div id="header">
  <div class="d-flex justify-content-between align-items-center">
    <b-nav>
      <b-nav-item @click="activePage = e2j">英和</b-nav-item>
      <b-nav-item-dropdown id="e2j-dropdown" right>
        <b-dropdown-item @click="e2j = 'Weblio'; activePage = e2j">Weblio</b-dropdown-item>
        <b-dropdown-item @click="e2j = 'eijiro'; activePage = e2j">英辞郎</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item @click="activePage = e2e">英英</b-nav-item>
      <b-nav-item-dropdown id="e2e-dropdown" right>
        <b-dropdown-item @click="e2e = 'Webster'; activePage = e2e">Merriam Webster</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item @click="activePage = 'Wikipedia'">Wikipedia</b-nav-item>
      <b-nav-item @click="utter(word)"><IF7Speaker3Fill></IF7Speaker3Fill></b-nav-item>
    </b-nav>

    <div class="menu-button me-3 mt-2" @click.stop="openHistory">
      <Hamburger></Hamburger>
    </div>
  </div>
  <transition name="right">
    <div id="history" class="panel" v-show="historyShown">
      <History @close="closeHistory" :historyShown="historyShown"></History>
    </div>
  </transition>

  <transition name="right">
    <div id="cover" class="panel" v-if="historyShown" @click="historyShown = false"></div>
  </transition>
</div>

<div class="home">
  <iframe v-if="activePage == 'Weblio'" :src="urlWeblio" frameborder="0"></iframe>
  <iframe v-if="activePage == 'eijiro'" :src="urlEijiro" frameborder="0"></iframe>
  <iframe v-if="activePage == 'Webster'" :src="urlMerriamWebster" frameborder="0"></iframe>
  <iframe v-if="activePage == 'Wikipedia'" :src="urlWikipedia" frameborder="0"></iframe>
  <cumulative-chart v-if="activePage == 'chart'" :data="wordData"></cumulative-chart>
  <WordCloudChart v-if="activePage == 'word-cloud'" :data="wordData"></WordCloudChart>
  <Blank v-if="activePage == 'blank'"></Blank>
</div>
</template>


<script setup>
import { ref, computed, provide } from 'vue';
import { useRoute } from 'vue-router';
import history from '@/storage/history';
import utils from '@/js/utils';

// Props and setup variables
const route = useRoute();
const activePage = ref(import.meta.env.VITE_HOME_ACTIVE_PAGE || "blank");
const historyShown = ref(false);
const e2j = ref("Weblio");
const e2e = ref("Webster");
const document_id = ref(route.params.document_id || "");
const wordData = ref([]);

// Computed
const word = computed(() => route.params.word);
const urlWeblio = computed(() => `https://ejje.weblio.jp/content/${word.value || ""}`);
const urlEijiro = computed(() => `https://eow.alc.co.jp/search?q=${word.value || ""}`);
const urlMerriamWebster = computed(() => `https://www.merriam-webster.com/dictionary/${word.value || ""}`);
const urlWikipedia = computed(() => `https://en.wikipedia.org/wiki/${word.value || ""}`);

// Methods to open and close history
const openHistory = () => {
  historyShown.value = true;
};

const closeHistory = () => {
  historyShown.value = false;
};

// Method to speak the word aloud
const utter = () => {
  utils.utter(word.value);
};

// Fetch data from history storage
const fetchData = async () => {
  try {
    wordData.value = await history.getStorage().get();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Provide
provide('setActivePage', (page) => {
  activePage.value = page;
  historyShown.value = false;
});

const initialize = async () => {
  const storage = history.getStorage();
  await storage.add(word.value);
  await fetchData();
  utter();
};

initialize();
</script>


<style scoped>
.home, .home > iframe {
  height: 100%;
  width: 100%;
}

#header {
    text-align: right;
}

.menu-button {
  position: relative;
  height: 20px;
  width: 28px;
  display: inline-block;
}

.panel {
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background-color: #ffffff;
}

#history.panel{
  background-color: #eeeeff;
}

#cover{
  z-index: 5;
  width: 100%;
  opacity: 0;
}

.nav {
    --bs-nav-link-padding-x: 0.8rem;
}
</style>
