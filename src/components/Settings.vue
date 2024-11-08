<template>
<div>
  <b-container class="icons">
    <b-row class="h-100" align-v="center">
      <b-col class="text-left ms-1"><div @click="close">→</div></b-col>
    </b-row>
  </b-container>

  <b-list-group>
    <b-list-group-item>
      <b-form class="d-flex justify-content-start align-items-center">
        <label class="mb-0 me-2">表示数</label>
        <b-input v-model="max"  class="ms-2 w-50" placeholder="0"
                 @keypress="isNumber($event)"></b-input>
      </b-form>
    </b-list-group-item>
  </b-list-group>

  <b-list-group>
    <b-list-group-item>
      <div @click="showTypingPad">タイピング練習</div>
    </b-list-group-item>
  </b-list-group>

  <b-list-group>
    <b-list-group-item>
      <div @click="setActivePage('chart')">統計</div>
    </b-list-group-item>
  </b-list-group>

  <b-list-group>
    <b-list-group-item>
      <div @click="setActivePage('word-cloud')">ワードクラウド</div>
    </b-list-group-item>
  </b-list-group>

  <transition name="right">
    <div id="typing-pad" v-if="typingPadShown">
      <b-container class="icons">
        <b-row class="h-100" align-v="center">
          <b-col class="text-left ms-1"><div @click="typingPadShown = false">→</div></b-col>
        </b-row>
      </b-container>

      <div class="px-3 pb-3 h-75">
        <b-form-textarea v-model="data" ref="typingpad" placeholder="Let's type..." class="w-100 h-100">
        </b-form-textarea>
      </div>

      <div class="d-flex justify-content-end me-3">
        <b-button variant="primary" @click="resetPad">Clear</b-button>
      </div>
    </div>
  </transition>
</div>
</template>


<script setup>
import { ref, inject, watch } from 'vue';

const props = defineProps(['max']);
const emit = defineEmits(['close', 'update:max']);

const setActivePage = inject('setActivePage');

// Define refs (reference for focusing on typingpad)
const typingpad = ref(null);

// Setup variables
const typingPadShown = ref(false);
const data = ref("");
const max = ref(props.max);

// Methods
const close = () => { emit('close'); };
const resetPad = () => { data.value = ""; };

const isNumber = (evt) => {
  if (!/^[0-9]$/.test(evt.key)) {
    evt.preventDefault();
  }
};

const showTypingPad = () => {
  typingPadShown.value = true;
  setTimeout(() => {
    typingpad.value?.focus();
  }, 350);
};

// Watch
// Watch for changes to max and notify the parent
watch(max, (newVal) => {
  emit('update:max', newVal);
});

// Reflect changes from the parent props.max into max
watch(() => props.max, (newVal) => {
  max.value = newVal;
});
</script>


<style scoped>
.icons {
    height: 2.7rem;
}

#typing-pad{
  text-align: left;
  position: absolute;
  z-index: 15;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #ffeeee;
}
</style>
