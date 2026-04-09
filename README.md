# React + TypeScript + Vite + Semi Design

一个基于 React 19、TypeScript 和 Vite 的现代化前端项目，集成了 Semi Design 组件库、Zustand 状态管理和 TanStack React Query。

## 🚀 技术栈

### 核心框架

- **React 19.2.4** - 最新的 React 版本
- **TypeScript ~5.9.3** - 类型安全的 JavaScript 超集
- **Vite 8.0.1** - 下一代前端构建工具

### UI 组件库

- **Semi Design 2.93.0** - 字节跳动开源的企业级 UI 组件库
- **Semi Icons 2.93.0** - 丰富的图标库
- **紫色主题** - 定制的紫色主题配色
- **亮色/暗色主题切换** - 支持主题模式切换

### 状态管理

- **Zustand 5.0.12** - 轻量级状态管理库

### 数据请求

- **TanStack React Query 5.96.2** - 强大的异步状态管理库

### 开发工具

- **ESLint 9.39.4** - 代码质量检查
- **Prettier 3.8.1** - 代码格式化
- **Commitlint 20.5.0** - Git 提交信息规范
- **Husky 9.1.7** - Git hooks 管理

## 📦 安装依赖

```bash
# 使用 pnpm 安装依赖（推荐）
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

## 🎯 快速开始

```bash
# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview
```

## 🔧 开发命令

```bash
# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 运行 ESLint 检查
pnpm lint

# 自动修复 ESLint 问题
pnpm lint:fix

# 使用 Prettier 格式化代码
pnpm format

# 检查代码格式
pnpm format:check

# 预览生产构建
pnpm preview
```

## 📁 项目结构

```
vite-test/
├── src/
│   ├── assets/           # 静态资源
│   ├── hooks/           # 自定义 hooks
│   │   └── use-api.ts  # React Query API hooks
│   ├── App.tsx          # 主应用组件
│   ├── App.css          # 应用样式
│   ├── main.tsx         # 应用入口
│   ├── query-client.ts  # React Query 配置
│   ├── store.ts         # Zustand 状态管理
│   ├── theme.css        # 主题配置
│   └── index.css       # 全局样式
├── .husky/             # Git hooks
├── .gitignore          # Git 忽略文件
├── .prettierrc         # Prettier 配置
├── commitlint.config.js # Commitlint 配置
├── eslint.config.js     # ESLint 配置
├── package.json         # 项目配置
├── tsconfig.app.json    # TypeScript 配置
├── vite.config.ts       # Vite 配置
├── REACT_QUERY.md      # React Query 使用文档
├── ZUSTAND.md         # Zustand 使用文档
└── README.md          # 项目说明
```

## 🎨 主题配置

项目配置了紫色主题，支持亮色和暗色模式切换：

- **亮色模式**：默认模式，紫色主色调 `#aa3bff`
- **暗色模式**：深色背景，更亮的紫色主色调 `#c084fc`

主题配置文件：[src/theme.css](src/theme.css)

## 🏪 状态管理

项目使用 Zustand 进行全局状态管理，主要状态包括：

- `count` - 计数器值
- `inputValue` - 输入框值
- `switchValue` - 开关状态
- `sliderValue` - 滑块值
- `isDarkMode` - 主题模式

详细文档：[ZUSTAND.md](ZUSTAND.md)

## 🔄 数据请求

项目使用 TanStack React Query 管理异步请求，包括：

- `useUsers()` - 获取用户列表
- `useUser(id)` - 获取单个用户
- `usePosts()` - 获取文章列表
- `useCreatePost()` - 创建文章
- `useDeletePost()` - 删除文章

详细文档：[REACT_QUERY.md](REACT_QUERY.md)

## 📝 代码规范

### ESLint

项目配置了 ESLint 进行代码质量检查，包括：

- TypeScript 类型检查
- React Hooks 规则
- React Refresh 规则
- Prettier 集成

### Prettier

项目使用 Prettier 进行代码格式化，确保代码风格一致。

### Commitlint

项目使用 Commitlint 规范 Git 提交信息，遵循 Conventional Commits 规范：

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 重构
test: 测试相关
chore: 构建/工具链相关
```

### Husky

项目配置了 Husky Git hooks：

- `pre-commit` - 提交前自动运行 lint 和 format
- `commit-msg` - 检查提交信息格式

## 🎯 主要功能

### 1. Semi Design 组件演示

- 按钮组件（主要、次要、第三级、危险）
- 输入框组件（普通输入框、文本域）
- 标签组件
- 徽章组件
- 头像组件
- 开关组件
- 滑块组件
- 进度条组件
- 表格组件
- 状态图标

### 2. React Query 数据管理

- 用户列表展示
- 文章管理（创建、删除）
- 自动缓存和重获取
- 加载状态和错误处理

### 3. 主题切换

- 亮色/暗色模式切换
- 所有组件自动适配主题
- 平滑的主题过渡效果

### 4. 状态管理

- 全局状态统一管理
- 组件间状态共享
- 主题状态持久化

## 🔌 React 19 兼容性

项目已配置 React 19 adapter，确保 Semi Design 组件在 React 19 中正常工作：

```typescript
import '@douyinfe/semi-ui-19/react19-adapter'
```

## 📚 文档

- [Semi Design 官方文档](https://semi.design/)
- [Zustand 官方文档](https://zustand-demo.pmnd.rs/)
- [TanStack Query 官方文档](https://tanstack.com/query/latest)
- [React 官方文档](https://react.dev/)
- [Vite 官方文档](https://vitejs.dev/)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT

## 🎉 开始使用

```bash
# 克隆项目
git clone <repository-url>

# 进入项目目录
cd vite-test

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 打开浏览器访问
# http://localhost:5173
```

## 💡 提示

1. **推荐使用 pnpm**：pnpm 比 npm 和 yarn 更快、更节省磁盘空间
2. **遵循代码规范**：提交代码前请运行 `pnpm lint` 和 `pnpm format`
3. **使用主题切换**：点击右上角按钮切换亮色/暗色模式
4. **查看文档**：详细的使用文档请查看 [ZUSTAND.md](ZUSTAND.md) 和 [REACT_QUERY.md](REACT_QUERY.md)

---

**Happy Coding! 🚀**
