# @semi-bot/semi-theme-rainbow 主题配置文档

## 概述

本项目已成功引入并配置 `@semi-bot/semi-theme-rainbow` 主题，支持明暗模式切换。

## 安装依赖

```bash
pnpm install @semi-bot/semi-theme-rainbow
pnpm install -D sass
```

## 配置步骤

### 1. 修改入口文件

在 [main.tsx](src/main.tsx) 中引入主题样式：

```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import '@douyinfe/semi-ui-19/react19-adapter'
import '@semi-bot/semi-theme-rainbow/semi.min.css'
import './index.css'
import { queryClient } from './query-client'
import App from './App.tsx'
```

**关键变更：**

- 移除了 `@douyinfe/semi-ui-19/lib/es/_base/base.css`
- 移除了自定义的 `theme.css`
- 引入了 `@semi-bot/semi-theme-rainbow/semi.min.css`

### 2. 添加主题切换功能

在 [App.tsx](src/App.tsx) 中添加主题切换功能：

```typescript
import { IconMoon, IconSun } from '@douyinfe/semi-icons'

const [isDarkMode, setIsDarkMode] = useState(false)

const toggleTheme = () => {
  const body = document.body
  if (body.hasAttribute('theme-mode')) {
    body.removeAttribute('theme-mode')
    setIsDarkMode(false)
  } else {
    body.setAttribute('theme-mode', 'dark')
    setIsDarkMode(true)
  }
}
```

在 Header 中添加主题切换按钮：

```typescript
<Button
  theme="borderless"
  type="primary"
  icon={isDarkMode ? <IconSun /> : <IconMoon />}
  onClick={toggleTheme}
  style={{
    marginRight: getButtonMargin(),
  }}
/>
```

## 主题特性

### Rainbow 主题特点

- **彩虹色系**：采用多彩渐变设计，视觉效果丰富
- **明暗模式**：内置亮色和暗色两套主题
- **完全兼容**：与 Semi Design 2.92.2+ 版本兼容

### 切换方式

Semi Design 的暗色模式切换通过给 `body` 添加属性 `[theme-mode='dark']` 实现：

```javascript
// 切换到暗色模式
document.body.setAttribute('theme-mode', 'dark')

// 切换到亮色模式
document.body.removeAttribute('theme-mode')
```

## 使用说明

1. **启动开发服务器**：

   ```bash
   pnpm run dev
   ```

2. **访问应用**：
   打开浏览器访问 `http://localhost:5173/`

3. **切换主题**：
   点击页面右上角的月亮/太阳图标按钮即可切换明暗模式

## 主题文件结构

```
node_modules/@semi-bot/semi-theme-rainbow/
├── scss/
│   ├── _font.scss
│   ├── _palette.scss
│   ├── animation.scss
│   ├── custom.scss
│   ├── global.scss
│   ├── index.scss
│   ├── local.scss
│   ├── mixin.scss
│   └── variables.scss
├── semi.css
├── semi.min.css
├── package.json
├── README.md
└── raw.json
```

## 注意事项

1. **版本兼容性**：确保使用的 Semi UI 版本与主题兼容（2.92.2+）
2. **样式覆盖**：如果需要自定义样式，建议在主题样式之后引入
3. **构建工具**：Vite 项目无需额外配置，直接引入 CSS 文件即可

## 参考资源

- [Semi Design 官方文档](https://semi.design/)
- [Semi Design 定制主题](https://semi.design/zh-CN/advanced/customize-theme)
- [Semi Design 暗色模式](https://semi.design/zh-CN/advanced/dark-mode)
- [Semi DSM 设计系统管理](https://semi.design/dsm/)
