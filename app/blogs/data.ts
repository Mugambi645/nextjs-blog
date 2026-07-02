import { revalidatePath } from 'next/cache'

export interface Blog {
  id: string
  title: string
  author: string
  url: string
  likes: number
}

export const blogStore: Blog[] = [
  {
    id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  }
]

// Server Action to update likes across execution contexts
export async function likeBlog(formData: FormData) {
  'use server'

  const id = formData.get('id') as string
  const blog = blogStore.find((b) => b.id === id)

  if (blog) {
    blog.likes += 1
  }

  // Force Next.js to purge cached copies of these specific endpoints
  revalidatePath('/blogs')
  revalidatePath(`/blogs/${id}`)
}