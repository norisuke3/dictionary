<template>
<div id="app">
  <div id="header">
    <b-nav>
      <b-nav-item @click="activePage = e2j">英和</b-nav-item>
      <b-nav-item-dropdown id="e2j-dropdown" right>
        <b-dropdown-item @click="e2j = 'Weblio'; activePage = e2j">Weblio</b-dropdown-item>
        <b-dropdown-item @click="e2j = 'eijiro'; activePage = e2j">英辞郎</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item @click="activePage = e2e">英英</b-nav-item>
      <b-nav-item-dropdown id="e2e-dropdown" right>
        <b-dropdown-item @click="e2e = 'Cambridge'; activePage = e2e">Cambridge</b-dropdown-item>
        <b-dropdown-item @click="e2e = 'Webster'; activePage = e2e">Merriam Webster</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item @click="activePage = 'Wikipedia'">Wikipedia</b-nav-item>
    </b-nav>

    <div class="menu-button pt-3 mr-3" @click.stop="openHistory">
      <Hamburger></Hamburger>
    </div>

    <transition name="right">
      <div id="history" v-if="historyShown">
        <History @close="closeHistory"></History>
      </div>
    </transition>
  </div>

  <div class="home">
    <iframe v-if="activePage == 'Weblio'" :src="urlWeblio" frameborder="0"></iframe>
    <iframe v-if="activePage == 'eijiro'" :src="urlEijiro" frameborder="0"></iframe>
    <iframe v-if="activePage == 'Cambridge'" :src="urlCambridgeDictionary" frameborder="0"></iframe>
    <iframe v-if="activePage == 'Webster'" :src="urlMerriamWebster" frameborder="0"></iframe>
    <iframe v-if="activePage == 'Wikipedia'" :src="urlWikipedia" frameborder="0"></iframe>
  </div>
</div>
</template>

<script>
import Hamburger from '@/components/Hamburger.vue'
import History from '@/components/History.vue'
import history from '@/storage/history';
import { config } from "@/storage/history";

export default {
  components: { Hamburger, History },
  props: [ ],
  data: function(){
    return {
      historyShown: false,
      activePage: "Weblio",
      e2j: "Weblio",
      e2e: "Cambridge",
      document_id: ""
    }
  },
  computed: {
    urlWeblio: function(){
      return "https://ejje.weblio.jp/content/" + (this.$route.params.word || "");
    },
    urlEijiro: function(){
      return "https://eow.alc.co.jp/search?q=" + (this.$route.params.word || "");
    },
    urlCambridgeDictionary: function(){
      return "https://dictionary.cambridge.org/us/dictionary/english/" + (this.$route.params.word || "");
    },
    urlMerriamWebster: function(){
      return "https://www.merriam-webster.com/dictionary/" + (this.$route.params.word || "");
    },
    urlWikipedia: function(){
      return "https://en.wikipedia.org/wiki/" + (this.$route.params.word || "");
    }
  },
  methods: {
    openHistory: function(){
      this.historyShown = true
    },
    closeHistory: function(){
      this.historyShown = false
    }
  },
  created(){
    config.document_id = this.$route.params.document_id;

    this.document_id = this.$route.params.document_id;
    var storage = history.getStorage();
    storage.add(this.$route.params.word);
  }
}
</script>

<style scoped>
.home, .home > iframe {
  height: 100%;
  width: 100%;
}

#app {
  height: 100%;
}

#header {
    text-align: right;
}

.nav {
    float: left;
}

.menu-button {
  position: relative;
  height: 20px;
  width: 28px;
  display: inline-block;
}

#history{
  text-align: left;
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background-color: #eeeeff;
}
</style>
