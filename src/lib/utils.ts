import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const contract_address = "0xb02e7e27494069808f599192bd6cf63a9c052e86";
