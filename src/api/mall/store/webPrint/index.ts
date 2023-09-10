import request from '@/config/axios'

export interface WebPrintVO {
  id: number
  title: string
  mechineCode: string
  msign: string
}

// 查询易联云打印机列表
export const getWebPrintList = async () => {
  return await request.get({ url: `/store/web-print/list` })
}
// 查询易联云打印机列表
export const getWebPrintPage = async (params: WebPrintPageReqVO) => {
  return await request.get({ url: `/store/web-print/page`, params })
}

// 查询易联云打印机详情
export const getWebPrint = async (id: number) => {
  return await request.get({ url: `/store/web-print/get?id=` + id })
}

// 新增易联云打印机
export const createWebPrint = async (data: WebPrintVO) => {
  return await request.post({ url: `/store/web-print/create`, data })
}

// 修改易联云打印机
export const updateWebPrint = async (data: WebPrintVO) => {
  return await request.put({ url: `/store/web-print/update`, data })
}

// 删除易联云打印机
export const deleteWebPrint = async (id: number) => {
  return await request.delete({ url: `/store/web-print/delete?id=` + id })
}

// 导出易联云打印机 Excel
export const exportWebPrint = async (params) => {
  return await request.download({ url: `/store/web-print/export-excel`, params })
}
