<template>
    <el-main>
        <el-row :gutter="20" id="box">
            <el-col :span="6" class="box" v-for="(item, index) in CardData" :key="index">
                <el-card :body-style="{ padding: '0px' }" class="box-card">
                    <router-link to="" tag="div" class="box-card-box">
                        <img :src=" 'http://wangyafei---tupian.oss-cn-qingdao.aliyuncs.com/' + item.posterKey" class="box-card-box-image">
                    </router-link>
                    <div style="padding: 14px;">
                        <router-link  class="box-card-title" tag="div" to=""> {{ item.title }}</router-link>
                        <router-link to="" tag="div" class="box-card-content" :title="item.summary">
                            {{ item.summary }}
                        </router-link>
                    </div>
                    <div class="box-card-footer">
                        <div>
                            <i class="el-icon-time"></i>
                            {{ item.meta.createdAt }}&nbsp;&nbsp;天前更新
                        </div>
                        <div>
                            <i class="el-icon-star-off"></i>
                            {{ item.rate }}分
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </el-main>
</template>

<script>
    import axios from '@/utils/axios'
    import moment from 'moment'
    import { mapState, mapMutations } from 'vuex'

    export default {
        data() {
            return {
            }
        },
        computed: {
            ...mapState(['CardData']),
        },
    }
</script>

<style lang="less">
    #box {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
    .box {
        margin-bottom: 20px;
        .box-card {
            &-box {
                width: 100%;
                height: 390px;
                overflow: hidden;
                &-image {
                    width: 100%;
                    height: 423px;
                    font-size: 0px;
                }
            }
            &-title {
                text-overflow: ellipsis;
                white-space: nowrap;
                color: rgba(0, 0, 0, 0.85);
                font-weight: 500;
                overflow: hidden;
                margin-bottom: 8px;
            }
            &-content {
                // height: 242px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
                font-size: 14px;
                line-height: 1.5;
                color: rgba(0, 0, 0, 0.45);
            }
            &-footer {
                height: 46px;
                border-top: 1px solid rgb(232, 232, 232);
                background: rgb(250, 250, 250);
                display: flex;
                justify-content: space-between;
                align-items: center;

                div {
                    width: 100%;
                    height: 46px;
                    line-height: 46px;
                    text-align: center;
                    position: relative;
                }
                & div:first-child::after{
                    content: '';
                    height: 20px;
                    width: 1px;
                    position: absolute;
                    top: 50%;
                    right: 0px;
                    transform: translateY(-50%);
                    z-index: 999;
                    background: #ccc;
                }
            }
        }
    }
</style>