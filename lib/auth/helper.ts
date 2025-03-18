'use server'
import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export type GetUser = {
  id: number,
  username: string,
  email: string,
  iat: number,
  exp: number
}

const secretKey = process.env.JWT_SECRET
const key = new TextEncoder().encode(secretKey)
const alg = 'HS256'

export async function encrypt(data:any) { //parameter data, meminta sebuah data berupa object.
  return await new SignJWT(data)
  .setProtectedHeader({alg})
  .setIssuedAt()
  .setExpirationTime('15m') //15 menit
  .sign(key)
}

export async function decrypt(token:string){
  try {
    const res = await jwtVerify(token,key,{
      algorithms: [alg]
    });

    return res
  } catch (error) {
    return null
  }
}

export async function createCookies(dataUser:any) { //parameter dataUser, meminta sebuah dataUser berupa object.
  const token = await encrypt(dataUser);
  

  (await cookies()).set('token',token,{
    secure: true,
    httpOnly: true,
    maxAge: 60 * 15, //15menit
    path: '/'
  })

  redirect('/dashboard')
}

export async function updateCookies(res:NextResponse){
  const token = (await cookies()).get('token')?.value;
  const user = await decrypt(token as string);

  if(!token || !user?.payload.id){
    return null
  }

  const dataUser = { id: user.payload.id, username: user.payload.username, email: user.payload.email };
  const validateUser = await encrypt(dataUser);

  res.cookies.set('token',validateUser,{
    secure: true,
    httpOnly: true,
    maxAge: 60 * 15, //15menit
    path: '/'
  })
}

export async function deleteCookies(){
  (await cookies()).delete('token');

  redirect('/login')
} 

export async function getUser(){
  const token = (await cookies()).get('token')?.value;
  const resDecrypt = await decrypt(token as string)

  return resDecrypt?.payload
}