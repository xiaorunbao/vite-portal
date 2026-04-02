import { useState } from 'react'
import { Button, Card, Input, Toast, Space, Tag, Badge, Avatar, Switch, Slider, Progress, Divider } from '@douyinfe/semi-ui-19'
import { IconLikeHeart, IconStar, IconTickCircle, IconAlertCircle, IconCrossCircleStroked, IconSetting, IconUser, IconBell, IconMail } from '@douyinfe/semi-icons'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [switchValue, setSwitchValue] = useState(true)
  const [sliderValue, setSliderValue] = useState(50)

  const showToast = (type: string) => {
    if (type === 'success') {
      Toast.success({ content: '操作成功！' })
    } else if (type === 'error') {
      Toast.error({ content: '操作失败！' })
    } else if (type === 'warning') {
      Toast.warning({ content: '请注意！' })
    } else if (type === 'info') {
      Toast.info({ content: '这是一条提示信息' })
    }
  }

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '16px', color: 'var(--semi-color-text-0)' }}>
          Semi Design 紫色主题演示
        </h1>
        <p style={{ color: 'var(--semi-color-text-2)', fontSize: '16px' }}>
          使用 Semi Design 组件库，配置紫色主题
        </p>
      </div>

      <Space vertical align="start" spacing="loose" style={{ width: '100%' }}>
        <Card
          title="按钮组件"
          headerExtraContent={<Tag color="violet">Primary</Tag>}
          style={{ width: '100%' }}
        >
          <Space wrap>
            <Button type="primary" onClick={() => showToast('success')}>
              主要按钮
            </Button>
            <Button type="secondary" onClick={() => showToast('info')}>
              次要按钮
            </Button>
            <Button type="tertiary" onClick={() => showToast('warning')}>
              第三级按钮
            </Button>
            <Button type="danger" onClick={() => showToast('error')}>
              危险按钮
            </Button>
            <Button icon={<IconLikeHeart />}>带图标</Button>
            <Button icon={<IconStar />} type="primary">
              收藏
            </Button>
          </Space>
        </Card>

        <Card
          title="输入框组件"
          headerExtraContent={<Tag color="purple">Input</Tag>}
          style={{ width: '100%' }}
        >
          <Space vertical spacing="medium" style={{ width: '100%' }}>
            <Input
              placeholder="请输入内容"
              prefix={<IconUser />}
              value={inputValue}
              onChange={setInputValue}
              style={{ width: '300px' }}
            />
            <Input
              placeholder="带后缀的输入框"
              suffix={<IconMail />}
              style={{ width: '300px' }}
            />
          </Space>
        </Card>

        <Card
          title="标签与徽章"
          headerExtraContent={<Tag color="indigo">Tags</Tag>}
          style={{ width: '100%' }}
        >
          <Space wrap>
            <Tag color="blue">蓝色标签</Tag>
            <Tag color="cyan">青色标签</Tag>
            <Tag color="green">绿色标签</Tag>
            <Tag color="orange">橙色标签</Tag>
            <Tag color="red">红色标签</Tag>
            <Tag color="violet">紫色标签</Tag>
            <Tag color="purple">深紫色标签</Tag>
            <Tag color="grey">灰色标签</Tag>
          </Space>
          <Divider margin="12px" />
          <Space>
            <Badge count={5} dot>
              <Avatar color="violet">U</Avatar>
            </Badge>
            <Badge count={10} overflowCount={99}>
              <Avatar color="purple">P</Avatar>
            </Badge>
            <Badge count={100} overflowCount={99}>
              <Avatar color="indigo">I</Avatar>
            </Badge>
          </Space>
        </Card>

        <Card
          title="开关与滑块"
          headerExtraContent={<Tag color="pink">Controls</Tag>}
          style={{ width: '100%' }}
        >
          <Space vertical spacing="loose" style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span>开关状态：</span>
              <Switch checked={switchValue} onChange={setSwitchValue} />
              <span>{switchValue ? '开启' : '关闭'}</span>
            </div>
            <div style={{ width: '100%' }}>
              <div style={{ marginBottom: '8px' }}>
                滑块值：{sliderValue}
              </div>
              <Slider value={sliderValue} onChange={(value) => {
                if (typeof value === 'number') {
                  setSliderValue(value)
                }
              }} />
            </div>
          </Space>
        </Card>

        <Card
          title="进度条"
          headerExtraContent={<Tag color="teal">Progress</Tag>}
          style={{ width: '100%' }}
        >
          <Space vertical spacing="medium" style={{ width: '100%' }}>
            <Progress percent={30} />
            <Progress percent={50} showInfo />
            <Progress percent={70} stroke="var(--semi-color-primary)" />
            <Progress percent={90} stroke="var(--semi-color-success)" />
            <Progress percent={100} stroke="var(--semi-color-warning)" />
          </Space>
        </Card>

        <Card
          title="状态图标"
          headerExtraContent={<Tag color="green">Status</Tag>}
          style={{ width: '100%' }}
        >
          <Space>
            <IconTickCircle size="large" style={{ color: 'var(--semi-color-success)' }} />
            <IconAlertCircle size="large" style={{ color: 'var(--semi-color-warning)' }} />
            <IconCrossCircleStroked size="large" style={{ color: 'var(--semi-color-danger)' }} />
            <IconSetting size="large" style={{ color: 'var(--semi-color-primary)' }} />
            <IconBell size="large" style={{ color: 'var(--semi-color-link)' }} />
          </Space>
        </Card>

        <Card
          title="计数器示例"
          headerExtraContent={<Tag color="orange">Demo</Tag>}
          style={{ width: '100%' }}
        >
          <Space>
            <Button onClick={() => setCount((c) => c - 1)}>-</Button>
            <div style={{ 
              padding: '8px 24px', 
              fontSize: '24px', 
              fontWeight: 'bold',
              minWidth: '100px',
              textAlign: 'center',
              backgroundColor: 'var(--semi-color-fill-0)',
              borderRadius: '4px'
            }}>
              {count}
            </div>
            <Button onClick={() => setCount((c) => c + 1)}>+</Button>
            <Button type="primary" onClick={() => setCount(0)}>
              重置
            </Button>
          </Space>
        </Card>
      </Space>
    </div>
  )
}

export default App