import { useState, useCallback } from "react";

export enum AsyncStatus {
  IDLE = "IDLE",
  REFRESHING = "REFRESHING",
  PENDING = "PENDING",
  RESOLVED = "RESOLVED",
  ERROR = "ERROR",
}

interface useAsyncProps<T> {
  defaultState: T | null;
  asyncFunction: () => Promise<T>;
}

interface UseAsyncReturn<T> {
  data: T | null;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
  status: AsyncStatus;
  error: Error | null;
  execute: () => Promise<void>;
  refresh: () => Promise<void>;
}

const useAsync = <T>({ defaultState = null, asyncFunction }: useAsyncProps<T>): UseAsyncReturn<T> => {
  const [data, setData] = useState<T | null>(defaultState);
  const [status, setStatus] = useState<AsyncStatus>(AsyncStatus.IDLE);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Execute the initial async function
   * @returns Promise<void>
   */
  const execute = useCallback(async () => {
    setStatus(AsyncStatus.PENDING);
    setError(null);
    try {
      const response = await asyncFunction();
      setData(response);
      setStatus(AsyncStatus.RESOLVED);
    } catch (err) {
      setError(err as Error);
      setStatus(AsyncStatus.ERROR);
    }
  }, [asyncFunction]);

  /**
   * Refresh the data by calling the async function again
   * It does not change the status to PENDING
   * @returns Promise<void>
   */
  const refresh = useCallback(async () => {
    setStatus(AsyncStatus.REFRESHING);
    setError(null);
    try {
      const response = await asyncFunction();
      setData(response);
      setStatus(AsyncStatus.RESOLVED);
    } catch (err) {
      setError(err as Error);
      setStatus(AsyncStatus.ERROR);
    }
  }, [asyncFunction]);

  return { data, setData, status, error, execute, refresh };
};

export default useAsync;
