import axios from "axios";
import * as USER_HELPERS from "../utils/userToken";
import { internalServerError, successStatus } from "./auth";

const checkInService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api/check-in`,
  headers: { Authorization: USER_HELPERS.getUserToken() },
});

/**
 * Creat and send the check in to the backend 
 *
 * @param {{startDate: Date}} clockIn
 * @returns {{status: boolean,data: Object,errorMessage:string}} response where data os the object we just create 
 */
export async function registerStartHour(clockIn) {
  try {
    const response = await checkInService.post("/start", clockIn, {
      headers: { Authorization: USER_HELPERS.getUserToken() },
    });
    return successStatus(response);
  } catch (err) {
    return internalServerError(err);
  }
}

/**
 * Return a check in still opens
 *
 * @returns {{status: boolean,data: Object,errorMessage:string}} response where data is an object with the check in open status 
 */

export async function getMyCheckIn() {
  try {
    const responseMyCheckIn = await checkInService.get(
      "/get-current-clock-in",
      {
        headers: { Authorization: USER_HELPERS.getUserToken() },
      }
    );

    return successStatus(responseMyCheckIn);
  } catch (err) {
    return internalServerError(err);
  }
}

/**
 * Return all the check-in done 
 *
 * @returns {{status: boolean,data: Array,errorMessage:string}} response where data is an array with all the user's clock in 
 */

export async function getAllMyClocks() {
  try {
    const responseAllMyClocks = await checkInService.get("/get-all-my-clocks", {
      headers: { Authorization: USER_HELPERS.getUserToken() },
    });
    return successStatus(responseAllMyClocks);
  } catch (err) {
    return internalServerError(err);
  }
}

/**
 * Update the open check-in in the backend 
 *
 * @param {string} id
 * @param {{endDate:Date}} clockOut
 * @returns {{status: boolean,data: Object,errorMessage:string}} response where data is the object we just updated 
 */
export async function registerEndHour(id, clockOut) {
  try {
    const response = await checkInService.patch(`/end/${id}`, clockOut,{
      headers: { Authorization: USER_HELPERS.getUserToken() },
    });
    return successStatus(response);
  } catch (err) {
    return internalServerError(err);
  }
}
