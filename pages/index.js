import { Fragment, useEffect } from "react";
import Button from "../components/ui/button";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn("procore"); // Force sign in to hopefully resolve error
    }
  }, [session]);
  if (session) {
    return (
      <>
       
        <div>
          <h1>
            <b>Welcome {session.user.email}</b>
          </h1>
          <p>
            This website is designed to perform <b>BULK</b> updates on Procore
            Inspection sheets. 
          </p>
          <p>
            
          </p>
          <Button link="/projects">Projects</Button>
        </div>
      </>
    );
  } else {
    return (
      <Fragment>
        <title>Home Page</title>
        <div>
          <h1>Welcome to Procore Inspections Updater</h1>

          <Button onClick={() => signIn("procore")}>SignIn with Procore</Button>
        </div>
      </Fragment>
    );
  }
}
