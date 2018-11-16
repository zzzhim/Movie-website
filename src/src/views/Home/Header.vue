<template>
    <el-header style="padding:0px">
        <el-row>
            <el-col :span="24">
                <el-menu
                    :default-active="activeIndex"  
                    router
                    class="el-menu-demo"
                    mode="horizontal"
                    background-color="#333333"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    style="border: none"
                >
                    <el-menu-item index="" id="logo">黑骑预告片网站</el-menu-item>
                    <el-menu-item index="/">全部</el-menu-item>
                    <el-menu-item index="">科幻</el-menu-item>
                    <el-menu-item index="">惊悚</el-menu-item>
                    <el-menu-item index="">冒险</el-menu-item>
                    <el-menu-item index="">奇幻</el-menu-item>
                    <el-menu-item index="">悬疑</el-menu-item>
                    <el-menu-item index="">剧情</el-menu-item>
                    <el-menu-item index="">犯罪</el-menu-item>
                    <el-menu-item index="">灾难</el-menu-item>
                    <el-menu-item index="">恐怖</el-menu-item>
                    <el-menu-item index="">战争</el-menu-item>
                    <el-menu-item index="">喜剧</el-menu-item>
                    <el-menu-item index="">音乐</el-menu-item>
                    <el-menu-item index="">文艺</el-menu-item>
                    <el-menu-item index="">励志</el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </el-header>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: '/'
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                this.$router.push(key)
            }
        }
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
