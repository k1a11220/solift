export const useDate = (date: Date) => {
  return date.toString().split("T")[0].replaceAll("-", "/");
};
