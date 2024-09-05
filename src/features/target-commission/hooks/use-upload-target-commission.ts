import { apiClient } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { TargetCommission } from "../components/data-table/columns";

const validateUploadFile = async (
  file: File
): Promise<AxiosResponse<TargetCommission[], FormData>> => {
  const formData = new FormData();
  formData.append("file", file);

  return await apiClient.post("/target-commission/upload/validate", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

interface UseValidatedTargetCommissionUploadFileProps {
  onValidateSuccess: (data: TargetCommission[]) => void;
  onValidateError: (error: Error) => void;
}

export const useValidatedTargetCommissionUploadFile = ({
  onValidateSuccess,
  onValidateError,
}: UseValidatedTargetCommissionUploadFileProps) => {
  return useMutation({
    mutationFn: (file: File) => validateUploadFile(file),
    onSuccess: (reponse) => {
      onValidateSuccess(reponse.data);
    },
    onError: onValidateError,
  });
};

const uploadFile = async (
  file: File
): Promise<AxiosResponse<string, FormData>> => {
  const formData = new FormData();
  formData.append("file", file);

  return await apiClient.post("/target-commission/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

interface UseUploadTargetCommissionFileProps {
  onUploadSuccess: (data: string) => void;
  onUploadError: (error: Error) => void;
}

export const useUploadTargetCommissionFile = ({
  onUploadSuccess,
  onUploadError,
}: UseUploadTargetCommissionFileProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadFile(file),
    onSuccess: (reponse) => {
      queryClient.invalidateQueries({ queryKey: ["target-commission"] });
      onUploadSuccess(reponse.data);
    },
    onError: onUploadError,
  });
};
