import { getToken } from "next-auth/jwt";

export default async (req, res) => {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const { accessToken } = await getToken({
    req,
    secret: process.env.JWT_SECRET,
  });
  if (accessToken) {
    // Signed in
    const { project_id, list_id } = req.query;

    console.log(req.query);
    const tempArr = list_id.split(',');
    const listArr = [];
    for (let i in tempArr){
      listArr.push(+tempArr[i]);
    }
    console.log(listArr);
    const url = `https://api.procore.com/rest/v1.0/projects/${project_id}/checklist/list_items?comany_id=10469&filters[list_id]=[${list_id}]`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    const result = await response.json();
    const filteredData = {};
    for (let i = 0; i < listArr.length; i++) {
      filteredData[listArr[i]] = []
      
    }
    for(let i = 0; i < listArr.length; i++){
      for(let j = 0; j< result.length; j++){
        if (result[j].list_id == Object.keys(filteredData)[i]){
          filteredData[Object.keys(filteredData)[i]].push({
            index: j,
            id: result[j].id,
            name: result[j].name,
          })
        } 
      }
    }
    console.log(filteredData)
    res.status(200).json(filteredData);
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
};
