import { useContext } from "react";
import { StoreContext } from "./StoreContext.js";
export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("StoreProvider is required");
  return value;
}
