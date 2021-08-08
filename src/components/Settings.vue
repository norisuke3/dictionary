<template>
<div>
  <b-container class="icons">
    <b-row class="h-100" align-v="center">
      <b-col class="text-left ml-1" @click="close">→</b-col>
    </b-row>
  </b-container>
  <b-list-group>
    <b-list-group-item @click="console.log(this.max)">
      <b-form inline>
        <label class="mb-0 mr-2">表示数</label>
        <b-input v-model="max"  class="ml-2 w-50" placeholder="0"
                 @keypress="isNumber($event)"></b-input>
      </b-form>
    </b-list-group-item>
  </b-list-group>
</div>
</template>

<script>
export default {
  components: { },
  props: ['max' ],
  data: function(){
    return {
    }
  },
  computed: {
  },
  methods: {
    close: function(){
      this.$emit('close')
    },
    isNumber: function(evt){
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
        evt.preventDefault();
      } else {
        return true;
      }
    }
  }
}
</script>

<style scoped>
.icons {
    height: 2.7rem;
}

.item{
    text-align: left;
    float: left;
    margin-bottom: 0;
}
</style>
