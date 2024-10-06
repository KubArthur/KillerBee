import axiosInstance from "../../../axios.config";
import { encrypt, decrypt } from "../../encryption";

export const postModele = async (data) => {
  try {
    const response = await axiosInstance.post(
      "ms_modele/create",
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
