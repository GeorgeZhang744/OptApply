import { createContext } from "react";

type LoadingContextType = {
  loading: boolean;
  updateLoading: (newLoading: boolean) => void;
};

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);
