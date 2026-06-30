"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useRef,
} from "react";
// import { usePathname } from "next/navigation";
import type { User } from "@/types/dataTypes";

type UserData = {
  email: string;
  password: string;
};

type RegisteredUser = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userRegistration: (
    userData: RegisteredUser,
  ) => Promise<{ success: boolean; message: string }>;
  login: (userData: User) => void;
  userLogin: (data: UserData) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<{ success: boolean; message: string }>;
  refreshAuth: (options?: { background?: boolean }) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const refreshController = useRef<AbortController | null>(null);
  // const pathname = usePathname();

  // const router = useRouter();

  const refreshAuth = useCallback(
    async (options?: { background?: boolean }) => {
      if (refreshController.current) {
        refreshController.current.abort();
      }

      const controller = new AbortController();
      refreshController.current = controller;

      if (!options?.background) {
        setIsLoading(true);
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/me`,
          {
            credentials: "include",
            signal: controller.signal,
          },
        );

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        console.log(error);
        setUser(null);
      } finally {
        if (!options?.background) {
          setIsLoading(false);
        }
      }
    },
    [],
  );

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  // useEffect(() => {
  //   if (!isLoading && user) {
  //     refreshAuth({ background: true });
  //   }
  // }, [pathname, isLoading, user, refreshAuth]);

  useEffect(() => {
    return () => {
      refreshController.current?.abort();
    };
  }, []);

  const userRegistration = async (data: RegisteredUser) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
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

      setUser(resData.newUser);
      return {
        success: true,
        message: "log in successful",
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "System Failure, try again later. ",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const login = (userData: User) => {
    setUser(userData);
  };

  const userLogin = async (data: UserData) => {
    try {
      console.log("Submitting login request");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
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

      await refreshAuth();

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
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );
      const resData = await response.json();

      if (!response.ok) {
        const errMsg = resData?.msg;
        console.log("Logout failed");
        return { success: false, message: errMsg };
      }

      sessionStorage.removeItem("notes_cache");
      setUser(null);

      return {
        success: true,
        message: resData?.msg || "Successfully logged out",
      };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Server Error" };
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    userRegistration,
    userLogin,
    login,
    logout,
    refreshAuth,
  };
  return (
    <AuthContext.Provider value={value}>
      {isLoading ? null : children}
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
