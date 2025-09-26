
export type ApiResponse<T> = {
  status: number;
  message: string;
  data?: T | null;
  token?: string | null;
  timestamp: string; // LocalDateTime → string ISO
  path: string;
};
