import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Button from "../components/ui/button";
import Nav from "../components/ui/Nav";

function Fin() {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn("procore"); // Force sign in to hopefully resolve error
    }
  }, [session]);

  const router = useRouter();

  if (status === "authenticated") {
    return (
      <>
      <Nav/>
      <div>
        <h1> Update complete! </h1>
        <br />
        <br />
        <h2>Would you like to update more inspection sheets?</h2>
        <span>
          <Button link="/projects">Yes</Button>
          <Button onClick={() => signOut()}>No</Button>
        </span>
      </div>
      </>
    );
  }
}

export default Fin;

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
