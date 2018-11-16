<template>
    <div>
        <el-row>
            <el-row :span="24">
                <el-menu
                    :default-active="activeIndex"
                    router
                    class="el-menu-demo"
                    mode="horizontal"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                >
                    <el-menu-item index="/login">登录</el-menu-item>
                    <el-menu-item index="/registered">注册</el-menu-item >
                </el-menu>
            </el-row>
        </el-row>
    </div>
</template>


<script>
    import axios from '@/utils/axios'

    export default {
        data() {
            return {

            }
        },
        methods: {

        },
        mounted() {

        },
    }
</script>

<style scoped>

</style>
