import { createRouter, createWebHistory } from 'vue-router';
import Home from '/src/views/index.vue';

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Home,
    },
    {
        path: '/form',
        name: 'Form',
        component: () => import('/src/views/form.vue'),
    },
    {
        path: '/success',
        name: 'Success',
        component: () => import('/src/views/success.vue'),
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;