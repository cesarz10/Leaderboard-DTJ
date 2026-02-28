// import { BACKEND_URL } from "../config";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pdbjxdlvaqfojdqgtqbr.supabase.co';
const supabaseKey = 'sb_publishable_3dx9zGbeS5T8J6mCL8ljuQ_ARISxWtL';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const getData = async () => {
  const { data, error } = await supabase
    .from('user_data')
    .select('*')
    .order('score', { ascending: false }); // Optional: let Supabase sort it for you!

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