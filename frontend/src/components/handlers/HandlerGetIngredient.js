import axiosInstance from "../../../axios.config";
import { decrypt } from "../../encryption";

export const getIngredients = async () => {
  try {
    const response = await axiosInstance.get("ms_ingredient");

    const decryptedResponse = decrypt(response.data);
    const responseJson = JSON.parse(decryptedResponse);
    
    return responseJson;
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    throw error;
  }
};
