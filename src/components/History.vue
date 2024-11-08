<template>
<div>
  <div>
    <b-container class="icons">
      <b-row class="d-flex justify-content-between align-items-center h-100">
        <b-col class="d-flex justify-content-start ms-1"><div @click="close">→</div></b-col>
        <b-col class="d-flex justify-content-end align-items-center">
          <div class="me-3" @click="toggleShown(DisplayType.SPEAKER)"><IF7Speaker3Fill></IF7Speaker3Fill></div>
          <div class="me-3" @click="toggleShown(DisplayType.DATE)"><IBiCalendarDate></IBiCalendarDate></div>
          <div class="me-3 trash" @click="toggleShown(DisplayType.DELETE)"><IBiTrash></IBiTrash></div>
          <div @click="settingShown = true"><IBiGear></IBiGear></div>
        </b-col>
      </b-row>
    </b-container>

    <b-list-group class="overflow-auto" style="height: 100vh">
      <template v-for="item in historyItems" :key="item.timestamp">
        <b-list-group-item :href="url(item.word)" class="py-0 icons words d-flex justify-content-between align-items-center">
          <div class="item">{{ item.word }}</div>
          <div v-if="shown === DisplayType.DELETE" class="item-icon text-center" @click.prevent="remove(item)">
            <span aria-hidden="true"><IMakiCross></IMakiCross></span>
          </div>
          <div v-if="shown === DisplayType.DATE" class="">{{ timestampToDate(item.timestamp) }}</div>
          <div v-if="shown === DisplayType.SPEAKER" @click.prevent="utter(item.word)" class="item-icon text-center">
            <IF7Speaker3Fill></IF7Speaker3Fill>
          </div>
        </b-list-group-item>
      </template>
    </b-list-group>
  </div>

  <transition name="right">
    <div id="settings" v-if="settingShown">
      <Settings :max="max" @close="settingShown = false" @update_max="max.value = $event"></Settings>
    </div>
  </transition>
</div>
</template>

<script setup>
import _ from "lodash";
import { ref, computed, defineEmits } from "vue";
import { useRoute } from "vue-router";
import history from '@/storage/history';
import utils from '@/js/utils';

const DisplayType = {
  DELETE: 'delete',
  DATE: 'date',
  SPEAKER: 'speaker',
};

const emit = defineEmits(['close']);
const route = useRoute();
const storage = history.getStorage();

// Setup variables
const items = ref([]);
const shown = ref(DisplayType.SPEAKER);
const settingShown = ref(false);
const max = ref(100);

// Computed
const historyItems = computed(() => _.reverse([...items.value].slice(-max.value)));

// Methods
const url = (item) => `/${route.params.document_id}/search/${item}`;
const timestampToDate = (timestamp) => utils.timestampToDate(timestamp);

const close = () => { emit('close'); };
const utter = (word) => { utils.utter(word); };
const toggleShown = (type) => { shown.value = shown.value === type ? null : type; };

const remove = (item) => {
  const index = _.indexOf(items.value, item);
  if (index != -1) {
    items.value.splice(index, 1);
  }
  storage.update(items.value);
};

const initialize = async () => {
  items.value = await storage.get();
};

initialize();
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
