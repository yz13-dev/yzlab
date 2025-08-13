import Axios, { type AxiosError, type AxiosRequestConfig } from 'axios';



const baseURL = "https://api.yz13.ru";

export const AXIOS_INSTANCE = Axios.create({ baseURL }); // use your own URL here or environment variable



// add a second `options` argument here if you want to pass extra options to each generated query

export const axios = <T>(

  config: AxiosRequestConfig,

  options?: AxiosRequestConfig,

): Promise<T> => {

  const source = Axios.CancelToken.source();

  const headers = {
    ...config.headers,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    headers,
    cancelToken: source.token,

  }).then((data) => {
    return data
  });




  // @ts-ignore

  promise.cancel = () => {

    source.cancel('Query was cancelled');

  };



  return promise;

};



// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this

export type BodyType<BodyData> = BodyData;
export type ErrorType<Error> = AxiosError<Error>;

// Or, in case you want to wrap the body type (optional)

// (if the custom instance is processing data before sending it, like changing the case for example)

// export type BodyType<BodyData> = CamelCase<BodyData>;
