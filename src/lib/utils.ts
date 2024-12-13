import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseURL() {
  return process.env.NEXT_PUBLIC_URL ?? "https://keen-vision-437710-j9.nw.r.appspot.com";
}
