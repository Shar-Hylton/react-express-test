import { validPasswordMsg } from "@/constants/index.js";

export function validateEmail(email: string): boolean {
    if (!email.trim()) return false;
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return regex.test(email.trim());
  };

export function validatePassword (password: string): {success: boolean, message?:string}{
    if (!password) return {success: false, message: validPasswordMsg[0]};
    if (password.length < 8) return {success: false, message: validPasswordMsg[0]};
    if (!/[A-Z]/.test(password)) return {success: false, message: validPasswordMsg[1]};
    if (!/[0-9]/.test(password)) return {success: false, message: validPasswordMsg[2]};
    if (!/[^A-Za-z0-9]/.test(password)) return {success: false, message: validPasswordMsg[3]};
    return {success: true, message: undefined};
    
  };

export function validateUsername (username: string): boolean {
    if (!username) return false;
    if (username.length <= 3 || username.length > 15 ) return false;

    return true;
  };

 export function validateConfirmPassword (password: string, confirmPassword: string): boolean {
    if (!password || !confirmPassword) return false;  
    // if (confirmPassword !== password ) return false;
    const result = validatePassword(confirmPassword);
    if(!result.success) return false;
     return true;
  }; 
