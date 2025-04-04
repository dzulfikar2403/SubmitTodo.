import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt, updateCookies} from "./lib/auth/helper";

const publicRoute = ['/login','/register','/','/about','/pricing']

export async function middleware(req:NextRequest) {
  const token = (await cookies()).get('token')?.value;
  const currentPath = req.nextUrl.pathname;
  const user = await decrypt(token as string);
  

  // cek klo ngk ada user id dan cek klo lagi di private route = tendang
  if(!user?.payload.id && !publicRoute.includes(currentPath)){
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
  
  // cek klo ada user dan lagi di public route
  if(user?.payload.id && publicRoute.slice(0,2).includes(currentPath)){
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  const response = NextResponse.next();
  await updateCookies(response)
  return response
}

export const config = {
  // akan berjalan di semua route, kecuali route yang berawalan: _next/static,_next/image,icon,image
  matcher: ["/((?!_next/static|_next/image|icon|image).*)"],
};