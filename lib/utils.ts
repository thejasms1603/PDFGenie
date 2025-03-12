import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function convertToAscii(inputStr: string): string {
  return inputStr
    .split('')
    .map(char => char.charCodeAt(0))
    .join(' ');
}

