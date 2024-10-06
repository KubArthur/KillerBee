import axiosInstance from "../../../axios.config";
import { encrypt, decrypt } from "../../encryption";

export const putModele = async (data) => {
  try {
    const response = await axiosInstance.put(
      "ms_modele/update",
      encrypt(data)
    );

    const decryptedResponse = decrypt(response.data);
    const responseJson = JSON.parse(decryptedResponse);

    return responseJson;
  } catch (error) {
    console.error("Error fetching models:", error);
    throw error;
  }
};
