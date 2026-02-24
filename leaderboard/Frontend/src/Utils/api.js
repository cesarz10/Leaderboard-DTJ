import { BACKEND_URL } from "../config";

export const getScores = async token => {
  const userData = await fetch(`${BACKEND_URL}/public/get/user_data`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    //   Authorization: `Bearer ${token}`,
    },
  });

  const responsetxt = await userData.text(); // get the response from get_question_answer -> what is being returned from the backend
  // console.log('\n\n\n userData inside getScores:', responsetxt);
  console.log(`\n\n\n userData inside getScores: ${responsetxt}\n\n\n`);

  return responsetxt;
};