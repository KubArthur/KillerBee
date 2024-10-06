import axiosInstance from "../../../axios.config";
import { encrypt, decrypt } from "../../encryption";

export const postUserLogin = async (data) => {
  try {
    const response = await axiosInstance.post(`/mc_auth`, encrypt(data));

    const decryptedResponse = decrypt(response.data);

    const trimmedResponse = decryptedResponse.slice(1, -1);
    
    console.log("test", trimmedResponse);

    localStorage.setItem("accessToken", trimmedResponse);
    return trimmedResponse;
  } catch (error) {
    console.error("Error connection:", error);
    throw error;
  }
};
