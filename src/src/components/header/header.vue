<template>
    <div>
        <el-header style="padding:0px">
            <el-row>
                <el-col :span="24">
                    <el-menu
                        :default-active="activeIndex"
                        class="el-menu-demo"
                        mode="horizontal"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        @select="handleSelect"
                    >
                        <el-menu-item index="/login">登录</el-menu-item>
                        <el-menu-item index="/registered">注册</el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
        </el-header>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props: {
            activeIndex: String
        },
        methods: {
            handleSelect(key, keyPath) {
                this.$router.push(key)
            }
        }
    }
</script>

<style lang="less">
    
</style>