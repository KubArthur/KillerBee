import axiosInstance from "../../../axios.config";

export const deleteModele = async (id) => {
  try {
    const response = await axiosInstance.delete(`ms_modele/${id}`);
    console.log(response.status);
    return response.status;
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    throw error;
  }
};
