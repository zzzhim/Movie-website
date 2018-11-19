<template>
    <el-aside>
        <el-row  class="tac">
            <el-col :span="24">
                    <el-menu
                        class="el-menu-vertical-demo box"
                        background-color="#333333"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        @select="handleSelect"
                    >
                        <el-menu-item index="/dateTime?2025" class="text-center">2025年上映</el-menu-item>
                        <el-menu-item index="/dateTime?2024" class="text-center">2024年上映</el-menu-item>
                        <el-menu-item index="/dateTime?2023" class="text-center">2023年上映</el-menu-item>
                        <el-menu-item index="/dateTime?2022" class="text-center">2022年上映</el-menu-item>
                        <el-menu-item index="/dateTime?2021" class="text-center">2021年上映</el-menu-item>
                        <el-menu-item index="/dateTime?2020" class="text-center">2020年上映</el-menu-item>
                        <el-menu-item index="/dateTime?2019" class="text-center">2019年上映</el-menu-item>
                        <el-menu-item index="/dateTime?2018" class="text-center">2018年上映</el-menu-item>
                    </el-menu>
            </el-col>
        </el-row>
    </el-aside>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import axios from '@/utils/axios'
    import moment from 'moment'

    export default {
        data() {
            return {
            }
        },
        computed: {
            ...mapState(['NavBar', 'dateTime']),
        },
        methods: {
            ...mapMutations(['SET_CARD','SET_DATETIME']),
            handleSelect(key, keyPath) {
                const arr = key.split('?')
                if(arr[1] != this.dataTime) {
                    this.SET_DATETIME(arr[1])
                    axios({
                        url: arr[0],
                        method: 'get',
                        params: {
                            name: this.NavBar,
                            dateTime: arr[1]
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
    }
</script>

<style lang="less" scoped>
    .box {
        height: 100%;
    }
    .text-center {
        text-align: center;
    }
</style>
