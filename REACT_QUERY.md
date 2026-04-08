# TanStack React Query 集成

本项目已成功集成 TanStack React Query 来管理异步请求和服务器状态。

## 📦 安装的依赖

```json
{
  "dependencies": {
    "@tanstack/react-query": "^5.96.2"
  }
}
```

## 🔧 配置

### QueryClient 配置

在 `src/query-client.ts` 中配置了全局的 QueryClient：

```typescript
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,  // 窗口聚焦时不重新获取数据
      retry: 1,                       // 失败时重试 1 次
      staleTime: 5 * 60 * 1000,      // 数据在 5 分钟内视为新鲜
    },
    mutations: {
      retry: 1,                       // 变更失败时重试 1 次
    },
  },
})
```

### Provider 设置

在 `src/main.tsx` 中设置了 QueryClientProvider：

```typescript
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './query-client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
)
```

## 🎯 API Hooks

在 `src/hooks/use-api.ts` 中定义了所有的 API hooks：

### 数据查询 Hooks

#### `useUsers()`

获取用户列表数据。

```typescript
const { data, isLoading, error, refetch } = useUsers()
```

**返回值**：

- `data`: 用户数组
- `isLoading`: 加载状态
- `error`: 错误信息
- `refetch`: 重新获取数据的函数

#### `useUser(id)`

获取单个用户数据。

```typescript
const { data, isLoading, error } = useUser(1)
```

**参数**：

- `id`: 用户 ID

#### `usePosts()`

获取文章列表数据。

```typescript
const { data, isLoading, error, refetch } = usePosts()
```

### 数据变更 Hooks

#### `useCreatePost()`

创建新文章。

```typescript
const createPost = useCreatePost()

createPost.mutate(
  { title: '标题', content: '内容' },
  {
    onSuccess: () => {
      Toast.success({ content: '创建成功！' })
    },
    onError: (error) => {
      Toast.error({ content: '创建失败！' })
    },
  }
)
```

**状态**：

- `createPost.isPending`: 创建进行中
- `createPost.isSuccess`: 创建成功
- `createPost.isError`: 创建失败

#### `useDeletePost()`

删除文章。

```typescript
const deletePost = useDeletePost()

deletePost.mutate(postId, {
  onSuccess: () => {
    Toast.success({ content: '删除成功！' })
  },
})
```

## 💡 使用示例

### 在组件中使用

```typescript
import { useUsers, usePosts, useCreatePost, useDeletePost } from './hooks/use-api'

function MyComponent() {
  // 查询数据
  const { data: users, isLoading, error, refetch } = useUsers()
  const { data: posts } = usePosts()

  // 变更数据
  const createPost = useCreatePost()
  const deletePost = useDeletePost()

  if (isLoading) {
    return <Spin size="large" />
  }

  if (error) {
    return <Empty title="加载失败" />
  }

  return (
    <div>
      <Button onClick={() => refetch()}>刷新</Button>
      
      <Table dataSource={users} />
      
      <Button 
        onClick={() => createPost.mutate({ title: '新文章', content: '内容' })}
        loading={createPost.isPending}
      >
        创建文章
      </Button>
      
      <Button 
        onClick={() => deletePost.mutate(1)}
        loading={deletePost.isPending}
      >
        删除文章
      </Button>
    </div>
  )
}
```

## 🚀 React Query 优势

### 1. 自动缓存和重获取

- 自动缓存查询结果
- 智能重获取策略
- 避免重复请求

### 2. 请求状态管理

- `isLoading`: 请求进行中
- `isSuccess`: 请求成功
- `isError`: 请求失败
- `isFetching`: 正在获取数据

### 3. 自动重试

- 失败自动重试
- 可配置重试次数和延迟

### 4. 后台刷新

- 窗口聚焦时自动刷新
- 可配置刷新策略

### 5. 乐观更新

- 支持乐观 UI 更新
- 提升用户体验

### 6. 分页和无限滚动

- 内置分页支持
- 无限滚动支持

### 7. DevTools

- 强大的开发工具
- 实时监控请求状态

## 🔍 高级用法

### 选择性订阅

只订阅需要的部分数据，优化性能：

```typescript
const userName = useQuery({
  queryKey: ['user', 1],
  queryFn: fetchUser,
  select: (data) => data.name, // 只订阅 name 字段
})
```

### 并行查询

同时执行多个查询：

```typescript
const usersQuery = useQuery({ queryKey: ['users'], queryFn: fetchUsers })
const postsQuery = useQuery({ queryKey: ['posts'], queryFn: fetchPosts })
```

### 依赖查询

基于前一个查询的结果执行下一个查询：

```typescript
const userQuery = useQuery({ queryKey: ['user', userId], queryFn: fetchUser })
const postsQuery = useQuery({
  queryKey: ['posts', userQuery.data?.id],
  queryFn: () => fetchUserPosts(userQuery.data?.id),
  enabled: !!userQuery.data, // 只有当 userQuery 完成后才执行
})
```

### 条件查询

基于条件执行查询：

```typescript
const { data } = useQuery({
  queryKey: ['user', userId],
  queryFn: fetchUser,
  enabled: !!userId, // 只有当 userId 存在时才执行
})
```

### 初始数据

设置初始数据，避免加载状态：

```typescript
const { data } = useQuery({
  queryKey: ['user', 1],
  queryFn: fetchUser,
  initialData: { id: 1, name: 'Loading...' },
})
```

### 查询失效

手动使查询失效，触发重新获取：

```typescript
const queryClient = useQueryClient()

queryClient.invalidateQueries({ queryKey: ['users'] })
queryClient.invalidateQueries() // 使所有查询失效
```

### 预取数据

提前获取数据，提升用户体验：

```typescript
const prefetchUsers = async () => {
  await queryClient.prefetchQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })
}
```

## 📚 参考资源

- [TanStack Query 官方文档](https://tanstack.com/query/latest)
- [TanStack Query GitHub](https://github.com/TanStack/query)
- [React Query 教程](https://www.robinwieruch.de/react-query/)
- [React Query 最佳实践](https://tkdodo.eu/blog/practical-react-query)

## 🎨 项目中的应用

在当前项目中，React Query 被用于：

1. **用户列表展示**：展示用户数据，支持刷新
2. **文章管理**：创建和删除文章，自动更新列表
3. **加载状态**：使用 Spin 组件显示加载状态
4. **错误处理**：使用 Empty 组件显示错误状态
5. **乐观更新**：创建/删除成功后自动刷新列表

所有异步请求都通过 React Query 管理，提供了更好的用户体验和代码可维护性。
