import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400","700"]
})

export const metadata: Metadata = {
  title: "SubmitTodo.",
  description: "Kelola tugas harian Anda dengan mudah menggunakan aplikasi To-Do berbasis web. Tambahkan, edit, dan tandai pekerjaan Anda dengan cepat. Dilengkapi fitur filter Type  dan antarmuka minimalis untuk membantu Anda tetap produktif setiap hari. Credit Icon “Designed by Freepik”",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
