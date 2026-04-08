import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface User {
  id: number
  name: string
  email: string
  avatar: string
}

interface Post {
  id: number
  title: string
  content: string
  userId: number
}

interface CreatePostInput {
  title: string
  content: string
}

const mockUsers: User[] = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', avatar: 'Z' },
  { id: 2, name: '李四', email: 'lisi@example.com', avatar: 'L' },
  { id: 3, name: '王五', email: 'wangwu@example.com', avatar: 'W' },
]

const mockPosts: Post[] = [
  { id: 1, title: 'React Query 入门教程', content: '学习如何使用 React Query 管理异步状态', userId: 1 },
  { id: 2, title: 'Zustand 状态管理', content: '探索轻量级状态管理方案', userId: 2 },
  { id: 3, title: 'Semi Design 组件库', content: '使用 Semi Design 构建美观的界面', userId: 3 },
]

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return mockUsers
    },
    staleTime: 10 * 60 * 1000, // 10 分钟
  })
}

export function useUser(id: number) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockUsers.find((user) => user.id === id)
    },
    enabled: !!id,
  })
}

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 800))
      return mockPosts
    },
    staleTime: 5 * 60 * 1000, // 5 分钟
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreatePostInput) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const newPost: Post = {
        id: mockPosts.length + 1,
        ...data,
        userId: 1,
      }
      mockPosts.push(newPost)
      return newPost
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const index = mockPosts.findIndex((post) => post.id === id)
      if (index > -1) {
        mockPosts.splice(index, 1)
      }
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}