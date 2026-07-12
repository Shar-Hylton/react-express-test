import { TiArrowForwardOutline } from "react-icons/ti";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { intro } from "@/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Home() {
  useGSAP(() => {
    gsap.fromTo(
      "h1",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1.5,
        ease: "power2.inOut",
      },
    );
   
  });

  const router = useRouter();

  const handleClick = () => {
    router.push("/notes");
  };
  return (
    <main className="mobile-friendly flex w-full max-w-3xl flex-col items-center justify-between bg-zinc-250 dark:bg-black ">
      <div>
      <h1 className="text-center py-16 text-zinc-100">
        Welcome To My Notes Project
      </h1>
      </div>
      <br />
      <div className="text-transition">
        <p className="text-p text-motion">
        {intro.map((word)=>(
          word
        ))}
      </p>

      </div>
      
      <div className=" flex mt-8 h-10">
        <Button
          variant="none"
          className="btn-blue mb-4 btn-float my-4 mx-auto items-center justify-center"
          onClick={handleClick}
        >
          
          <TiArrowForwardOutline /> Notes Page
        </Button>
      </div>
    </main>
  );
}
