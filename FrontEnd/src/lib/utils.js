import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(string) {
  if (!string) return ''; 
  return string.charAt(0).toUpperCase() + string.slice(1);
}


export const user = JSON.parse(localStorage.getItem('user'))
export const isStudent = user.isStudent
export const className = isStudent ? "hidden" : "block";