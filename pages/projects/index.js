import Projects from "../../components/project";
import { useSession,signIn, signOut, getSession } from "next-auth/react";
import { useState, useEffect } from "react";



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
    if(!projectItems){
      return(
        <div className="center">
          <p>Loading...</p>
        </div>
      )
    }
    return (
      <>
      <div>
        <Projects session={session} project={projectItems} />
        <br />
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
