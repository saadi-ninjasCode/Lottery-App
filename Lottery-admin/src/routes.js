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
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import LunchTime from "views/LunchTime.js"
import TeaTime from "views/TeaTime";
import Login from 'views/Login'

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "fas fa-tachometer-alt",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/map",
    name: "Map",
    icon: "tim-icons icon-pin",
    component: Map,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "tim-icons icon-align-center",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/rtl-support",
    name: "RTL Support",
    icon: "tim-icons icon-world",
  },
  {
    path: "/LunchTime",
    name: "Lunch Time",
    icon: "fas fa-utensils",
    component: LunchTime,
    layout: "/admin"
  },
  {
    path: "/TeaTime",
    name: "Tea Time",
    icon: 'fas fa-coffee',
    component: TeaTime,
    layout: "/admin"
  },
  {
    path: "/rtl-support",
    name: "Lottery",
    icon: "fas fa-glasses",
    layout: "/admin"
  },
  {
    path: "/rtl-support",
    name: "Daily Million",
    icon: "tim-icons icon-basket-simple",
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
