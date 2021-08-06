<template>
<div>
  <b-list-group>
    <b-list-item-group><p class="item" @click="close">→</p></b-list-item-group>
    <b-list-group-item @click="console.log(this.max)">
      <b-form inline>
        <label for="">表示数</label>
        <b-input v-model="max"  class="ml-2" placeholder="0"
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
.item{
    text-align: left;
    float: left;
    margin-bottom: 0;
}
</style>
