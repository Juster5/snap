import { render, screen, act, fireEvent } from '@testing-library/react'

import P2P from '@/pages/p2p/index'

let container: any = null

beforeEach(async () => {
  await act(async () => {
    const res = render(<P2P />)
    container = res.container
  })
})

// 渲染测试
describe('P2P渲染页面测试', () => {
  test('标题渲染正常', () => {
    const title = screen.getByRole('heading', {
      level: 2,
      name: 'p2p_title',
    })
    expect(title).toBeInTheDocument()
  })

  test('副标题渲染正常', () => {
    const desc = screen.getByRole('heading', {
      level: 4,
      name: 'p2p_desc',
    })
    expect(desc).toBeInTheDocument()
  })

  test('Buy按钮渲染正常, 并且高亮', () => {
    const buy = screen.getByText('buy')
    expect(buy).toBeInTheDocument()
    expect(buy).toHaveClass('active')
  })

  test('Sell按钮渲染正常, 并且不高亮', () => {
    const sell = screen.getByText('sell')
    expect(sell).toBeInTheDocument()
    expect(sell).not.toHaveClass('active')
  })

  test('数字货币选择器渲染正常', () => {
    const currency = screen.getByTitle('USDT')
    expect(currency).toBeInTheDocument()
  })

  test('法币选择器渲染正常', () => {
    const fiat = screen.getByTitle('AED')
    expect(fiat).toBeInTheDocument()
  })
})

// 交互测试
describe('P2P交互测试', () => {
  test('首次访问数据加载正常', () => {
    const rows = container.querySelectorAll('[data-row-key]')
    // 初次渲染mock接口返回5条
    expect(rows.length).toEqual(5)
  })

  test('点击Sell按钮, 高亮', async () => {
    const sell = screen.getByText('sell')
    await act(() => {
      fireEvent.click(sell)
    })
    expect(sell).toHaveClass('active')
  })

  test('点击数字货币选择器, 显示菜单列表', async () => {
    const currency = screen.getByTitle('USDT')
    fireEvent.click(currency)
    const menu = screen.getAllByRole('list')
    expect(menu[0]).toBeInTheDocument()
  })

  test('点击发币选择器, 显示菜单列表', async () => {
    const fiat = screen.getByTitle('AED')
    fireEvent.click(fiat)
    const menu = screen.getAllByRole('list')
    expect(menu[1]).toBeInTheDocument()
  })
})
