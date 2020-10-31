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
import React, { useEffect, useRef, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

import logo from "assets/img/lottery-logo.png";

var ps;

function Admin(props) {
  var divRef = useRef(null)
  const [backgroundColor, setBackgroundColor] = useState('blue')
  const [sidebarOpened, setSidebarOpened] = useState(document.documentElement.className.indexOf("nav-open") !== -1)

  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(divRef, { suppressScrollX: true });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    // if (e.history.action === "PUSH") {
    //   if (navigator.platform.indexOf("Win") > -1) {
    //     let tables = document.querySelectorAll(".table-responsive");
    //     for (let i = 0; i < tables.length; i++) {
    //       ps = new PerfectScrollbar(tables[i]);
    //     }
    //   }
    //   document.documentElement.scrollTop = 0;
    //   document.scrollingElement.scrollTop = 0;
    //   divRef.scrollTop = 0;
    // }
    return () => {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.className += " perfect-scrollbar-off";
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    }

  }, [])

  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setSidebarOpened(prev => !prev)
  };
  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const handleBgClick = color => {
    setBackgroundColor(color)
  };
  const getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  return (
    <>
      <div className="wrapper">
        <Sidebar
          {...props}
          routes={routes}
          bgColor={backgroundColor}
          logo={{
            outterLink: "https://www.49sresult.co.uk/",
            text: "49s Results",
            imgSrc: logo
          }}
          toggleSidebar={toggleSidebar}
        />
        <div
          className="main-panel"
          ref={divRef}
          data={backgroundColor}
        >
          <AdminNavbar
            {...props}
            brandText={getBrandText(props.location.pathname)}
            toggleSidebar={toggleSidebar}
            sidebarOpened={sidebarOpened}
          />
          <Switch>
            {getRoutes(routes)}
            <Redirect from="*" to="/auth/login" />
          </Switch>
          {/* Footer */}
          <Footer fluid />
        </div>
      </div>
    </>
  );
}

export default Admin;
