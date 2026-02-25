import { BACKEND_URL } from "../config";

export const getData = async token => {
  const userData = await fetch(`${BACKEND_URL}/public/get/user_data`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //   Authorization: `Bearer ${token}`,
    },
  });

  const responsetxt = await userData.text(); // get the response from get_question_answer -> what is being returned from the backend
  // console.log('\n\n\n userData inside getScores:', responsetxt);
  console.log(`\n\n\n userData inside getData: ${responsetxt}\n\n\n`);

  return responsetxt;
};

export const addData = async (data) => {
  const response = await fetch(`${BACKEND_URL}/public/add/user_data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //   Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  });
  return await response.text();
};