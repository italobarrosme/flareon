import { useGetPosts, useCreatePost } from '@/modules/common/hooks/api'

export function ExampleQueryUsage() {
  // Hook para buscar dados
  const { data: posts, isLoading, error, refetch } = useGetPosts()

  // Hook para criar novos dados
  const createPostMutation = useCreatePost()

  const handleCreatePost = async () => {
    try {
      await createPostMutation.mutateAsync({
        title: 'Novo Post',
        body: 'Conteúdo do post',
        userId: 1,
      })
    } catch (error) {
      console.error('Erro ao criar post:', error)
    }
  }

  // Estados de loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Carregando posts...</div>
      </div>
    )
  }

  // Estados de erro
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <div className="text-red-500">
          Erro ao carregar posts: {error.message}
        </div>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Posts</h2>
        <button
          onClick={handleCreatePost}
          disabled={createPostMutation.isPending}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {createPostMutation.isPending ? 'Criando...' : 'Criar Post'}
        </button>
      </div>

      {posts && (
        <div className="grid gap-4">
          {posts.slice(0, 10).map((post) => (
            <div
              key={post.id}
              className="p-4 border border-gray-300 rounded-lg bg-white text-black"
            >
              <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
              <p className="text-gray-600">{post.body}</p>
              <span className="text-sm text-gray-500">
                Post ID: {post.id} | User ID: {post.userId}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
