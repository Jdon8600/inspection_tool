import { useRouter } from "next/router";
import { getSession, useSession, signOut, signIn } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Checkbox from "../../components/Checkbox";
import Button from "../../components/ui/button";

function Location() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn("procore"); // Force sign in to hopefully resolve error
    }
  }, [session]);

  //Get URL params needed for making correct Procore API call to obtain location Nodes
  const router = useRouter();
  const getParams = router.query;
  const projectID = getParams.locations[0];
  const locationFilter = getParams.locations[1];

  //declare necessary states for updating checkboxes
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  //declare State for items to update
  const [checkLists, setChecklists] = useState([]);
  const [checklistItems, setChecklistItems] = useState([]);

  const getChecklists = async () => {
    const response = await fetch(`/api/checklist?project_id=${projectID}&checklists=${isCheck}`, {
      method: "Get",
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    console.log(result);
  };

  //Make call to back end to obtain location Node Names based on Location Filter
  useEffect(() => {
    fetch(`/api/${projectID}/${locationFilter}`)
      .then((res) => res.json())
      .then((data) => {
        setList(data);
      });
  }, []);

  //Handles the selection of all checkboxes
  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(list.map((li) => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  //Handle the selection of individual checkboxes
  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, +id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== +id));
    }
  };

  console.log(isCheck);

  const catalog = list.map(({ id, name }) => {
    return (
      <ul key={id}>
        <Checkbox
          type="checkbox"
          name={name}
          id={id}
          handleClick={handleClick}
          isChecked={isCheck.includes(id)}
        />
        {name}

        <br />
      </ul>
    );
  });
  if (status === "authenticated") {
    return (
      <div>
        <Checkbox
          type="checkbox"
          name="selectAll"
          id="selectAll"
          handleClick={handleSelectAll}
          isChecked={isCheckAll}
        />
        Select All
        <br />
        {catalog}
        <div>
          <Button onClick={getChecklists}>Submit</Button>
        </div>
      </div>
    );
  }
}
export default Location;

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
