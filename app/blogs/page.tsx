interface Blog {
    id: string
    title: string
    author: string
    url: string
    likes: number
}


const hardcodedBlogs: Blog[] = [
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
  },
  {
    id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  }
]


export default function BlogsPage() {
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>
      
      <div className="space-y-4 max-w-2xl">
        {hardcodedBlogs.map((blog) => (
          <div key={blog.id} className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-blue-600 hover:underline">
              <a href={blog.url} target="_blank" rel="noopener noreferrer">
                {blog.title}
              </a>
            </h2>
            <p className="text-gray-700 my-1">
              By: <span className="font-medium">{blog.author}</span>
            </p>
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded">
                Likes: {blog.likes}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}