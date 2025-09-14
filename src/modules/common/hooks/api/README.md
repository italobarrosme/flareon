# TanStack Query (React Query) - Guia de Uso

Este documento explica como usar o TanStack Query configurado no projeto para fazer fetching de APIs de forma eficiente.

## 🚀 Configuração

O TanStack Query já está configurado no projeto com:

- **QueryProvider** - Wrapper principal configurado no `layout.tsx`
- **DevTools** - Disponível em desenvolvimento para debugging
- **Configurações otimizadas** - Cache, retry e staleTime configurados

## 📖 Conceitos Básicos

### useQuery

Para **buscar dados** (operações GET):

```tsx
import { useQuery } from '@tanstack/react-query'

const { data, isLoading, error, refetch } = useQuery({
  queryKey: ['users'], // Identificador único para cache
  queryFn: fetchUsers, // Função que retorna os dados
})
```

### useMutation

Para **modificar dados** (POST, PUT, DELETE):

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query'

const queryClient = useQueryClient()
const mutation = useMutation({
  mutationFn: createUser,
  onSuccess: () => {
    // Invalida cache para atualizar a lista
    queryClient.invalidateQueries({ queryKey: ['users'] })
  },
})
```

## 💡 Exemplos Práticos

### 1. Hook para Buscar Dados

```tsx
// hooks/api/useUsers.tsx
export function useGetUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await api.get('users')
      return response.json()
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  })
}
```

### 2. Hook para Criar Dados

```tsx
export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newUser: CreateUserData) => {
      const response = await api.post('users', { json: newUser })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
```

### 3. Usando no Componente

```tsx
// components/UserList.tsx
import { useGetUsers, useCreateUser } from '@/hooks/api'

export function UserList() {
  const { data: users, isLoading, error } = useGetUsers()
  const createUserMutation = useCreateUser()

  if (isLoading) return <div>Carregando...</div>
  if (error) return <div>Erro: {error.message}</div>

  return (
    <div>
      {users?.map((user) => <div key={user.id}>{user.name}</div>)}

      <button
        onClick={() => createUserMutation.mutate({ name: 'João' })}
        disabled={createUserMutation.isPending}
      >
        {createUserMutation.isPending ? 'Criando...' : 'Criar Usuário'}
      </button>
    </div>
  )
}
```

## 🔄 Gerenciamento de Cache

### Invalidar Cache

```tsx
// Invalida e refetch dados específicos
queryClient.invalidateQueries({ queryKey: ['users'] })

// Invalida todos os queries que começam com 'users'
queryClient.invalidateQueries({ queryKey: ['users'], exact: false })
```

### Atualizar Cache Diretamente

```tsx
// Adiciona dados diretamente ao cache
queryClient.setQueryData(['user', userId], newUserData)

// Remove dados do cache
queryClient.removeQueries({ queryKey: ['user', userId] })
```

## 🎯 Boas Práticas

### 1. Query Keys Consistentes

```tsx
// ✅ Bom - estrutura hierárquica
;['users'][('users', userId)][('users', userId, 'posts')][ // Lista de usuários // Usuário específico // Posts do usuário
  // ❌ Evitar - inconsistente
  ('getUserById', userId)
]['user-data-' + userId]
```

### 2. Tratamento de Erro

```tsx
const { data, error, isError } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  retry: 3, // Tenta 3 vezes em caso de erro
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
})

if (isError) {
  console.error('Erro ao buscar usuários:', error)
}
```

### 3. Loading States

```tsx
const { data, isLoading, isFetching, isError } = useQuery(...)

// isLoading: primeira vez carregando
// isFetching: buscando dados (incluindo background refetch)
// isError: houve erro na última tentativa
```

### 4. Conditional Queries

```tsx
const { data: user } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  enabled: !!userId, // Só executa se userId existir
})
```

## 🛠️ DevTools

Em desenvolvimento, as DevTools ficam disponíveis para:

- **Visualizar queries ativas**
- **Inspecionar cache**
- **Simular network states**
- **Debug performance**

## 📚 Recursos Úteis

- [Documentação oficial](https://tanstack.com/query/latest)
- [Exemplos práticos](https://tanstack.com/query/latest/docs/react/examples)
- [Guia de migração](https://tanstack.com/query/latest/docs/react/guides/migrating-to-react-query-4)
