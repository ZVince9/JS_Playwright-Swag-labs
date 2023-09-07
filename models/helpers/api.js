import { expect } from "@playwright/test";
import { create } from "axios";

// create axios instance
const api_tests = create({
  baseURL: process.env.URL,
  timeout: 40000,
  headers: {
    "Content-type": "application/json",
    projectToken: process.env.TOKEN,
    Accept: "application/json",
  },
});

// get request to receive data
async function sentGet(url, data) {
  return await api_tests
    .get(url, data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// custom function to checkStatus on every request according
// to statusCode added inside function as parameter
async function checkStatus(endpoint, statusCode) {
  switch (statusCode) {
    case true:
      const trueResponse = await sentGet(endpoint);
      await expect(trueResponse.status).toEqual(200);
      await expect(trueResponse.data).not.toBeNull();
      break;
  }
}

export default { checkStatus, sendPost, sendDelete };
