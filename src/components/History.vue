<template>
<div class="height-max">
  <div>
    <b-list-group-item @click="close">→</b-list-group-item>
  </div>
    <div class="history-items height-max">
      <b-list-group>
        <template v-for="item in historyItems">
          <b-list-group-item :href="url(item)" v-bind:key="item">
            <p class="item">{{ item }}</p>
            <p class="close mb-0" @click.prevent="remove(item)">
              <span aria-hidden="true">&times;</span>
            </p>
          </b-list-group-item>
        </template>
      </b-list-group>
    </div>
  </div>
</template>

<script>
import _ from "lodash"
import history from '@/storage/history';

export default {
  components: { },
  props: [ ],
  data: function(){
    return {
      history: []
    }
  },
  computed: {
    historyItems: function(){
      return _.reverse([...this.history]);
    }
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

      history.update(this.history)
    }
  },
  async created(){
    this.history = await history.get();
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
</style>
