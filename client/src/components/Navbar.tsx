"use client";

import { useState } from "react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
import { RiQuillPenAiLine } from "react-icons/ri";
import { FaCircleUser } from "react-icons/fa6";
import { toast } from "react-toastify";

export default function Navbar() {
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const handleLogOut = async () => {
    const result = await logout();
    if(!result.success){
      toast.error(result.message);
      return;
    } 
    toast.success(result.message);
    setMobileMenuOpen(false);
    
  };

  return (
    <header className="fixed top-0 bg-white border-b border-gray-400/30 w-full z-20">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Home</span>
           <RiQuillPenAiLine size={40} aria-label="log in button"/>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-800"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Link href="/notes" className="text-sm/6 font-semibold text-gray-800">
            Notes
          </Link>

          <Link href="#" className="text-sm/6 font-semibold text-gray-800">
            About
          </Link>

          <Link href="#" className="text-sm/6 font-semibold text-gray-800">
            Help
          </Link>
        </PopoverGroup>
        
        <div className="hidden lg:flex lg:flex-1 items-center lg:justify-end">

          <div className="bg-amber-200 mx-16 rounded-2xl">
          
          {user && (
            <p className="text-black capitalize p-2">
              Hi {user.username}
            </p>
          )}
  
        </div>
        {isAuthenticated ? (
          
            <Button
              onClick={handleLogOut}
              disabled={isLoading}
              className="text-sm/6 font-semibold btn-blue"
            >
              {isLoading ? "Signing out..." : "Log out"}
            </Button>
          
        ) : (
          <>
            <Link
              href="/auth/login"
            >
              <FaCircleUser color={"gray"} aria-details="log in" size={30} />
            </Link>

            </>
          
        )}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Notes</span>
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 cursor-pointer rounded-md p-2.5 text-gray-800"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-200">
              <div className="space-y-2 py-6">
                <Link
                  href="/notes"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-800 hover:bg-gray-50"
                >
                  Notes
                </Link>
                <Link
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-800 hover:bg-gray-50"
                >
                  About
                </Link>
                <Link
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-800 hover:bg-gray-50"
                >
                  Help
                </Link>
              </div>
              <div className="py-6">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogOut}
                    disabled={isLoading}
                    className="-mx-3 block cursor-pointer rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-800 hover:bg-gray-50"
                  >
                    {isLoading ? "Signing out..." : "Log out"}
                  </button>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-800 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      href="/auth/register"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-800 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
                <div>
                  {user && (
                    <p className="text-md text-zinc-500 capitalize">
                      username: {user.username}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}