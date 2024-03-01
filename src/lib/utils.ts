import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const contract_address = "0x37df22C1288D8F44d1A1884f6013D3e9FA136214";
