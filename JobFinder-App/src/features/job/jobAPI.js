import axios from "../../config/axios-config";
export const getJob = async (id) => {
  const response = await axios.get(`http://localhost:9000/jobs/${id}`);
  return response.data;
};


