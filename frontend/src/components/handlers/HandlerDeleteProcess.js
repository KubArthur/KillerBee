import axiosInstance from "../../../axios.config";

export const deleteProcess = async (id) => {
  try {
    const response = await axiosInstance.delete(`ms_process/${id}`);
    console.log(response.status);
    return response.status;
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    throw error;
  }
};
