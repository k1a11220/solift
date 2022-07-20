export const useDate = (date: Date) => {
  return date.toISOString().split("T")[0].replaceAll("-", "/");
};
