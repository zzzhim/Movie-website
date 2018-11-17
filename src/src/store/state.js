import { getToken } from '@/utils/cookie'

const state = {
    // 全局变量
    token: getToken(),
    CardData: null
}

export default state