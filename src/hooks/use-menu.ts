import { useQuery } from '@tanstack/react-query'
import type { MenuItem } from '../store/portal'

export const useMenuData = () => {
  return useQuery({
    queryKey: ['menuData'],
    queryFn: async (): Promise<MenuItem[]> => {
      const response = await fetch('/api/menu')
      if (!response.ok) {
        throw new Error('Failed to fetch menu data')
      }
      return response.json()
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useMockMenuData = () => {
  return useQuery({
    queryKey: ['mockMenuData'],
    queryFn: async (): Promise<MenuItem[]> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockMenuData)
        }, 300)
      })
    },
    staleTime: Infinity,
  })
}

export const mockMenuData: MenuItem[] = [
  {
    id: '1',
    name: '首页',
    url: 'https://semi.design/zh-CN/basic/layout',
    icon: 'IconHome',
    level: 1,
  },
  {
    id: '2',
    name: '系统管理',
    url: '',
    icon: 'IconSetting',
    level: 1,
    children: [
      {
        id: '2-1',
        name: '用户管理',
        url: 'https://example.com/users',
        level: 2,
        parentId: '2',
      },
      {
        id: '2-2',
        name: '角色管理',
        url: 'https://example.com/roles',
        level: 2,
        parentId: '2',
      },
      {
        id: '2-3',
        name: '权限管理',
        url: 'https://example.com/permissions',
        level: 2,
        parentId: '2',
      },
    ],
  },
  {
    id: '3',
    name: '业务管理',
    url: '',
    icon: 'IconBusiness',
    level: 1,
    children: [
      {
        id: '3-1',
        name: '订单管理',
        url: 'https://example.com/orders',
        level: 2,
        parentId: '3',
      },
      {
        id: '3-2',
        name: '产品管理',
        url: 'https://example.com/products',
        level: 2,
        parentId: '3',
      },
    ],
  },
  {
    id: '4',
    name: '数据统计',
    url: 'https://example.com/statistics',
    icon: 'IconChart',
    level: 1,
  },
  {
    id: '5',
    name: '帮助中心',
    url: 'https://example.com/help',
    icon: 'IconHelp',
    level: 1,
  },
]