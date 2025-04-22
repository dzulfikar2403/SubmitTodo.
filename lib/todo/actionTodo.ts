"use server";

import { redirect } from "next/navigation";
import { postTodoSchema, updateTodoSchema } from "./definition";
import slugify from "slugify";
import xss from "xss";
import { GetUser, getUser } from "../auth/helper";
import { uploadImageTodo } from "../cloudinary";
import { deleteAllTrashTodoPermanent, deleteTodo, deleteTrashTodoPermanent, getAllTrashTodo, postTodo, postType, restoreTodo, updateStatusTodoFinish, updateStatusTodoProgress } from "../query";
import { query } from "../db";

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

    redirect("/dashboard");
  
}

export async function handlePostType(name: string) {
  await postType(name);
}

export async function handleUpdateTodo(prev: any, formData: FormData) {
  const { id: idUser, username } = (await getUser()) as GetUser;
  const validateFormData = updateTodoSchema.safeParse({
    id: Number(formData.get("id")),
    title: formData.get("title"),
    priority: formData.get("priority"),
    type: formData.get("type"),
    content: formData.get("content"),
  });

  if (validateFormData.error) {
    return { errors: validateFormData.error?.formErrors.fieldErrors };
  }

  if (formData.getAll("image").length > 3) {
    return { errors: "Maximal 3 images" };
  }

  const { id: idTodo, title, priority, type, content } = validateFormData.data;
  const checkValidTodo = await query("select * from todo where id = $1 and user_id = $2", [idTodo, idUser]);

  const slug = slugify(title);
  const filteringContent = content === "" || content === "null" ? null : xss(content);
  const images = (formData.getAll("image")[0] as File).size === 0 ? null : (formData.getAll("image") as File[]);

  if (idTodo !== checkValidTodo?.rows[0].id) {
    return { errors: "Todo not found!" };
  }

  let listImageUrl: string[] | null = null;
  try {
    if (images !== null) {
      listImageUrl = await uploadImageTodo(images as File[], idUser, username);
    }
  } catch (error) {
    return { errors: ["failed upload image.", "post was not created.", "try again later."] };
  }

  const imageUrl = listImageUrl !== null ? listImageUrl.join(`${process.env.TAG_SEPERATE_IMG_URL}`) : null;

  await query(
    `update todo
      set title = $3,
	    slug = $4,
	    priority_id = $5,
	    type_id = $6,
	    "content" = $7,
	    image_url = $8,
      updated_at = $9
    where id = $1 and user_id = $2`,
    [idTodo, idUser, title, slug, priority, type, filteringContent, imageUrl, new Date()]
  );

  redirect("/dashboard");
}

export async function handleUpdateTodoStatus(status: "finish" | "in progress", todoId: number) {
  if (status === "in progress") await updateStatusTodoFinish(todoId);
  if (status === "finish") await updateStatusTodoProgress(todoId);
}

export async function handleDeleteTodo(todoId: number) {
  const dataTrashTodo = await getAllTrashTodo();

  if ((dataTrashTodo?.rows as any[]).length < 20) {
    await deleteTodo(todoId);
  } else if ((dataTrashTodo?.rows as any[]).length === 20) {
    await deleteTrashTodoPermanent(todoId);
  }
}

export async function handleRestoreTodo(todoId: number) {
  await restoreTodo(todoId);
}

export async function handleDeleteAllTrashTodo() {
  await deleteAllTrashTodoPermanent();
}

export async function handleDeleteTrashTodoById(todoId: number) {
  await deleteTrashTodoPermanent(todoId);
}
