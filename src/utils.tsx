export const convertDate = (date: any) => {
  return new Date(date).toLocaleDateString().split(".").reverse().join("-");
};
