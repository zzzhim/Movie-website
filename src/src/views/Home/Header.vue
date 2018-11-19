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
                    <el-menu-item index="" id="logo">黑骑预告片网站</el-menu-item>
                    <el-menu-item index="/dateTime?home">全部</el-menu-item>
                    <el-menu-item index="/dateTime?科幻">科幻</el-menu-item>
                    <el-menu-item index="/dateTime?惊悚">惊悚</el-menu-item>
                    <el-menu-item index="/dateTime?冒险">冒险</el-menu-item>
                    <el-menu-item index="/dateTime?奇幻">奇幻</el-menu-item>
                    <el-menu-item index="/dateTime?悬疑">悬疑</el-menu-item>
                    <el-menu-item index="/dateTime?剧情">剧情</el-menu-item>
                    <el-menu-item index="/dateTime?犯罪">犯罪</el-menu-item>
                    <el-menu-item index="/dateTime?灾难">灾难</el-menu-item>
                    <el-menu-item index="/dateTime?恐怖">恐怖</el-menu-item>
                    <el-menu-item index="/dateTime?战争">战争</el-menu-item>
                    <el-menu-item index="/dateTime?喜剧">喜剧</el-menu-item>
                    <el-menu-item index="/dateTime?音乐">音乐</el-menu-item>
                    <el-menu-item index="/dateTime?文艺">文艺</el-menu-item>
                    <el-menu-item index="/dateTime?励志">励志</el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </el-header>
</template>

<script>
    import axios from '@/utils/axios'
    import { mapMutations, mapState } from 'vuex'
    import moment from 'moment'

    export default {
        data() {
            return {
            }
        },
        computed: {
            ...mapState(['NavBar','dateTime']),
        },
        methods: {
            ...mapMutations(['SET_CARD', 'SET_NavBar']),
            handleSelect(key, keyPath) {
                const arr = key.split('?')
                if(key != '') {
                    if(arr[1] != this.NavBar) {
                        console.log(this.dateTime);
                        
                        this.SET_NavBar(arr[1])
                        axios({
                            url: arr[0],
                            method: 'get',
                            params: {
                                name: arr[1],
                                dateTime: this.dateTime
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
            }
        },
        created() {
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
