import { useMutation } from "@/hooks";
import { DataResponse } from "@/models/api";

export type TaskParams = {
  type: {
    action: string;
    key: string;
    id: number;
  };
  by: string;
};
export const useUpdateTask = () => {
  return useMutation<DataResponse<any>, Error, TaskParams>(["update_task"], {
    url: `/line-send`,
    method: "POST",
  });
};
