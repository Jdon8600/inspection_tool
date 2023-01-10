import classes from './nav.module.css'
import Button from './button';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

function Nav() {
  return (
    <div >
    <ul className={classes.nav}>
        <li className={classes.navItems}>
            Inspection Updating Tool
        </li>
      <li className={classes.navItems}>
        <Link className={classes.a} href="/">Home</Link>
      </li>
      <li className={classes.navItems}>
        <Link className={classes.a} href="/projects">Project</Link>
      </li>
      <button className={classes.btn} onClick={()=>signOut()}>Logout</button>
    </ul>
</div>
  );
}

export default Nav;
