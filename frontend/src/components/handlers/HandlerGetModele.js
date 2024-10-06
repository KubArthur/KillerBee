import axiosInstance from "../../../axios.config";
import { decrypt } from "../../encryption";

export const getModeles = async () => {
  try {
    const response = await axiosInstance.get("ms_modele");

    const decryptedResponse = decrypt(response.data);
    const responseJson = JSON.parse(decryptedResponse);
    
    return responseJson;
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    throw error;
  }
};