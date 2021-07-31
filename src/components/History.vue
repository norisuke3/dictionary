<template>
  <b-list-group>
    <a class="list-group-item list-group-item-action" @click="close">→</a>
    <template v-for="item in history">
      <a class="list-group-item list-group-item-action" :href="url(item)" v-bind:key="item">
        <p class="item">{{ item }}</p>
        <p class="close" @click.prevent="remove(item)">x</p>
      </a>
    </template>
  </b-list-group>
</template>

<script>
import _ from "lodash"

export default {
  components: { },
  props: [ ],
  data: function(){
    return {
      history: []
    }
  },
  computed: {
  },
  methods: {
    url: function(item){
      return "/search/" + item;
    },
    close: function(){
      this.$emit('close');
    },
    remove: function(item){
      var index = _.indexOf(this.history, item);
      if ( index != -1 ) {
        this.history.splice(index, 1)
      }

      localStorage["history"] = JSON.stringify(this.history);
    }
  },
  created(){
    var storage = localStorage;
    var list = storage["history"] ? JSON.parse(storage["history"]) : [];
    this.history = _.reverse(list);
  }
}
</script>

<style scoped>
.item{
    text-align: left;
    float: left;
    margin-bottom: 0;
}

.close {
    text-align: right;
    margin-bottom: 0;
}

.close > .btn {
    padding-top: 0;
    padding-bottom: 0;
}
</style>
