<template>
<div>
  <div>
    <b-container class="icons">
      <b-row class="h-100" align-v="center">
        <b-col class="text-left ml-1" @click="close">→</b-col>
        <b-col cols="9" class="text-right">
          <div class="float-right" @click="settingShown = true"><BIconGear></BIconGear></div>
          <div class="float-right mr-3" @click="toggleDate"><BIconCalendarDate></BIconCalendarDate></div>
          <div class="close mr-3" @click="toggleDelete"><BIconTrash></BIconTrash></div>
        </b-col>
      </b-row>
    </b-container>
    <b-list-group class="overflow-auto" style="height: 100vh">
      <template v-for="item in historyItems">
        <b-list-group-item :href="url(item.word)" v-bind:key="item">
          <p class="item mb-0 float-left text-left">{{ item.word }}</p>
          <p v-if="deleteShown" class="close mb-0" @click.prevent="remove(item)">
            <span aria-hidden="true">&times;</span>
          </p>
          <p v-if="dateShown" class="mb-0">{{ timestampToDate(item.timestamp) }}</p>
        </b-list-group-item>
      </template>
    </b-list-group>
  </div>

  <transition name="right">
    <div id="settings" v-if="settingShown">
      <Settings :max="max" @close="settingShown = false"></Settings>
    </div>
  </transition>
</div>
</template>

<script>
import _ from "lodash"
import history from '@/storage/history';
import Settings from '@/components/Settings.vue'
import utils from '@/js/utils';
import { BIconTrash, BIconCalendarDate, BIconGear } from 'bootstrap-vue';

export default {
  components: { Settings, BIconTrash, BIconCalendarDate, BIconGear },
  props: [ ],
  data: function(){
    return {
      items: [],
      deleteShown: false,
      dateShown: false,
      settingShown: false,
      storage: null,
      max: 100
    }
  },
  computed: {
    historyItems: function(){
      return _.reverse([...this.items].slice(-this.max));
    }
  },
  methods: {
    url: function(item){
      return "/" + this.$route.params.document_id + "/search/" + item;
    },
    timestampToDate: function(timestamp){
      return utils.timestampToDate(timestamp);
    },
    close: function(){
      this.$emit('close');
    },
    remove: function(item){
      var index = _.indexOf(this.items, item);
      if ( index != -1 ) {
        this.items.splice(index, 1);
      }

      this.storage.update(this.items);
    },
    toggleDelete: function(){
      this.deleteShown = !this.deleteShown;
      this.dateShown = false;
    },
    toggleDate: function(){
      this.dateShown = !this.dateShown;
      this.deleteShown = false;
    }
  },
  async created(){
    this.storage = history.getStorage()
    this.items = await this.storage.get();
  }
}
</script>

<style scoped>
.icons {
    height: 2.7rem;
}

#settings{
  text-align: left;
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #ffeeee;
}
</style>
