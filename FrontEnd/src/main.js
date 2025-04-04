import { createApp } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import App from "./App.vue"
import "./assets/css/styles.css"

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChartBar, faFilePdf, faRightFromBracket, faCloudArrowUp, faChevronRight, faFileLines, faXmark, faPlus, faMinus, faClock, faChevronDown, faChevronUp  } from '@fortawesome/free-solid-svg-icons'

library.add(faChartBar, faFilePdf, faRightFromBracket, faCloudArrowUp, faChevronRight, faFileLines, faXmark, faPlus, faMinus, faClock, faChevronDown, faChevronUp)




import Home from "./views/Home.vue"
import Login from "./views/Login.vue"
import Register from "./views/Register.vue"
import Dashboard from "./views/Dashboard.vue"
import Files from "./views/Files.vue"
import Reports from "./views/Reports.vue"


const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/dashboard", component: Dashboard },
  { path: "/dashboard/files", component: Files },
  { path: "/dashboard/reports", component: Reports },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


const app = createApp(App)
app.use(router)
app.mount("#app")
app.component('font-awesome-icon', FontAwesomeIcon)

