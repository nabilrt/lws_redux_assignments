import axios from "../../config/axios-config";

export const getRelatedBlogs = async (id, tags) => {
  let updatedTagString = "";
  tags.forEach((element, idx, array) => {
    if (idx !== array.length - 1) {
      updatedTagString += "tags_like=" + element + "&";
    } else {
      updatedTagString += "tags_like=" + element;
    }
  });

  updatedTagString += `&id_ne=${id}`;

  const response = await axios.get(`/blogs?${updatedTagString}`);
  return response.data;
};
