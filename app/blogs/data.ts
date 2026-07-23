import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { blogs } from '@/db/schema'

export interface Blog {
  id: number
  title: string
  author: string
  url: string
  likes: number
}

export async function getBlogs(): Promise<Blog[]> {
  return db.select().from(blogs)
}

export async function getBlogById(id: number): Promise<Blog | undefined> {
  const [blog] = await db.select().from(blogs).where(eq(blogs.id, id))
  return blog
}

// Server Action to update likes across execution contexts
export async function likeBlog(formData: FormData) {
  'use server'

  const id = Number(formData.get('id'))
  const blog = await getBlogById(id)

  if (blog) {
    await db.update(blogs).set({ likes: blog.likes + 1 }).where(eq(blogs.id, id))
  }

  // Force Next.js to purge cached copies of these specific endpoints
  revalidatePath('/blogs')
  revalidatePath(`/blogs/${id}`)
}

// Server Action to create a new blog entry
export async function createBlog(formData: FormData) {
  'use server'

  const title = formData.get('title') as string
  const author = formData.get('author') as string
  const url = formData.get('url') as string

  // Simple validation rule guard
  if (!title || !author || !url) {
    return
  }

  await db.insert(blogs).values({ title, author, url })

  // CRITICAL FOR PRODUCTION MODE: Instructs Next.js to purge its static build-time cache
  // and re-render /blogs on the next cycle so your update immediately appears.
  revalidatePath('/blogs')

  // Send the user back to the updated dashboard view
  redirect('/blogs')
}
