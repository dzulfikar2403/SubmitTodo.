import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="w-full">
      {/* navbar */}
      <Navbar />      
      {/* close navbar */}

      {/* main section */}
      <section id="main" className="py-14 flex items-center justify-center flex-col text-center">
        <h1 className="text-5xl font-extrabold">
          Welcome to the fun side
          <br />
          of getting things done!
        </h1>
        <p className="py-4 text-slate-700">
          Plan your day, smash your goals, and keep life in check—without the stress. <br /> Let’s get started (it’s free)! 😎✅
        </p>
        <div className="flex items-center gap-4 py-4">
          <Link href={"/login"} className="p-2 bg-blue-400 text-white font-semibold rounded-md flex items-center gap-1">
            Get Started <ArrowRight size={14} />
          </Link>
          <Link href={"#"} className="p-2 bg-slate-400 text-white font-semibold rounded-md flex items-center gap-1">
            Learn More <ArrowRight size={14} />
          </Link>
        </div>
        <div className="flex items-center gap-8 py-2">
          <span className="flex items-center gap-2 text-xs"><Check size={12} />No credit card needed</span>
          <span className="flex items-center gap-2 text-xs"><Check size={12} />Free to use</span>
        </div>
      </section>
        <div className="w-4/5 h-[32rem] mx-auto mb-8 rounded-4xl bg-gradient-to-r from-blue-400 via-purple-400 to-red-400"></div>
    </div>
  );
}
