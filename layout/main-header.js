import classes from "./main-header.module.css";
import { signOut } from "next-auth/react";
import Link from "next/link";
import styled from "styled-components";

const NavLink = styled.a`
  display: block;
  color: white;
  text-align: center;
  text-decoration: none;
  padding-bottom: 16px;
  &:hover {
    background-color: orange !important;
  }
`;
function MainHeader() {
  return (
    <header>
      <div className={classes.nav}>
        <li className={classes.navItems}>Inspection Updating Tool</li>
      </div>
      <nav className={classes.nav}>
        <ul>
          <li className={classes.navItems}>
            <Link href="/">
              <NavLink>Home</NavLink>
            </Link>
          </li>
          <li className={classes.navItems}>
            <Link href="/projects">
              <NavLink>Project</NavLink>
            </Link>
          </li>
          <button className={classes.btn} onClick={() => signOut()}>
            Logout
          </button>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
