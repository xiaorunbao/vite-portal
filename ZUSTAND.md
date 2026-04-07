# Zustand 状态管理集成

本项目已成功集成 Zustand 状态管理库。

## 📦 安装的依赖

```json
{
  "dependencies": {
    "zustand": "^5.0.12"
  }
}
```

## 🏪 Store 结构

在 `src/store.ts` 中定义了全局状态：

### 状态接口

```typescript
interface AppState {
  count: number              // 计数器值
  inputValue: string        // 输入框值
  switchValue: boolean     // 开关状态
  sliderValue: number       // 滑块值
  isDarkMode: boolean      // 主题模式
  increment: () => void     // 增加计数
  decrement: () => void     // 减少计数
  resetCount: () => void    // 重置计数
  setInputValue: (value: string) => void     // 设置输入框值
  setSwitchValue: (value: boolean) => void     // 设置开关状态
  setSliderValue: (value: number) => void     // 设置滑块值
  toggleTheme: () => void    // 切换主题
}
```

### Store 创建

```typescript
import { create } from 'zustand'

export const useAppStore = create<AppState>((set) => ({
  count: 0,
  inputValue: '',
  switchValue: true,
  sliderValue: 50,
  isDarkMode: false,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  resetCount: () => set({ count: 0 }),
  setInputValue: (value) => set({ inputValue: value }),
  setSwitchValue: (value) => set({ switchValue: value }),
  setSliderValue: (value) => set({ sliderValue: value }),
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode }))
}))
```

## 🎯 使用示例

### 在组件中使用 Store

```typescript
import { useAppStore } from './store'

function MyComponent() {
  // 从 store 中获取状态和方法
  const { 
    count, 
    inputValue, 
    switchValue, 
    sliderValue, 
    isDarkMode,
    increment, 
    decrement, 
    resetCount,
    setInputValue,
    setSwitchValue,
    setSliderValue,
    toggleTheme 
  } = useAppStore()

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={resetCount}>Reset</button>
      <input 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
      />
      <Switch checked={switchValue} onChange={setSwitchValue} />
      <Slider value={sliderValue} onChange={setSliderValue} />
      <button onClick={toggleTheme}>
        {isDarkMode ? '亮色模式' : '暗色模式'}
      </button>
    </div>
  )
}
```

### 选择性订阅

如果只需要订阅特定的状态，可以使用选择器来优化性能：

```typescript
// 只订阅 count 状态
const count = useAppStore((state) => state.count)

// 只订阅 isDarkMode 状态
const isDarkMode = useAppStore((state) => state.isDarkMode)

// 订阅多个状态
const { count, isDarkMode } = useAppStore((state) => ({
  count: state.count,
  isDarkMode: state.isDarkMode
}))
```

## 🔧 Zustand 优势

1. **极其轻量**：包体积仅约 1KB
2. **API 简单**：学习成本低，上手快
3. **TypeScript 友好**：完整的类型推导
4. **无需 Provider**：不需要包裹组件，直接使用
5. **性能优秀**：细粒度更新，避免不必要的重渲染
6. **DevTools 支持**：可以安装 `zustand-devtools` 进行调试

## 🚀 高级用法

### 持久化状态

如果需要将状态持久化到 localStorage：

```bash
pnpm add zustand/middleware
```

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      count: 0,
      inputValue: '',
      switchValue: true,
      sliderValue: 50,
      isDarkMode: false,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      resetCount: () => set({ count: 0 }),
      setInputValue: (value) => set({ inputValue: value }),
      setSwitchValue: (value) => set({ switchValue: value }),
      setSliderValue: (value) => set({ sliderValue: value }),
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode }))
    }),
    {
      name: 'app-storage' // localStorage 的 key
    }
  )
)
```

### DevTools 集成

```bash
pnpm add zustand/middleware
```

```typescript
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      // ...其他状态和方法
    }),
    {
      name: 'AppStore' // DevTools 中显示的名称
    }
  )
)
```

## 📚 参考资源

- [Zustand 官方文档](https://zustand-demo.pmnd.rs/)
- [Zustand GitHub](https://github.com/pmndrs/zustand)
- [Zustand DevTools](https://github.com/pmndrs/zustand/tree/main/packages/middleware/devtools)