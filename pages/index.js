import { Fragment, useEffect } from "react";
import Button from "../components/ui/button";
import Nav from "../components/ui/Nav";
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
      <Nav/>
      <div>
        <h1><b>Welcome {session.user.email}</b></h1>
        <Button link="/projects">Projects</Button>
        <Button onClick={() => signOut()}>Log Out</Button>
      </div>
      </>
    );
  } else {
    return (
      <Fragment>
        <title>Home Page</title>
        <div>
          <h1>Welcome to Procore Inspections Updater</h1>
          <p>
            This website is designed to perform BULK updates on Procore
            Inspection sheets
          </p>
          <Button onClick={() => signIn("procore")}>SignIn with Procore</Button>
        </div>
      </Fragment>
    );
  }
}
