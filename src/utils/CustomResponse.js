export const CustomResponse = ({ data, message, error, code }) => {
  console.log(code);
  let isOk = Number(code) >= 200 && Number(code) < 300 ? true : false;
  console.log(isOk);
  if (isOk === true)
    return {
      isOk: true,
      data,
      message,
      error,
      code,
    };

  // if (error.name === "AxiosError") {
  //   return {
  //     isOk: false,
  //     message,
  //     error,
  //     code,
  //   };
  // }

  return {
    isOk: false,
    data: {},
    message,
    code,
  };
};
