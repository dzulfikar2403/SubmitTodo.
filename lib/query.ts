"use server";
import { notFound } from "next/navigation";
import { GetUser, getUser } from "./auth/helper";
import { query } from "./db";
import { cache } from "react";

export type Todo = {
  id: number;
  is_active: boolean;
  slug: string;
  title: string;
  content: string | null;
  status: "finish" | "in progress";
  image_url: string | null;
  user_id: number;
  type_id: number;
  priority_id: number;
  created_at: Date;
  updated_at: Date | null;
  username?: string;
  typename?: string;
  priority_level?: string;
};

type PostTodoType = {
  slug: string;
  title: string;
  content: string | null;
  image_url: string | null;
  user_id: number;
  type_id: number;
  priority_id: number;
};

export async function getAllTodo() {
  const user = (await getUser()) as GetUser;

  const res = await query(
    `select todo.*,users.username,type."name" as typename,priority.priority_level from todo
      inner join users on todo.user_id = users.id 
      inner join "type" on todo.type_id = type.id 
      inner join priority on todo.priority_id = priority.id
    where users.id = $1 and todo.is_active = true
    order by todo.id;`,
    [user.id]
  );
  return res;
}

export async function getTodoById(todoSlug:string) {
  const user = (await getUser()) as GetUser;

  const res = await query(
    `select todo.*,users.username,type."name" as typename,priority.priority_level from todo
      inner join users on todo.user_id = users.id 
      inner join "type" on todo.type_id = type.id 
      inner join priority on todo.priority_id = priority.id
    where users.id = $1 and todo.slug = $2`,
    [user.id,todoSlug]
  );
  return res;
}

export async function getAllCompletedTodo() {
  const user = (await getUser()) as GetUser;

  await new Promise((resolve, reject) => setTimeout(() => resolve("done"), 2000));
  const res = await query(
    `select todo.*,users.username,type."name" as typename,priority.priority_level from todo
      inner join users on todo.user_id = users.id 
      inner join "type" on todo.type_id = type.id 
      inner join priority on todo.priority_id = priority.id
      where users.id = $1 and todo.is_active = true and todo.status = 'finish'
    order by todo.id;`,
    [user.id]
  );
  return res;
}
export async function getAllTrashTodo() {
  const user = (await getUser()) as GetUser;

  await new Promise((resolve, reject) => setTimeout(() => resolve("done"), 2000));
  const res = await query(
    `select todo.*,users.username,type."name" as typename,priority.priority_level from todo
      inner join users on todo.user_id = users.id 
      inner join "type" on todo.type_id = type.id 
      inner join priority on todo.priority_id = priority.id
    where users.id = $1 and todo.is_active = false
    order by todo.id;`,
    [user.id]
  );
  return res;
}

export async function getAllTodoByType(typeName: string) {
  const user = (await getUser()) as GetUser;
  const queryTypeId = await query('select * from type where lower(type."name") = $1', [typeName]);

  //check if result length > 1, show id. if not throw to notFound page
  const typeId = (queryTypeId?.rows as any[]).length > 0 ? queryTypeId?.rows[0].id : notFound();

  const res = await query(
    `select todo.*,users.username,type."name" as typename,priority.priority_level from todo
      inner join users on todo.user_id = users.id 
      inner join "type" on todo.type_id = type.id 
      inner join priority on todo.priority_id = priority.id
    where users.id = $1 and todo.is_active = true and todo.type_id = $2 order by todo.id;`,
    [user.id, typeId]
  );
  return res;
}

export const getListTypeByUsers = cache(async function getListTypeByUsers() {
  const user = (await getUser()) as GetUser;
  
  const res = await query(
    `select type.id,type."name",users.id as userId,users.username from "type" 
      inner join users on type.user_id = users.id 
    where users.id = $1`,
    [user.id]
  );
  return res;
})

export async function getAllPriority() {
  const res = await query("select * from priority", []);

  return res;
}

export async function getPercentageCompletedByUser() {
  await new Promise((resolve, reject) => setTimeout(() => resolve("2000"), 2000));
  // await new Promise((resolve, reject) => setTimeout(() => resolve("done"), 2000));
  const res = await query(
    `select 
    (completed_todo_by_user::float / total_todo_by_user::float) * 100 as precentage_todo_completed
    from (
      select 
        count(*) filter (where is_active = true and status = 'finish' and user_id = 1) as completed_todo_by_user,	
        count(*) filter (where is_active = true and user_id = 1) as total_todo_by_user
      from todo
    );`,
    []
  );

  return res;
}

export async function postTodo({ slug, title, content, image_url, user_id, type_id, priority_id }: PostTodoType) {
  const res = await query(
    `insert into todo(is_active,slug,title,\"content\",status,image_url,user_id,type_id,priority_id)
      values(true,$1,$2,$3,'in progress',$4,$5,$6,$7)`,
    [slug, title, content, image_url, user_id, type_id, priority_id]
  );

  // return type commandnya dan total row yang berubah
  return { command: res?.command, rowCountChanges: res?.rowCount };
}

export async function postType(type: string) {
  const user = (await getUser()) as GetUser;

  const res = await query('insert into type("name",user_id) values($1,$2)', [type, user.id]);
  // return type commandnya dan total row yang berubah
  return { command: res?.command, rowCountChanges: res?.rowCount };
}

export async function updateStatusTodoProgress(todoId: number) {
  const res = await query("update todo set status = 'in progress' where id = $1", [todoId]);

  // return type commandnya dan total row yang berubah
  return { command: res?.command, rowCountChanges: res?.rowCount };
}

export async function updateStatusTodoFinish(todoId: number) {
  const res = await query("update todo set status = 'finish' where id = $1", [todoId]);

  // return type commandnya dan total row yang berubah
  return { command: res?.command, rowCountChanges: res?.rowCount };
}

export async function deleteTodo(todoId: number) {
  const res = await query("update todo set is_active = false where id = $1", [todoId]);

  // return type commandnya dan total row yang berubah
  return { command: res?.command, rowCountChanges: res?.rowCount };
}

export async function restoreTodo(todoId: number) {
  const res = await query("update todo set is_active = true where id = $1", [todoId]);

  // return type commandnya dan total row yang berubah
  return { command: res?.command, rowCountChanges: res?.rowCount };
}

export async function deleteAllTrashTodoPermanent() {
  const user = (await getUser()) as GetUser;
  const res = await query("delete from todo where is_active = false and user_id = $1", [user.id]);

  // return type commandnya dan total row yang berubah
  return { command: res?.command, rowCountChanges: res?.rowCount };
}

export async function deleteTrashTodoPermanent(todoId: number) {
  const res = await query("delete from todo where id = $1", [todoId]);

  // return type commandnya dan total row yang berubah
  return { command: res?.command, rowCountChanges: res?.rowCount };
}
