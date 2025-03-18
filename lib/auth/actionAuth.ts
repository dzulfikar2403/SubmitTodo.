"use server";
import { redirect } from "next/navigation";
import { query } from "../db";
import { loginSchema, registerSchema } from "./definition";
import bcrypt from "bcrypt";
import { createCookies } from "./helper";

export async function handleRegister(prev: any, formData: FormData) {
  const validationForm = registerSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validationForm.success) {
    return { errors: validationForm.error?.formErrors.fieldErrors };
  }

  const { username, email, password, confirmPassword } = validationForm.data;

  const checkEmail = await query("select * from users where email = $1", [email]);

  if (email === checkEmail?.rows[0]?.email) {
    return { errors: "Email is already exists." };
  }

  if (confirmPassword !== password) {
    return { errors: "password & confirm-password, didn't matches." };
  }

  // hash pw
  const hashPassword = await bcrypt.hash(password, 10);

  // insert to db
  await query('insert into users(username,email,password) values($1,$2,$3)',[username,email,hashPassword]);
  return { message: "Data Registered."};
}

export async function handleLogin(prev: any, formData: FormData) {
  const validationForm = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  })
  
  if(!validationForm.success){
    return {errors: validationForm.error.formErrors.fieldErrors}
  }

  const {email,password} = validationForm.data;
  const user = await query('select * from users where email = $1',[email])

  // cek klo emailnya ngk sama
  if(email !== user?.rows[0]?.email){
    return {errors: 'invalid credentials'}
  }

  const comparePassword = await bcrypt.compare(password,user.rows[0].password);
  
  if(!comparePassword){
    return {errors: 'invalid credentials'}
  }

  // create jwt & set on cookies, then redirect
  await createCookies({ id: user.rows[0].id, username: user.rows[0].username, email: user.rows[0].email })
}
