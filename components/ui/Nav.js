import classes from './nav.module.css'
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
        <Link  href="/" className={classes.navItems.a}>Home</Link>
      </li>
      <li className={classes.navItems}>
        <Link  href="/projects" className={classes.navItems.a}>Project</Link>
      </li>
      <button className={classes.btn} onClick={()=>signOut()}>Logout</button>
    </ul>
</div>
  );
}

export default Nav;
