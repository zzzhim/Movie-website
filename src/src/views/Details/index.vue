<template>
    <div>
        <el-row>
            <el-col :span="18">
                <img :src=" 'http://wangyafei---tupian.oss-cn-qingdao.aliyuncs.com/' + CardImg" alt="" class="img">
            </el-col>
            <el-col :span="6" class="box">
                    <h1 class="box-title">{{ title }}</h1>
                    <p class="box-content">{{ summary }}</p>
                    <!-- {{$route.query.tag}} -->
                    <el-collapse class="box-collapse">
                        <el-collapse-item title="推荐" name="1">
                            <router-link tag="div" :to="'/Details/' + item.doubanId + '?tag=' + item.movieTypes[0]"  v-for="(item, index) in recommend" :key="index" class="box-collapse-list">
                                {{ item.title }}
                            </router-link>
                        </el-collapse-item>
                    </el-collapse>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from '@/utils/axios'
    import moment from 'moment'

    export default {
        data() {
            return {
                CardImg: null,
                title: null,
                summary: null,
                recommend: null
            }
        },
        props: ['id'],
        methods: {

        },
        created() {
            axios({
                url: '/details',
                method: 'get',
                params: {
                    id: this.id,
                    tag: this.$route.query.tag
                }
            }).then(({ data }) => {
                if(data.success) {
                    let res = data.data.MovieAll[0]
                    this.recommend = data.data.recommend
                    this.CardImg = res.posterKey
                    this.title = res.title
                    this.summary = res.summary
                }
            })
        },
    }
</script>

<style scoped lang="less">
    .img {
        width: 100%;
        height: 100%;
    }
    .box {
        overflow: hidden;
        &-title {
            width: 100%;
            margin: 20px 0px;
            padding: 0px;
            font-size: 30px;
            text-align: center;
        }
        &-content {
            text-indent: 2em;
            font-size: 14px;
            letter-spacing: 2px;
            line-height: 1.5;
            margin-bottom: 30px;
        }
        &-collapse {

            &-list {
                text-indent: 2em;
                line-height: 40px;
                height: 40px;
                color: #333;
            }
        }
    }
</style>
