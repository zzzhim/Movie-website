<template>
    <el-aside>
        <el-row  class="tac">
            <el-col :span="24">
                    <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo box"
                        background-color="#ffffff"
                        text-color="#333"
                        active-text-color="#fff"
                    >
                        <el-menu-item index="" class="text-center">2025年上映</el-menu-item>
                        <el-menu-item index="" class="text-center">2024年上映</el-menu-item>
                        <el-menu-item index="" class="text-center">2023年上映</el-menu-item>
                        <el-menu-item index="" class="text-center">2022年上映</el-menu-item>
                        <el-menu-item index="" class="text-center">2021年上映</el-menu-item>
                        <el-menu-item index="" class="text-center">2020年上映</el-menu-item>
                        <el-menu-item index="" class="text-center">2019年上映</el-menu-item>
                        <el-menu-item index="" class="text-center">2018年上映</el-menu-item>
                    </el-menu>
            </el-col>
        </el-row>
    </el-aside>
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
    .box {
        height: 100%;
    }
    .text-center {
        text-align: center;
    }
</style>
