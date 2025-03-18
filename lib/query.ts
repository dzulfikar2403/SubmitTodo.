'use server'
import { GetUser, getUser } from "./auth/helper";
import { query } from "./db";

type PostTodoType = {
  slug:string
  title:string
  content:string|null
  image_url:string|null
  user_id:number
  type_id:number
  priority_id:number
}

export async function getAllTodo(){
  const user = await getUser() as GetUser;
  
  const res = await query('select * from todo inner join users on todo.user_id = users.id where users.id = $1',[user.id ]);
  return res;
}

export async function getListTypeByUsers(){
  const user = await getUser() as GetUser;
  
  const res = await query('select type.id,type."name" from "type" inner join users on type.user_id = users.id where users.id = $1',[user.id]);
  return res;
}

export async function getAllPriority(){
  const res = await query('select * from priority',[]);
  return res;
}

export async function postTodo({slug,title,content,image_url,user_id,type_id,priority_id}:PostTodoType){
  const res = await query('insert into todo(is_active,slug,title,"content",status,image_url,user_id,type_id,priority_id) values(true,$1,$2,$3,\'in progress\',$4,$5,$6,$7)',[slug,title,content,image_url,user_id,type_id,priority_id]);
  
  // return type commandnya dan total row yang berubah
  return {command: res?.command,rowCountChanges: res?.rowCount}
}

export async function postType(type:string){
  const user = await getUser() as GetUser;
  
  const res = await query('insert into type("name",user_id) values($1,$2)',[type,user.id])
  // return type commandnya dan total row yang berubah
  return {command: res?.command,rowCountChanges: res?.rowCount}
}