import request from '@/config/axios'

// 创建套餐
export const createStoreCombo = async (data: any) => {
  return await request.post({ url: '/combo/store-combo/create', data })
}

// 更新套餐
export const updateStoreCombo = async (data: any) => {
  return await request.put({ url: '/combo/store-combo/update', data })
}

// 删除套餐
export const deleteStoreCombo = async (id: number) => {
  return await request.delete({ url: `/combo/store-combo/delete?id=${id}` })
}

// 获得套餐
export const getStoreCombo = async (id: number) => {
  return await request.get({ url: `/combo/store-combo/get?id=${id}` })
}

// 获得套餐分页
export const getStoreComboPage = async (query: any) => {
  return await request.get({ url: '/combo/store-combo/page', params: query })
}

// 导出套餐 Excel
export const exportStoreComboExcel = async (query: any) => {
  return await request.get({ url: '/combo/store-combo/export-excel', params: query, responseType: 'blob' })
}
