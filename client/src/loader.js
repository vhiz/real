import { apiRequest } from "./axios";
import { defer } from "react-router-dom";
export async function singleLoader({ request, params }) {
  const postResponse = apiRequest.get(`/post/${params.id}`);
  return defer({
    postResponse,
  });
}
export async function listLoader({ request, params }) {
  const query = request.url.split("?")[1];
  const postPromise = apiRequest.get(`/post?${query}`);
  return defer({
    postResponse: postPromise,
  });
}
export async function profileLoader() {
  const postPromise = apiRequest.get(`/user/profilePost`);
  const chatPromise = apiRequest.get(`/chat`);
  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise,
  });
}
