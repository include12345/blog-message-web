<template>
    <div>
        <div class="login-container">
            <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
                <h3 class="title">博客管理平台</h3>
                <el-form-item prop="username">
                    <span class="svg-container svg-container_login">
                        <svg-icon icon-class="user"/>
                    </span>
                    <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placegolder="username" />
                </el-form-item>
                <el-form-item prop="password">
                    <span class="svg-container">
                        <svg-icon icon-class="password"/>
                    </span>
                    <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="password" />
                </el-form-item>
                <el-button type="primary" style="width:50%;" :loading="loading" @click.native.prevent="handleLogin">
                    登录
                </el-button>
                <!-- <el-button type="text" style="margin-left: 80px;" @click="dialogVisible = true">
                    找回密码
                </el-button> -->
            </el-form>
        </div>
        <!-- <el-dialog title="找回密码" :visible.sync="dialogVisible" v-if="dialogVisible">
            <el-input type="password" name="password1"  style="display:none"/>
            <div style="margin-left: 250px">
                <span>手机号:</span>
                <el-input v-model="cellphone" name="cellphone" placeholder="请输入手机号" style="margin-left: 10px;width:30%"></el-input>
                <el-button type="text" style="margin-left: 10px;" @click.native.prevent="handleSendCode">获取验证码</el-button><br><br>
                <div id="hide" style="padding-top:30px;padding-right:30px;display: none">
                    <span>验证码:</span>
                    <el-input v-model="code" name="code" type="text" placeholder="请输入验证码" style="margin-left: 10px;width:30%"></el-input><br><br>
                    <span>新密码:</span>
                    <el-input v-model="newPassword" name="newPassword" type="password" placeholder="请输入新密码" style="margin-left: 10px;width:30%" ></el-input><br><br>
                    <el-button type="primary" style="margin-left: 10px;" @click.native.prevent="handleUpdatePassword">提交</el-button><br><br>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>

<script>
    import {
        sendCodeByCellphone,
        updatePasswordByPhone
    } from '@/api/menu'
    import {
        validatCellphone,
        validatPassword
    } from '@/utils/validate'
    export default {
        name: 'login',
        data() {
            const validateUsername = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('用户名不能为空'))
                } else {
                    callback()
                }
            }
            const validatePass = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('密码不能为空'))
                } else {
                    callback()
                }
            }
            return {
                dialogVisible: false,
                cellphone: '',
                code: '',
                newPassword: '',
                loginForm: {
                    username: this.username,
                    password: this.password
                },
                loginRules: {
                    username: [{
                        required: true,
                        trigger: 'blur',
                        validator: validateUsername
                    }],
                    password: [{
                        required: true,
                        trigger: 'blur',
                        validator: validatePass
                    }]
                },
                loading: false
            }
        },
        methods: {
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    this.loading = true
                    this.$store.dispatch('Login', this.loginForm).then(() => {
                        this.loading = false
                        this.$router.push({
                            path: '/'
                        })
                    }).catch(() => {
                        this.loading = false
                    })
                })
            },
            handleSendCode() {
                console.log(this.cellphone)
                if (!this.cellphone || !validatCellphone(this.cellphone)) {
                    this.$message({
                        message: '手机号不能为空且必须为11位数字',
                        type: 'warning',
                        duration: 2000
                    })
                    return;
                }
                return new Promise((resolve, reject) => {
                    sendCodeByCellphone(this.cellphone).then(response => {
                        console.log(response)
                        if (response.code == 'success') {
                            this.$message({
                                message: '验证码发送已至' + this.cellphone + '，请注意查收',
                                type: 'success',
                                duration: 2000
                            })
                           document.getElementById('hide').style.display = "block";
                        }
                        if (response.code == 'fail') {
                            this.$message({
                                message: '手机号不存在：' + this.cellphone,
                                type: 'warning',
                                duration: 2000
                            })
                        }
                        if (response.code == 'exist') {
                            this.$message({
                                message: '验证码已发送，请勿重复操作：' + this.cellphone,
                                type: 'warning',
                                duration: 2000
                            })
                             document.getElementById('hide').style.display = "block";
                        }
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })
            },
            handleUpdatePassword() {
                console.log(this.cellphone + "," + this.newPassword + "," + this.code)
                if (!this.cellphone || !validatCellphone(this.cellphone)) {
                    this.$message({
                        message: '手机号不能为空且必须为11位数字',
                        type: 'warning',
                        duration: 2000
                    })
                    return;
                }
                if (!validatPassword(this.newPassword)) {
                    this.$message({
                        message: '密码必须为6-20位字母数字组合',
                        type: 'warning',
                        duration: 2000
                    })
                    return;
                }
                if (!this.code) {
                    this.$message({
                        message: '验证码不能为空',
                        type: 'warning',
                        duration: 2000
                    })
                    return;
                }
                return new Promise((resolve, reject) => {
                    updatePasswordByPhone(this.cellphone, this.newPassword, this.code).then(response => {
                        if (response.result == 'success') {
                            this.$message({
                                message: '密码修改成功：' + this.cellphone,
                                type: 'success',
                                duration: 2000
                            })
                        }
                        if (response.result == 'null') {
                            this.$message({
                                message: '验证码或手机号不存在：' + this.code + ',' + this.cellphone,
                                type: 'warning',
                                duration: 2000
                            })
                        }
                        if (response.result == 'fail') {
                            this.$message({
                                message: '修改密码失败' + this.cellphone,
                                type: 'warning',
                                duration: 2000
                            })
                        }
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    @import "src/styles/mixin.scss";
    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;
    .login-container {
        @include relative;
        height: 100vh;
        background-color: $bg;
        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
            -webkit-text-fill-color: #fff !important;
        }
        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
        }
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
        }
        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;
        }
        .svg-container {
            padding: 6px 5px 6px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
            &_login {
                font-size: 20px;
            }
        }
        .title {
            font-size: 26px;
            font-weight: 400;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
        .login-form {
            position: absolute;
            left: 0;
            right: 0;
            width: 400px;
            padding: 35px 35px 15px 35px;
            margin: 120px auto;
        }
        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
        }
        .thirdparty-button {
            position: absolute;
            right: 35px;
            bottom: 28px;
        }
    }
</style>