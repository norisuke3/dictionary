import Vue from 'vue'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import history from '@/storage/history';
import { config } from "@/storage/history";
import _ from "lodash";
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/:document_id/search/:word',
    name: 'Home',
    component: Home,
    beforeEnter: async (to, from, next) => {
      config.document_id = to.params.document_id;

      if (to.params.word.length == 1){
        const items = await history.getStorage().get();

        if ( items.length ) {
          to.params.word = _.last(items).word;
          next({ name: "Home", params: to.params });
        }
      }

      next();
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
