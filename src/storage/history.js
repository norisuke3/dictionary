import firebase from '@/storage/firestore';
import _ from "lodash";

var db = firebase.firestore();

var Firestore = function(){
}

Firestore.prototype.get = async function(){
  var history = await db.collection("dictionary").doc(config.document_id).get();
  if (history.exists) {
    var data = history.data();
    return data["items"];
  } else {
    return [];
  }
};

Firestore.prototype.update = async function(items){
  await db.collection("dictionary").doc(config.document_id).set({ items });
};

var local = {
  get: function(){
    return localStorage["history"] ? JSON.parse(localStorage["history"]) : [];
  },
  update: function(items){
    localStorage["history"] = JSON.stringify(items);
  }
}

export default {
  getStorage: function(){
    var server = new Firestore();

    return {
      get: async function(){
        var items = local.get();
        if (items.length == 0) {
          items = await server.get();
        }

        return items;
      },
      add: async function(item){
        var history = await this.get();

        if (!_.some(history, (h) => {return h.word == item;})){
          history.push({word: item, timestamp: Date.now()});
        }
        await this.update(history);
      },
      update: async function(items){
        local.update(items);
        await server.update(items);
      }
    }
  }
}

export const config = { document_id: "default" };
