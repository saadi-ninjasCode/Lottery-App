/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import LunchTime from "views/LunchTime.js"
import LotteryBalls from "./views/LotteryBalls";
import Login from './views/Login'
import Lottery from './views/Lottery'
import AdminUser from './views/AdminUser'
import ColdBalls from './views/ColdBalls'
import HotBalls from './views/HotBalls'

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "fas fa-tachometer-alt",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/LunchTime",
    name: "Lunch Time",
    icon: "fas fa-utensils",
    component: LunchTime,
    layout: "/admin"
  },
  {
    path: '/Users',
    name: 'Admin Users',
    icon: 'fas fa-users-cog',
    component: AdminUser,
    layout: '/admin',
  },
  {
    path: "/Lottery",
    name: "Lottery",
    icon: "fas fa-glasses",
    component: Lottery,
    layout: "/admin"
  },
  {
    path: "/Balls",
    name: "Draws",
    icon: 'fab fa-bitcoin',
    component: LotteryBalls,
    layout: "/admin"
  },
  {
    path: "/coldBall",
    name: "Cold Balls",
    icon: "fas fa-snowman",
    component: ColdBalls,
    layout: "/admin"
  },
  {
    path: "/hotBall",
    name: "Hot Balls",
    icon: "fab fa-hotjar",
    component: HotBalls,
    layout: "/admin"
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'fas fa-walking',
    component: Login,
    layout: '/auth',
    invisible: true
  },
];
export default routes;
