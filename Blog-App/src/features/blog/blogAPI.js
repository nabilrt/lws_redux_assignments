import axios from "../../config/axios-config";

export const getBlog = async (id) => {
  const response = await axios.get(`/blogs/${id}`);
  return response.data;
};

export const likeTheBlog = async (id, like) => {
  const response = await axios.patch(`/blogs/${id}`, {
    likes: like + 1,
  });
  return response.data;
};

export const saveTheBlog = async (id, saveStatus) => {
  const response = await axios.patch(`/blogs/${id}`, {
    isSaved: !saveStatus,
  });
  return response.data;
};
