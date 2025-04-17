import { createRouter, createWebHistory } from "vue-router";

import AdminLogin from "@/views/AdminLogin.vue";
import ListUsers from "@/views/ListUsers.vue";
import AddUser from "@/views/AddUser.vue";
import UpdateUser from "@/views/UpdateUser.vue";
import AdminLayout from "@/layout/AdminLayout.vue";

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "AdminLogin",
    component: AdminLogin,
    meta: { requiresGuest: true }
  },
  {
    path: "/user",
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        redirect: "/users"
      },
      {
        path: "/users",
        name: "ListUsers",
        component: ListUsers,
        meta: { requiresAuth: true }
      },
      { 
        path: "/users/add", 
        name: "AddUser",
        component: AddUser,
        meta: { requiresAuth: true }
      },
      { 
        path: "/users/update/:id",
        name: "UpdateUser",
        component: UpdateUser,
        meta: { requiresAuth: true }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('admin_token')
  
  if (to.meta.requiresAuth && !token) {
    next('/admin/login')
  } else if (to.meta.requiresGuest && token) {
    next('/users')
  } else {
    next()
  }
})

export default router;
