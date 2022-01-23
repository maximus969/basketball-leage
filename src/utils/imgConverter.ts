export const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const newData = (file: any, data: any, dispatch: any, thunk: any) => {
  getBase64(file).then((res) => {
    const imageUrl = res;
    if (typeof imageUrl === "string") {
      data = { ...data, imageUrl };
      dispatch(thunk(data));
    }
  });
};
