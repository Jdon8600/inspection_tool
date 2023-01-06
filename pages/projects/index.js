import Projects from "../../components/project";
import { useSession,signIn, signOut, getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "../../components/ui/button";
import Nav from "../../components/ui/Nav";

function AllProjects() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn("procore"); // Force sign in to hopefully resolve error
    }
  }, [session]);
  const [projectItems, setProjectItems] = useState([]);

  useEffect(() => {
    fetch("/api/getproject")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProjectItems(data);
      });
  }, []);
  if (status === "authenticated") {
    return (
      <>
      <Nav/>
      <div>
        <Projects session={session} project={projectItems} />
        <br />
        <Button onClick={() => signOut()}>Log Out</Button>
      </div>
      </>
    );
  }
}

export default AllProjects;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  return {
    props: { session },
  };
};
