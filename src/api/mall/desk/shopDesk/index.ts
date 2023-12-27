import request from '@/config/axios'

export interface ShopDeskVO {
  id: number
  shopId: number
  shopName: string
  number: string
  miniQrcode: string
  h5Qrcode: string
  aliQrcode: string
  note: string
  orderCount: number
  costAmount: number
  lastOrderNo: string
  lastOrderTime: Date
  lastOrderStatus: byte
  status: byte
}

// 查询门店 - 桌号列表
export const getShopDeskPage = async (params: ShopDeskPageReqVO) => {
  return await request.get({ url: `/desk/shop-desk/page`, params })
}

// 查询门店 - 桌号详情
export const getShopDesk = async (id: number) => {
  return await request.get({ url: `/desk/shop-desk/get?id=` + id })
}

// 新增门店 - 桌号
export const createShopDesk = async (data: ShopDeskVO) => {
  return await request.post({ url: `/desk/shop-desk/create`, data })
}

// 新增门店 - 批量添加桌号
export const batchAddShopDesk = async (data) => {
  return await request.post({ url: `/desk/shop-desk/batchAdd`, data })
}

// 修改门店 - 桌号
export const updateShopDesk = async (data: ShopDeskVO) => {
  return await request.put({ url: `/desk/shop-desk/update`, data })
}

// 删除门店 - 桌号
export const deleteShopDesk = async (id: number) => {
  return await request.delete({ url: `/desk/shop-desk/delete?id=` + id })
}

// 导出门店 - 桌号 Excel
export const exportShopDesk = async (params) => {
  return await request.download({ url: `/desk/shop-desk/export-excel`, params })
}

// 导出门店 - 桌号模板 Excel
export const exportShopDeskTemplate = async (params) => {
  return await request.download({ url: `/desk/shop-desk/export-excel-template`, params })
}

// 获取二维码
export const getQrcode = async (params) => {
  return await request.get({ url: `/desk/shop-desk/single-qrcode`, params })
}

// 下载二维码
export const downloadQrcode = (id) => {
  return request.download({ url: `/desk/shop-desk/download?id=` + id })
}

