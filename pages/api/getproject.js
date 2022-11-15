// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt";

export default async (req, res) => {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const { accessToken } = await getToken({
    req,
    secret: process.env.JWT_SECRET,
  });
  if (accessToken) {
    // Signed in
    
    const url = "https://api.procore.com/rest/v1.1/projects?company_id=10469";
    const response  = await fetch(url, {
      method: "GET",
      headers: { Authorization: "Bearer " + accessToken },
    })
    
    const result = await response.json();
    
    res.status(200).json(result);
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
};
