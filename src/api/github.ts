import axios, { AxiosResponse } from "axios";

const gitHubRequest = axios.create({
  baseURL: "https://api.github.com/",
});

// Attach GitHub token if provided via Vite env (VITE_GITHUB_TOKEN)
gitHubRequest.interceptors.request.use((config) => {
  const token = import.meta.env?.VITE_GITHUB_TOKEN as string | undefined;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  // Recommended by GitHub for identifying your app and to get better rate limits
  config.headers = config.headers ?? {};
  if (!config.headers["Accept"]) config.headers["Accept"] = "application/vnd.github+json";
  if (!config.headers["X-GitHub-Api-Version"]) config.headers["X-GitHub-Api-Version"] = "2022-11-28";
  return config;
});

export const apiGetUserData = (
  name: string
): Promise<AxiosResponse<TApiUserDataRes>> => {
  return gitHubRequest.get(`/users/${name}`);
};

export const apiGetRepos = (
  name: string,
  page: number,
  per_page: number
): Promise<AxiosResponse<TApiReopsRes[]>> => {
  return gitHubRequest.get(
    `/users/${name}/repos?page=${page}&per_page=${per_page}&sort=pushed`
  );
};
