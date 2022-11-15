import { getToken } from "next-auth/jwt";

export default async (req, res) => {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const { accessToken } = await getToken({
    req,
    secret: process.env.JWT_SECRET,
  });
  const { location } = req.query;
  const projectID = location[0];
  const locationRaw= `${location[1]}`;
  const locationFilter = locationRaw.toUpperCase()
  

  if (accessToken) {
    // Signed in
    const url = `https://api.procore.com/rest/v1.0/projects/${projectID}/locations?company_id=10469&filters[search]=${locationFilter}`;
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: "Bearer " + accessToken },
    });

    const result = await response.json();

    
    const filteredData = [];
    for(let i in result) {
        filteredData.push({
          id: result[i].id,
          name: result[i].node_name,
        });
    }
    res.status(200).json(filteredData);
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
};
