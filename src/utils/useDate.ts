import { format } from "date-fns";

export const useDate = (date: Date) => {
  return format(date, "yyyy/MM/dd");
};
