export function validateEmail(email: string): boolean {
    if (!email.trim()) return false;
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return regex.test(email.trim());
  };

export function validatePassword (password: string): boolean {
    if (!password) return false;
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[0-9]/.test(password)) return false;
    if (!/[^A-Za-z0-9]/.test(password)) return false
    return true;
  };

export function validateUsername (username: string): boolean {
    if (!username) return false;
    if (username.length <= 3 || username.length > 15 ) return false;

    return true;
  };

 export function validateConfirmPassword (password: string, confirmPassword: string): boolean {
    if (!password || !confirmPassword) return false;  
    if (confirmPassword !== password ) return false;

    return true;
  }; 
