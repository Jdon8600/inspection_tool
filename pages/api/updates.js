import { getToken } from "next-auth/jwt";

export default async (req, res) => {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const { accessToken } = await getToken({
    req,
    secret: process.env.JWT_SECRET,
  });
  if (accessToken) {
    // Signed in
    const {project_id} = req.query;
    const update =  req.body;
    
    for (const key in update) {
      for(let i = 0; i < update[key].id.length; i++){

        fetch(
          `https://api.procore.com/rest/v1.0/projects/${project_id}/checklist/items/${update[key].id[i]}/item_response?company_id=10469`,
        {
          method: "POST",
          body:JSON.stringify({
            item_response:{
              status: update[key].value,
          }
        }),
          headers:{
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json"}
        }
        )
        .then(response => response.json())
        .then((data) => {
          'Success:', data
          console.log(data)
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }
    }
    res.status(200).json("Updated");
 
    } else {
    // Not Signed in
    res.status(401);
  }
    res.end();
};
