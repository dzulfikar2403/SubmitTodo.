import { LoaderCircle } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full mx-auto flex justify-center items-center">
      <LoaderCircle size={24} className="animate-spin duration-500" />
    </div>
  );
};

export default Loading;
