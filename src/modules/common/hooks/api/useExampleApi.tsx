import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/modules/common/http/apiKy'

// Tipagem dos dados
type ExampleData = {
  id: number
  title: string
  body: string
  userId: number
}

// Hook para buscar um post específico
export function useGetPost(postId: number) {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: async (): Promise<ExampleData> => {
      const response = await api.get(`posts/${postId}`)
      return response.json()
    },
    enabled: !!postId, // Só executa se postId existir
  })
}

// Hook para buscar todos os posts
export function useGetPosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async (): Promise<ExampleData[]> => {
      const response = await api.get('posts')
      return response.json()
    },
  })
}

// Hook para criar um novo post
export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (
      newPost: Omit<ExampleData, 'id'>
    ): Promise<ExampleData> => {
      const response = await api.post('posts', {
        json: newPost,
      })
      return response.json()
    },
    onSuccess: (data) => {
      // Invalida e refetch a lista de posts
      queryClient.invalidateQueries({ queryKey: ['posts'] })

      // Opcionalmente, adiciona o novo post ao cache
      queryClient.setQueryData(['post', data.id], data)
    },
  })
}

// Hook para atualizar um post
export function useUpdatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updatedPost: ExampleData): Promise<ExampleData> => {
      const response = await api.put(`posts/${updatedPost.id}`, {
        json: updatedPost,
      })
      return response.json()
    },
    onSuccess: (data) => {
      // Atualiza o cache do post específico
      queryClient.setQueryData(['post', data.id], data)

      // Invalida a lista de posts para atualizar
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

// Hook para deletar um post
export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (postId: number): Promise<void> => {
      await api.delete(`posts/${postId}`)
    },
    onSuccess: (_, postId) => {
      // Remove o post do cache
      queryClient.removeQueries({ queryKey: ['post', postId] })

      // Invalida a lista de posts
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
