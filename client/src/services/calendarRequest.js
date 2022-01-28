import axios from "axios";
import * as USER_HELPERS from "../utils/userToken";
import { internalServerError, successStatus } from "./auth";

// creates a service for every request in this file
const calendarRequestService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api/calendar-requests`,
  headers: { Authorization: USER_HELPERS.getUserToken() },
});

/**
 *  Return all the requests made by the user 
 * @returns {{status: boolean,data: Array,errorMessage:string}} response where data is an array with all the user's requests
 */

export async function getMyRequests() {
  try {
    const responseAllMyRequests = await calendarRequestService.get("/all-mine" , {
      headers: { Authorization: USER_HELPERS.getUserToken() },
    });
    return successStatus(responseAllMyRequests);
  } catch (err) {
    return internalServerError(err);
  }
}
/**
 * 
 *  Return all the requests made by all the users of the company 
 * @param {string} companyId 
 * @returns {{status: boolean,data: Array,errorMessage:string}} response where data is an array of all the requests 
 */
export async function getAllRequests(companyId) {
  try {
    const responseAllRequests = await calendarRequestService.get(
      `/all/${companyId}`, {
        headers: { Authorization: USER_HELPERS.getUserToken() },
      }
    );
    return successStatus(responseAllRequests);
  } catch (err) {
    return internalServerError(err);
  }
}
