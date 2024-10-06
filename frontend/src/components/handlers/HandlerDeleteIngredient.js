import axiosInstance from "../../../axios.config";

export const deleteIngredient = async (id) => {
  try {
    const response = await axiosInstance.delete(`ms_ingredient/${id}`);
    console.log(response.status);
    return response.status;
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    throw error;
  }
};
