import Navbar from "@/components/Navbar";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import React from "react";
// import img from '@/public/images/person-ilustrator.jpg'

const AboutPage = () => {
  return (
    <div>
      <Navbar />

      <main className="w-full p-[2rem]">
        <div className="flex">
          <h1 className="text-7xl w-3/4 font-bold">I REALLY LOVE TO GET THINGS DONE</h1>
          <div className="relative w-[20rem] h-[20rem]">
            <Image src={"/images/person-ilustrator.jpg"} alt="image" fill />
          </div>
        </div>
        <div className="flex gap-[10rem] py-8">
          <div className="w-32 self-end">
            <p className="font-extrabold border-b-2 border-black">Follow us</p>
            <p className="border-b-2 border-black flex justify-between items-center py-1">
              Instagram <ArrowUpRight size={18} />
            </p>
            <p className="border-b-2 border-black flex justify-between items-center py-1">
              Linkedin <ArrowUpRight size={18} />
            </p>
          </div>
          <div className="flex gap-4 items-center ">
            <p className="first-letter:uppercase first-letter:font-bold first-letter:text-3xl">
              Welcome to your ultimate To-Do companion! Stay organized, manage your daily tasks, and achieve your goals with ease. Our simple and effective task manager helps you prioritize what matters most. <br />
              <br /> Plan your day, track your progress, and never miss a deadline again. Whether it’s work, study, or personal life — we’ve got you covered.
            </p>
            <div>
              <p className="font-bold">"Since using this To-Do app, I finally keep my schedule under control and feel more productive than ever. The clean design and smart features make it my daily essential!"</p>
              <p className="mt-4 underline underline-offset-4">Cynthia Summer</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
