import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/drawArtwork"
  },
  {
    path: "/drawArtwork",
    name: "工艺图配置",
    component: () => import("@/views/drawArtwork/NewIndex.vue")
  },
  {
    path: "/artView",
    name: "工艺图展示",
    component: () => import("@/views/drawArtwork/ArtView.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name) {
    window.document.title = to.name;
  }
  next();
});

export default router;
