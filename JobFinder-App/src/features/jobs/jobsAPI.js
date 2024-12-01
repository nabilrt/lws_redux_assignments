import axios from "../../config/axios-config";
export const getJobs = async (type) => {
  let updatedTagString = "";
  type.length > 0 &&
    type.forEach((element, idx, array) => {
      if (idx !== array.length - 1) {
        updatedTagString += "type_like=" + element + "&";
      } else {
        updatedTagString += "type_like=" + element;
      }
    });
  const response = await axios.get(
    `http://localhost:9000/jobs?${updatedTagString}`
  );
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await axios.delete(`http://localhost:9000/jobs/${id}`);
  return response.data;
};

export const updateJob = async (id, data) => {
  const response = await axios.patch(`http://localhost:9000/jobs/${id}`, data);
  return response.data;
};

export const createJob = async (data) => {
  const response = await axios.post(`http://localhost:9000/jobs`, data);
  return response.data;
};
