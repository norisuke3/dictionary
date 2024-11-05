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
    <div id="history" class="panel" v-if="historyShown">
      <History @close="closeHistory"></History>
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
  <div v-if="activePage == 'blank'"></div>
</div>
</template>

<script>
import history from '@/storage/history';
import utils from '@/js/utils';
import { provide, ref } from 'vue';

export default {
  props: [ ],
  setup(){
    const activePage = ref(import.meta.env.VITE_HOME_ACTIVE_PAGE || "blank")
    const historyShown = ref(false)

    const showChart = function(){
      activePage.value = 'chart';
      historyShown.value = false;
    }

    provide('showChart', showChart);

    return { activePage, historyShown, showChart }
  },
  data: function(){
    return {
      e2j: "Weblio",
      e2e: "Webster",
      document_id: "",
      wordData: []
    }
  },
  computed: {
    urlWeblio: function(){
      return "https://ejje.weblio.jp/content/" + (this.word || "");
    },
    urlEijiro: function(){
      return "https://eow.alc.co.jp/search?q=" + (this.word || "");
    },
    urlMerriamWebster: function(){
      return "https://www.merriam-webster.com/dictionary/" + (this.word || "");
    },
    urlWikipedia: function(){
      return "https://en.wikipedia.org/wiki/" + (this.word || "");
    },
    word: function(){
      return this.$route.params.word;
    }
  },
  methods: {
    openHistory: function(){
      this.historyShown = true
    },
    closeHistory: function(){
      this.historyShown = false
    },
    utter(word){
      utils.utter(this.word);
    },
    async fetchData() {
      try {
        var storage = history.getStorage();
        const items = await storage.get(); // async 関数で非同期処理を実行
        this.wordData = items;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  },
  created(){
    this.document_id = this.$route.params.document_id;
    var storage = history.getStorage();

    // The created() hook in Vue components is not an async function, so await cannot be
    // used directly. Wrapping storage.add() and this.fetchData() in an async function
    // ensures they execute in the correct order.
    (async () => {
      await storage.add(this.word);
      await this.fetchData();
    })();
    this.utter(this.word);
  }
}
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
