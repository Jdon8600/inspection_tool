import classes from './nav.module.css'
import Button from './button';
import { signOut } from 'next-auth/react';

function Nav() {
  return (
    <div >
    <ul className={classes.nav}>
        <li className={classes.navItems}>
            Inspection Updating Tool
        </li>
      <li className={classes.navItems}>
        <a className={classes.a} href="/">Home</a>
      </li>
      <li className={classes.navItems}>
        <a className={classes.a} href="/projects">Project</a>
      </li>
      <button className={classes.btn} onClick={()=>signOut()}>Logout</button>
    </ul>
</div>
  );
}

export default Nav;
