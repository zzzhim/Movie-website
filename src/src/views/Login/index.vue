<template>
    <div>
        <v-header :activeIndex="activeIndex"></v-header>
        <el-row class="box">
            <el-col :span="12" :offset="6">
                <el-form :model="userForm" status-icon :rules="rules" ref="userForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="账户" prop="email">
                        <el-input v-model="userForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="userForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('userForm')">登录</el-button>
                        <el-button @click="resetForm('userForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from '@/utils/axios'
    import { setToken } from '@/utils/cookie'
    import header from '@/components/header/header'
    
    export default {
        data() {
            // 密码验证
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请输入密码'))
                } else {
                    let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,16}$/
                    if (!reg.test(value)) {
                        callback(new Error("密码长度需6-16位，且包含字母和字符"))
                    } else {
                        callback()
                    }
                }
            }
            // 邮箱验证
            let validateEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入邮箱账号'))
                }else {
                    let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
                    if (!reg.test(value)) {
                        callback(new Error("邮箱格式不正确"))
                    } else {
                        callback();
                    }
                }
            }
            return {
                activeIndex: '/login',
                userForm: {
                    email: null,
                    password: null
                },
                rules: {
                    password: [
                        {  required: true, validator: validatePass, trigger: 'blur' },
                        {
                            min: 6,
                            max: 12,
                            message: "密码必须在6-12位之间",
                        }
                    ],
                    email: [
                        { required: true, validator: validateEmail, trigger: 'blur' }
                    ]
                },
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios({
                            url: '/login',
                            method: 'post',
                            data: this.userForm
                        }).then(({ data }) => {
                            // 设置token值
                            setToken(data.data.token)
                            this.$message({ // 消息提示
                                message: data.message,
                                type: 'success'
                            });
                            // 500毫秒后跳转到首页
                            setTimeout(() => {
                                this.$router.push('/')
                            }, 1000);
                        })
                    } else {
                        this.$message({ // 消息提示
                            message: '登录失败',
                            type: 'warning'
                        });
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        },
        components: {
            'v-header': header
        }
    }
</script>

<style scoped lang="less">
    .box {
        background-color: rgb(241, 241, 241);

        .demo-ruleForm {
            padding: 30px 0px;
        }
    }
</style>