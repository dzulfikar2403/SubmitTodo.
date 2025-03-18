import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImageTodo(images: File[],idUser:number,username:string) {
  const res = await Promise.all(
    images.map(async (img) => {
      const arrayBufferImg = await img.arrayBuffer();
      const stringBase64 = Buffer.from(arrayBufferImg).toString("base64");
      const mimeType = img.type;
      const dataUrl = `data:${mimeType};base64,${stringBase64}`;

      const cloudinaryRes = await cloudinary.uploader.upload(dataUrl,{
        public_id: `${img.name.slice(0,-4)}_${Date.now()}`,
        folder: `submitTodo/${idUser}-${username}`,
        eager: [{width: 500,fetch_format: "auto",quality: "auto",crop: "fill"}]
      })

      return cloudinaryRes.eager[0].secure_url;
    })
  );

  return res;
}
