"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";

import type { User, LoginCredentials, RegisterCredentials } from "@/types/dataTypes";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userRegistration: (
    userData: RegisterCredentials,
  ) => Promise<{ success: boolean; message: string }>;
  // login: (userData: User) => void;
  userLogin: (data: LoginCredentials) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<{ success: boolean; message: string }>;
  // refreshAuth: (options?: { background?: boolean }) => Promise<void>;
  refreshAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const test = false;
  const deployURL = process.env.NEXT_PUBLIC_SERVER_URL;
  const localURL = process.env.NEXT_PUBLIC_SERVER_URL_TEST;
  const url = test ? localURL : deployURL;
  // Changing from session to JWT

  const refreshAuth = useCallback(async () => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        return;
      }

      const response = await fetch(
        `${url}/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        localStorage.removeItem("token");
        setUser(null);
        return;
      }

      const data = await response.json();
      setUser(data.user);
    } catch (err) {
      console.error(err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  // const refreshAuth = useCallback(
  //   async (options?: { background?: boolean }) => {
  //     if (refreshController.current) {
  //       refreshController.current.abort();
  //     }

  //     const controller = new AbortController();
  //     refreshController.current = controller;

  //     if (!options?.background) {
  //       setIsLoading(true);
  //     }

  //     try {
  //       const res = await fetch(
  //         `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/me`,
  //         {
  //           credentials: "include",
  //           signal: controller.signal,
  //         },
  //       );

  //       if (!res.ok) {
  //         setUser(null);
  //         return;
  //       }

  //       const data = await res.json();
  //       setUser(data.user);
  //     } catch (error: unknown) {
  //       if (error instanceof DOMException && error.name === "AbortError")
  //         return;
  //       console.log(error);
  //       setUser(null);
  //     } finally {
  //       if (!options?.background) {
  //         setIsLoading(false);
  //       }
  //     }
  //   },
  //   [],
  // );

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  // useEffect(() => {
  //   return () => {
  //     refreshController.current?.abort();
  //   };
  // }, []);

  const userRegistration = async (data: RegisterCredentials) => {
    try {
      const response = await fetch(
        `${url}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // credentials: "include",
          body: JSON.stringify(data),
        },
      );
      const resData = await response.json();

      if (!response.ok) {
        const errMsg = resData?.errors[0]?.msg ?? "Request failed";
        return {
          success: false,
          message: errMsg,
        };
      }
      console.log("log in successful");
      localStorage.setItem("token", resData.token);
      setUser(resData.user);
      return {
        success: true,
        message: resData.msg,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "System Failure, try again later. ",
      };
    }
  };

  const userLogin = async (data: LoginCredentials) => {
    try {
      console.log("Submitting login request");
      const response = await fetch(
        `${url}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // credentials: "include",

          body: JSON.stringify(data),
        },
      );
      const resData = await response.json();

      console.log("Response received:", response.status);

      if (!response.ok) {
        const errMsg = resData?.errors?.[0]?.msg ?? "Request failed";

        return {
          success: false,
          message: errMsg,
        };
      }

      // await refreshAuth();

      localStorage.setItem("token", resData.token);
      setUser(resData.user);

      return {
        success: true,
        message: resData?.msg || "Login successful",
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "System Failure, try again later.",
      };
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");

    setUser(null);
    return {
      success: true,
      message: "Logged out",
    };

    // Old Session Log out
    // try {
    //   const response = await fetch(
    //     `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`,
    //     {
    //       method: "POST",
    //       credentials: "include",
    //     },
    //   );
    //   const resData = await response.json();

    //   if (!response.ok) {
    //     const errMsg = resData?.msg;
    //     console.log("Logout failed");
    //     return { success: false, message: errMsg };
    //   }

    //   sessionStorage.removeItem("notes_cache");
    //   setUser(null);

    //   return {
    //     success: true,
    //     message: resData?.msg || "Successfully logged out",
    //   };
    // } catch (error) {
    //   console.log(error);
    //   return { success: false, message: "Server Error" };
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    userRegistration,
    userLogin,
    logout,
    refreshAuth,
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
      {/* {isLoading ? null : children} */}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
