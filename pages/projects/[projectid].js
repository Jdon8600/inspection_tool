import { Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession,signIn, signOut, getSession } from "next-auth/react";
import Button from "../../components/ui/button";
import SearchInspection from "../../components/InspectionSearch";
import Nav from "../../components/ui/Nav";

function LocationSearchPage() {
  const { data: session, status } = useSession();
  //credits: https://next-auth.js.org/tutorials/refresh-token-rotation
  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn("procore"); // Force sign in to hopefully resolve error
    }
  }, [session]);
  const router = useRouter();
  const projectID = router.query.projectid;
  function findLocationHandler(location) {
    const fullPath = `/projects/${projectID}/${location}`;
    router.push(fullPath);
  }
  if (status == "authenticated") {
    return (
      <Fragment>
        <Nav/>
        <SearchInspection onSearch={findLocationHandler} />
      </Fragment>
    );
  }
}

export default LocationSearchPage;

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
