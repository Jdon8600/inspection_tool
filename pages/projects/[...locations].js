import { useRouter } from "next/router";
import { getSession, useSession, signOut, signIn } from "next-auth/react";
import React, { useState, useEffect, useRef } from "react";
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
  const [hasCheckID, sethasCheckID] = useState(false);
  const [checklistItems, setChecklistItems] = useState([]);
  const updates = {};

  //Create ref for input fields
  const refs = useRef([]);

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

  const submit = async (e) => {
    e.preventDefault();
    for (let i = 0; i < refs.current.length; i++) {
      if (refs.current[i].value != "") {
        updates[refs.current[i].name] = {
          id: [],
          value: refs.current[i].value,
        };
      }
    }
    for (let i = 0; i < Object.keys(checklistItems).length; i++) {
      checklistItems[Object.keys(checklistItems)[i]].map((item) => {
        for (let j = 0; j < refs.current.length; j++) {
          if (item.name == refs.current[j].name) {
            if (item.name in updates) {
              let tempArr = [...updates[item.name].id, item.id];
              updates[item.name].id = tempArr;
            }
          }
        }
      });
    }
    const update = await fetch(`/api/updates?project_id=${projectID}`, {
      method: "POST",
      body: JSON.stringify(updates),
      headers: { "Content-Type": "application/json" },
    });
    const result = await update.json();
    console.log(result);

    router.push("/fin/");
  };

  const checkItemID = async () => {
    const response1 = await fetch(
      `/api/checklist?project_id=${projectID}&checklists=${isCheck}`,
      {
        method: "Get",
        headers: { "Content-Type": "application/json" },
      }
    );
    const result1 = await response1.json();
    const checklists = result1;
    const list_id = checklists.map((checklists) => checklists.id);
    const response = await fetch(
      `/api/checklistItems?project_id=${projectID}&list_id=${list_id}`
    );
    const result = await response.json();
    sethasCheckID(!hasCheckID);
    setChecklistItems(result);
  };

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
    if (hasCheckID == false) {
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
            <Button onClick={checkItemID}>Submit</Button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <form onSubmit={submit}>
          {checklistItems[Object.keys(checklistItems)[0]].map((i) => {
            return (
              <div key={i.index}>
                {i.name}
                <input
                  type="text"
                  name={i.name}
                  id={i.id}
                  ref={(element) => {
                    refs.current[i.index] = element;
                  }}
                ></input>
              </div>
            );
          })}
          <Button>Submit</Button>
        </form>
        <Button onClick={() => signOut()}>Sign Out</Button>
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
