import axiosInstance from "../../../axios.config";
import { encrypt, decrypt } from "../../encryption";

export const putIngredient = async (data) => {
  try {
    const response = await axiosInstance.put(
      "ms_ingredient/update",
      encrypt(data)
    );

    const decryptedResponse = decrypt(response.data);
    const responseJson = JSON.parse(decryptedResponse);

    return responseJson;
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    throw error;
  }
};
