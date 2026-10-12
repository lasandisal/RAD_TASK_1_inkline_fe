import api from "./api"

export type CreateArticleInput = {
  title: string
  content: string
  author: string
  tags: string
  image?: File
}

export type Article = {
  _id: string
  title: string
  content: string
  author: string
  imageURL?: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export const createArticle = async (input: CreateArticleInput) => {
  const formData = new FormData()
  formData.append("title", input.title)
  formData.append("content", input.content)
  formData.append("author", input.author)
  formData.append("tags", input.tags)

  if (input.image) {
    formData.append("imageURL", input.image)
  }

  return api.post("/article/create", formData)
}

export const getArticles = async () => {
  return api.get<{ data: Article[] }>("/article")
}

export const getArticle = async (id: string) => {
  return api.get<{ data: Article }>(`/article/${id}`)
}
