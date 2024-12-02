import { toast } from "sonner";

const toastStyles = {
  success: {
    backgroundColor: "#ffffff",
    color: "#4CAF50",
    borderColor: "#4CAF50",
    borderWidth: "3px",
  },
  warning: {
    backgroundColor: "#ffffff",
    color: "#FFC107",
    borderColor: "#FFC107",
    borderWidth: "3px",
  },
  error: {
    backgroundColor: "#ffffff",
    color: "#F44336",
    borderColor: "#F44336",
    borderWidth: "3px",
  },
};

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    style: toastStyles.success,
  });
};

export const showWarningToast = (message: string) => {
  toast.warning(message, {
    style: toastStyles.warning,
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    style: toastStyles.error,
  });
};
