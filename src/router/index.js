import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Timetable from '../views/Timetable.vue'
import Settings from '../views/Settings.vue'
import CitiesToday from '../views/CitiesToday.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/timetable',
        name: 'Timetable',
        component: Timetable
    },
    {
        path: '/cities',
        name: 'CitiesToday',
        component: CitiesToday
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
