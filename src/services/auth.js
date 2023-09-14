import axios from "axios";
import { EGORAS_PAY_URL } from "../core/constants";
import { LOGIN } from "../core/ApiRoutes";
import { CustomResponse } from "../utils/CustomResponse";

export const LOGIN_USER = async (payload) => {
  /**
     * 
     *      Map<String, String> data = {
            "email": email,
            "password": password,
            "brand": map['brand'] ?? map['localizedModel'],
            "model": map['model'],
            "ipv4": ipv4,
          };
     */
  try {
    const response = await axios.post(`${EGORAS_PAY_URL}/${LOGIN}`, payload);

    return CustomResponse({ code: response.status, data: response.data });
  } catch (error) {
    CustomResponse({ code: 500, error });
  }
};
