<template>
    <el-header style="padding:0px">
        <el-row>
            <el-col :span="24">
                <el-menu
                    class="el-menu-demo"
                    mode="horizontal"
                    background-color="#333333"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    style="border: none"
                    @select="handleSelect"
                >
                    <el-menu-item index="/home" id="logo">黑骑预告片网站</el-menu-item>
                    <el-menu-item index="/home">全部</el-menu-item>
                    <el-menu-item index="/classIfication?科幻">科幻</el-menu-item>
                    <el-menu-item index="/classIfication?惊悚">惊悚</el-menu-item>
                    <el-menu-item index="/classIfication?冒险">冒险</el-menu-item>
                    <el-menu-item index="/classIfication?奇幻">奇幻</el-menu-item>
                    <el-menu-item index="/classIfication?悬疑">悬疑</el-menu-item>
                    <el-menu-item index="/classIfication?剧情">剧情</el-menu-item>
                    <el-menu-item index="/classIfication?犯罪">犯罪</el-menu-item>
                    <el-menu-item index="/classIfication?灾难">灾难</el-menu-item>
                    <el-menu-item index="/classIfication?恐怖">恐怖</el-menu-item>
                    <el-menu-item index="/classIfication?战争">战争</el-menu-item>
                    <el-menu-item index="/classIfication?喜剧">喜剧</el-menu-item>
                    <el-menu-item index="/classIfication?音乐">音乐</el-menu-item>
                    <el-menu-item index="/classIfication?文艺">文艺</el-menu-item>
                    <el-menu-item index="/classIfication?励志">励志</el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </el-header>
</template>

<script>
    import axios from '@/utils/axios'
    import { mapMutations } from 'vuex'
    import moment from 'moment'

    export default {
        data() {
            return {
                source: null, //存放取消的请求方法
            }
        },
        methods: {
            ...mapMutations(['SET_CARD']),
            handleSelect(key, keyPath) {
                var CancelToken = axios.CancelToken;
                var source = CancelToken.source();
                if(key != '/') {
                    const arr = key.split('?')
                    axios({
                        url: arr[0],
                        method: 'get',
                        params: {
                            name: arr[1]
                        }
                    }).then(({ data }) => {
                        if(data.success) {
                            let CardData = data.data
                            for (let index = 0; index < CardData.length; index++) {
                                CardData[index].meta.createdAt = parseInt(moment(CardData[index].meta.createdAt).fromNow("YYYY-MM-DD"))
                            }
                            this.SET_CARD(CardData)
                        }else {
                            this.$message({ // 消息提示
                                message: data.message,
                                type: 'success'
                            });
                        }
                    })

                }
            }
        },
        mounted() {
            setTimeout(() => {
                axios({
                    url: '/home',
                    method: 'get'
                }).then(({ data }) => {
                    let CardData = data.data
                    
                    for (let index = 0; index < CardData.length; index++) {
                        CardData[index].meta.createdAt = parseInt(moment(CardData[index].meta.createdAt).subtract(0).fromNow("YYYY-MM-DD"))
                    }
                    this.SET_CARD(CardData)
                })
            }, 2000);
        },
    }
</script>

<style lang="less" scoped>
    #logo {
        transition: all 1s;
        text-align: center;
        width: 300px;
        font-size: 20px;
        &:hover {
            font-size: 30px !important;
        }
    }
</style>
