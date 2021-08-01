import firebase from '@/storage/firestore';

var db = firebase.firestore();

export default {
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
};
