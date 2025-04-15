import {z} from 'zod'

export const postTodoSchema = z.object({
  title: z.string().min(3,{message: 'min 3 character'}).trim(),
  priority: z.enum(['1','2','3'],{message: 'Expected urgent | high | normal'}),
  type: z.string({message: 'Expected Type'}).trim(),
  content: z.string()
})

export const updateTodoSchema = z.object({
  id: z.number().int({message: "ID not found"}).positive({message: "ID must be greater than 0"}),
  title: z.string().min(3,{message: 'min 3 character'}).trim(),
  priority: z.enum(['1','2','3'],{message: 'Expected urgent | high | normal'}),
  type: z.string({message: 'Expected Type'}).trim(),
  content: z.string().trim()
})

 