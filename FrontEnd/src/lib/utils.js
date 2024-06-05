  import { clsx } from "clsx"
  import { twMerge } from "tailwind-merge"

  export function cn(...inputs) {
    return twMerge(clsx(inputs))
  }

  export function capitalizeFirstLetter(string) {
    if (!string) return ''; 
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const isProduction = window.location.hostname !== 'localhost';
 export  const domain = isProduction 
    ? 'https://edukids-server-1.vercel.app/' 
    : 'http://localhost:1234';
  
  const loginUrl = `${domain}/profesor/iniciarsesion`;
  
  console.log(loginUrl);