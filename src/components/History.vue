<template>
<div class="height-max">
  <div class="history-items height-max">
    <b-list-group>
      <b-list-group-item>
        <p class="item" @click="close">→</p>
        <p class="date mr-2" @click="settingShown = true"><BIconGear></BIconGear></p>
        <p class="date mr-3" @click="toggleDate"><BIconCalendarDate></BIconCalendarDate></p>
        <p class="close mb-0 mr-3" @click="toggleDelete"><BIconTrash></BIconTrash></p>
      </b-list-group-item>
      <template v-for="item in historyItems">
        <b-list-group-item :href="url(item.word)" v-bind:key="item">
          <p class="item">{{ item.word }}</p>
          <p v-if="deleteShown" class="close mb-0" @click.prevent="remove(item)">
            <span aria-hidden="true">&times;</span>
          </p>
          <p v-if="dateShown" class="date">{{ timestampToDate(item.timestamp) }}</p>
        </b-list-group-item>
      </template>
    </b-list-group>
  </div>

  <transition name="right">
    <div id="settings" v-if="settingShown" @click="settingShown = false"></div>
  </transition>
</div>
</template>

<script>
import _ from "lodash"
import history from '@/storage/history';
import utils from '@/js/utils';
import { BIconTrash, BIconCalendarDate, BIconGear } from 'bootstrap-vue';

export default {
  components: { BIconTrash, BIconCalendarDate, BIconGear },
  props: [ ],
  data: function(){
    return {
      items: [],
      deleteShown: false,
      dateShown: false,
      settingShown: false
    }
  },
  computed: {
    historyItems: function(){
      return _.reverse([...this.items]);
    }
  },
  methods: {
    url: function(item){
      return "/search/" + item;
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

      history.update(this.items);
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
    this.items = await history.get();
  }
}
</script>

<style scoped>
.history-items{
    overflow: auto;
}

.height-max {
    height: 100%;
}

.item{
    text-align: left;
    float: left;
    margin-bottom: 0;
}
.date{
    float: right;
    margin-bottom: 0;
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
