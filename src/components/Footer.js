
import React from "react";
import { NavLink as RouterNavLink } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';

import './Footer.css';

import routing from '../routing.js';

const footer = () => {
  return (
    <div>
      <Nav className="flexbox footer" pills>
        <NavItem className="footerItem">
          <NavLink className="footerLink" tag={RouterNavLink} to={routing.notImplemented} exact="true">
            Contact Us
          </NavLink>
        </NavItem>
        <NavItem className="footerItem">
          <NavLink className="footerLink" tag={RouterNavLink} to={routing.notImplemented} exact="true">
            Site Map
          </NavLink>
        </NavItem>
        <NavItem className="footerItem">
          <NavLink className="footerLink" tag={RouterNavLink} to={routing.notImplemented} exact="true">
            Privacy Policy
          </NavLink>
        </NavItem>
        <NavItem className="footerItem">
          <NavLink className="footerLink" tag={RouterNavLink} to={routing.notImplemented} exact="true">
            Careers
          </NavLink>
        </NavItem>
        <NavItem className="footerItem">
          <NavLink className="footerLink" tag={RouterNavLink} to={routing.notImplemented} exact="true">
            Reviews
          </NavLink>
        </NavItem>
        <p className="footerP">Designed by Tzu-Hung Chang</p>
      </Nav>
    </div>
  )
}

export default footer;