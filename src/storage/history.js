import firebase from '@/storage/firestore';
import _ from "lodash";

var db = firebase.firestore();

var firestore = {
  get: async function(){
    var history = await db.collection("col").doc("history").get();
    if (history.exists) {
      var data = history.data();
      return data["items"];
    } else {
      return [];
    }
  },
  update: async function(items){
    await db.collection("col").doc("history").set({ items });
  }
}

var local = {
  get: function(){
    return localStorage["history"] ? JSON.parse(localStorage["history"]) : [];
  },
  update: function(items){
    localStorage["history"] = JSON.stringify(items);
  }
}

export default {
  get: async function(){
    var items = local.get();
    if (items.length == 0) {
      items = await firestore.get();
    }

    return items;
  },
  add: async function(item){
    var max = 100;
    var history = await this.get();

    if (!_.some(history, (h) => {return h.word == item;})){
      history.length == max && history.shift();
      history.push({word: item, timestamp: Date.now()});
    }
    await this.update(history);
  },
  update: async function(items){
    local.update(items);
    await firestore.update(items);
  }
}
