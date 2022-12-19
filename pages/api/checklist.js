import { getToken } from "next-auth/jwt";

export default async (req, res) => {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const { accessToken } = await getToken({
    req,
    secret: process.env.JWT_SECRET,
  });
  if (accessToken) {
    // Signed in
    const { project_id, checklists } = req.query;
    const items = checklists.split(",");
    const loc_id = [];
    for (let i = 0; i < items.length; i++) {
      loc_id.push(+items[i]);
    }
    console.log(loc_id);
    const url = `https://api.procore.com/rest/v1.0/projects/${project_id}/checklist/lists?company_id=10469&filters[location_id]=[${loc_id}]`
    const response = await fetch(url, {
      method: "GET",
      //params: {"filters[location_id]": loc_id},
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    const result = await response.json();



    const filteredData = [];
    for(let i in result) {
        filteredData.push({
          id: result[i].id,
        });
    }
    
    res.status(200).json(filteredData);
    } else {
    // Not Signed in
    res.status(401);
  }
    res.end();
};
