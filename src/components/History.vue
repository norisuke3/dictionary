<template>
<div>
  <div>
    <b-container class="icons">
      <b-row class="d-flex justify-content-between align-items-center h-100">
        <b-col class="d-flex justify-content-start ms-1"><div @click="close">→</div></b-col>
        <b-col class="d-flex justify-content-end align-items-center">
          <div class="me-3" @click="toggleSpeaker"><IF7Speaker3Fill></IF7Speaker3Fill></div>
          <div class="me-3" @click="toggleDate"><IBiCalendarDate></IBiCalendarDate></div>
          <div class="me-3 trash" @click="toggleDelete"><IBiTrash></IBiTrash></div>
          <div @click="settingShown = true"><IBiGear></IBiGear></div>
        </b-col>
      </b-row>
    </b-container>

    <b-list-group class="overflow-auto" style="height: 100vh">
      <template v-for="item in historyItems" :key="item.timestamp">
        <b-list-group-item :href="url(item.word)" class="py-0 icons words d-flex justify-content-between align-items-center">
          <div class="item">{{ item.word }}</div>
          <div v-if="deleteShown" class="item-icon text-center" @click.prevent="remove(item)">
            <span aria-hidden="true"><IMakiCross></IMakiCross></span>
          </div>
          <div v-if="dateShown" class="">{{ timestampToDate(item.timestamp) }}</div>
          <div v-if="speakerShown" @click.prevent="utter(item.word)" class="item-icon text-center">
            <IF7Speaker3Fill></IF7Speaker3Fill>
          </div>
        </b-list-group-item>
      </template>
    </b-list-group>
  </div>

  <transition name="right">
    <div id="settings" v-if="settingShown">
      <Settings :max="max" @close="settingShown = false" @update_max="max = $event"></Settings>
    </div>
  </transition>
</div>
</template>

<script>
import _ from "lodash"
import history from '@/storage/history';
import utils from '@/js/utils';

export default {
  props: [ ],
  data: function(){
    return {
      items: [],
      deleteShown: false,
      dateShown: false,
      settingShown: false,
      speakerShown: true,
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
      this.speakerShown = false;
    },
    toggleDate: function(){
      this.dateShown = !this.dateShown;
      this.deleteShown = false;
      this.speakerShown = false;
    },
    toggleSpeaker: function(){
      this.speakerShown = !this.speakerShown;
      this.deleteShown = false;
      this.dateShown = false;
    },
    utter: function(word){
      utils.utter(word);
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

.words > div {
    line-height: 2.7rem;
}

.words > .item-icon {
    width: 1.7rem;
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
.icons svg {
  width: 1em;
  height: 1em;
}

.trash{
    font-size: 1.5rem;
}
</style>
