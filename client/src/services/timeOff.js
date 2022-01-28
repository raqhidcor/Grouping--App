import axios from "axios";
import * as USER_HELPERS from "../utils/userToken";
import { internalServerError, successStatus } from "./auth";

const timeOffService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api/time-off`,
  headers: { Authorization: USER_HELPERS.getUserToken() },
});

/**
 * Create and send the holidays request to the backend 
 *
 * @param {{starDate: Date, endDate: Date, summary: string, type: string}} timeOff type from "Holidays", "Illness", "Maternity / Paternity","Other"
 * @returns {{status: boolean,data: Object,errorMessage:string}} response where data is the object we just created 
 */
export async function createTimeOff(timeOff) {
  try {
    const response = await timeOffService.post("/create", timeOff,{
      headers: { Authorization: USER_HELPERS.getUserToken() },
    });
    return successStatus(response);
  } catch (err) {
    return internalServerError(err);
  }
}

/**
 * find the request and updated it to true ---> approved 
 * @param {string} timeOffId
 * @returns {{status: boolean,data: Object,errorMessage:string}} response where data is the object we just updated  
 */
export async function approveTimeOff(timeOffId) {
  try {
    const response = await timeOffService.post(`/approve/${timeOffId}`, {
      headers: { Authorization: USER_HELPERS.getUserToken() },
    });
    return successStatus(response);
  } catch (err) {
    return internalServerError(err);
  }
}

/**
 * find the request and updated it to false ---> denied  la solicitud y pasa a false approved
 * @param {string} timeOffId
 * @returns {{status: boolean,data: Object,errorMessage:string}} response where data is the object we just updated 
 */
export async function denyTimeOff(timeOffId) {
  try {
    const response = await timeOffService.post(`/deny/${timeOffId}`,{
      headers: { Authorization: USER_HELPERS.getUserToken() },
    });
    return successStatus(response);
  } catch (err) {
    return internalServerError(err);
  }
}

/**
 * find the request and deleted it 
 * @param {string} timeOffId
 * @returns {{status: boolean,data: Object,errorMessage:string}} response where data is the object we just updated 
 */
export async function deleteTimeOff(timeOffId) {
  try {
    const response = await timeOffService.post(`/delete/${timeOffId}`,{
      headers: { Authorization: USER_HELPERS.getUserToken() },
    });
    return successStatus(response);
  } catch (err) {
    return internalServerError(err);
  }
}
