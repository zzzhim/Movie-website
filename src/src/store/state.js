import { getToken } from '@/utils/cookie'

const state = {
    // 全局变量
    token: getToken(),
    CardData: null,
    NavBar: 'home',
    dateTime: '2018',
}

export default state