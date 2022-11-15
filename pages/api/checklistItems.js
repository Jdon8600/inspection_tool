import { getToken } from "next-auth/jwt";

export default async (req, res) => {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const { accessToken } = await getToken({
    req,
    secret: process.env.JWT_SECRET,
  });
  if (accessToken) {
    // Signed in
    //const { project_id, checklists } = req.query;
    const url = `https://api.procore.com/rest/v1.0/projects/431591/checklist/list_items?comany_id=10469&filters[list_id]=[10334481,10334493]`
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    const result = await response.json();
    console.log(result);

    
    res.status(200).json(result);
    } else {
    // Not Signed in
    res.status(401);
  }
    res.end();
};
