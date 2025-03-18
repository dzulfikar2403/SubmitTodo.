"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";

const InputImage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [listImage, setListImage] = useState<string[]>([]);

  const handleInputRef = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (e: any) => {
    const images = e.target.files;
    setListImage([])

    if (!images) {
      return
    };

    for (const img of images) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        setListImage((prev) => [...prev, fileReader.result as string]);
      };

      fileReader.readAsDataURL(img);
    }
  };

  return (
    <div>
      <label htmlFor="image" className="block font-semibold">
        Images
      </label>
      <div className="flex gap-2 my-2">{listImage && listImage.map((el, i) => <Image key={i} src={el} alt={"img-" + i} width={160} height={160} className="object-center object-cover bg-white shadow-xl" />)}</div>
      <input type="file" ref={inputRef} name="image" id="image" className="hidden" onChange={handleImageChange} multiple accept="image/png, image/jpeg" />
      <button type="button" onClick={handleInputRef} className="px-2 py-1 my-1 text-gray-500 bg-gray-50 border-2 border-black transition-all hover:bg-gray-200">
        Choose Images
      </button>
    </div>
  );
};

export default InputImage;
