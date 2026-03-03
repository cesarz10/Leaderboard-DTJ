// import { BACKEND_URL } from "../config";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pdbjxdlvaqfojdqgtqbr.supabase.co';
const supabaseKey = 'sb_publishable_3dx9zGbeS5T8J6mCL8ljuQ_ARISxWtL';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const getData = async () => {
  const { data, error } = await supabase
    .from('user_data')
    .select('*')
    // .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()) // get only the scores from the current month
    .order('score', { ascending: false }); // order by score in descending order

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }
  console.log("Fetched data:", data);
  return JSON.stringify(data);
};


// export const addData = async (data) => {
//   const response = await fetch(`${BACKEND_URL}/public/add/user_data`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       //   Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(data)
//   });
//   return await response.text();
// };