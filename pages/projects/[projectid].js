import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession,signIn, signOut, getSession } from "next-auth/react";
import Button from "../../components/ui/button";
import SearchInspection from "../../components/InspectionSearch";

function LocationSearchPage() {
  const { data: session, status } = useSession();

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
        <SearchInspection onSearch={findLocationHandler} />
        <Button onClick={() => signOut()}>Sign Out</Button>
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
