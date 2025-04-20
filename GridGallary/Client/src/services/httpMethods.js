import { axiosInstance } from "./axiosInstance";
const onApiError = (error) => {
  if (error?.isAxiosError) {
    const response = error.response?.data;

    let message =
      response?.message || error.response?.statusText || error.message;

    if (response && response.exceptionType === "ValidationException") {
      message = response.description;
    }

    console.error("Axios error:", message);
  } else if (error instanceof Error) {
    console.error("Error:", error.message);
  }
  return Promise.reject(error);
};

// Generic GET function
export const getData = async (
  endpoint,
  customHeaders = { "Content-Type": "application/json" },
  withAuth = false
) => {
  return axiosInstance
    .get(endpoint, {
      headers: { ...customHeaders, ...(withAuth ? undefined : {}) },
      withCredentials: !!withAuth,
    })
    .then((response) => Promise.resolve(response.data))
    .catch(onApiError);
};

// Generic POST function
export const postData = async (
  endpoint,
  data,
  withAuth = false,
  customHeaders = { "Content-Type": "application/json" }
) => {
  return axiosInstance
    .post(endpoint, data, {
      headers: { ...customHeaders, ...(withAuth ? undefined : {}) },
      withCredentials: !!withAuth,
    })
    .then((response) => Promise.resolve(response.data))
    .catch(onApiError);
};

export const postProgressData = async (
  endpoint,
  data,
  customHeaders = { "Content-Type": "application/json" },
  withAuth = false,
  onUploadProgress
) => {
  const config = {
    headers: { ...customHeaders, ...(withAuth ? undefined : {}) },
    withCredentials: !!withAuth,
    onUploadProgress,
  };

  return axiosInstance
    .post(endpoint, data, config)
    .then((response) => Promise.resolve(response.data))
    .catch(onApiError);
};

// Generic UPDATE function
export const updateData = async (
  endpoint,
  data,
  customHeaders = { "Content-Type": "application/json" },
  withAuth = true
) => {
  return axiosInstance
    .put(endpoint, data, {
      headers: { ...customHeaders, ...(withAuth ? undefined : {}) },
    })
    .then((response) => Promise.resolve(response.data))
    .catch(onApiError);
};

// Generic DELETE function
export const deleteData = async (
  endpoint,
  id,
  customHeaders = { "Content-Type": "application/json" },
  withAuth = true
) => {
  const url = `${endpoint}/${id}`;

  return axiosInstance
    .delete(url, {
      headers: { ...customHeaders, ...(withAuth ? undefined : {}) },
    })
    .then(() => Promise.resolve())
    .catch(onApiError);
};

// DELETE with Request Body
export const deleteDataWithRequest = async (
  endpoint,
  data,
  customHeaders = { "Content-Type": "application/json" },
  withAuth = true
) => {
  return axiosInstance
    .delete(endpoint, {
      data,
      headers: { ...customHeaders, ...(withAuth ? undefined : {}) },
    })
    .then(() => Promise.resolve())
    .catch(onApiError);
};
