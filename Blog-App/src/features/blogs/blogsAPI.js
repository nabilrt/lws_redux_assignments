import axios from "../../config/axios-config";

export const getBlogs = async (sort, filter) => {
  let queryString = "";
  if (sort !== "") {
    sort === "newest"
      ? (queryString += `_sort=createdAt&_order=desc`)
      : (queryString += `_sort=likes&_order=desc`);
  }
  if (filter === "saved") {
    queryString += `&isSaved=true`;
  }

  const response = await axios.get(`/blogs?${queryString}`);
  return response.data;
};
