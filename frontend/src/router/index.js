import { createRouter, createWebHistory } from "vue-router";

import AddUser from "@/views/AddUser.vue";
import UpdateUser from "@/views/UpdateUser.vue";
import ListUsers from "@/views/ListUsers.vue";

const routes = [
  {
    path: "/",
    redirect: "/users",
  },
  {
    path: "/users",
    name: "ListUsers",
    component: ListUsers,
  },
  {
    path: "/users/add",
    name: "AddUser",
    component: AddUser,
  },
  {
    path: "/users/update/:id",
    name: "UpdateUser",
    component: UpdateUser,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
