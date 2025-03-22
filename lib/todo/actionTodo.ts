"use server";

import { redirect } from "next/navigation";
import { postTodoSchema } from "./definition";
import slugify from "slugify";
import xss from "xss";
import { GetUser, getUser } from "../auth/helper";
import { uploadImageTodo } from "../cloudinary";
import { revalidatePath } from "next/cache";
import { deleteTodo, postTodo, postType, restoreTodo, updateStatusTodoFinish, updateStatusTodoProgress } from "../query";

export async function handlePostTodo(prev: any, formData: FormData) {
  const { id, username } = (await getUser()) as GetUser;
  const validationForm = postTodoSchema.safeParse({
    title: formData.get("title"),
    priority: formData.get("priority"),
    type: formData.get("type"),
    content: formData.get("content"),
  });

  if (validationForm.error) {
    return { errors: validationForm.error?.formErrors.fieldErrors };
  }

  if (formData.getAll("image").length > 3) {
    return { errors: "maxximal 3 images" };
  }

  const { title, content, type, priority } = validationForm.data;
  const slug = slugify(title);
  const filteringContent = content.trim() === "" ? null : xss(content);
  const images = (formData.getAll("image")[0] as File).size === 0 ? null : (formData.getAll("image") as File[]);

  let listImageUrl: string[] | null = null;
  try {
    if (images !== null) {
      listImageUrl = await uploadImageTodo(images as File[], id, username);
    } else if (images === null) {
      listImageUrl = null;
    }
  } catch (error) {
    return { errors: ["failed upload image.", "post was not created.", "try again later."] };
  }

  const imageUrl = listImageUrl !== null ? listImageUrl.join(`${process.env.TAG_SEPERATE_IMG_URL}`) : null;

  await postTodo({
    slug,
    title,
    content: filteringContent,
    image_url: imageUrl,
    user_id: id,
    type_id: Number(type),
    priority_id: Number(priority),
  });

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function handlePostType(name: string) {
  await postType(name);
  revalidatePath("/", "layout");
}

export async function handleUpdateTodoStatus(status: "finish" | "in progress", todoId: number) {
  if (status === "in progress") await updateStatusTodoFinish(todoId);
  if (status === "finish") await updateStatusTodoProgress(todoId);

  revalidatePath("/", "layout");
}

export async function handleDeleteTodo(todoId:number){
  await deleteTodo(todoId);
  revalidatePath('/',"layout")
}

export async function handleRestoreTodo(todoId:number){
  await restoreTodo(todoId);
  revalidatePath('/',"layout")
}