<template>
    <div class="box">
        <v-header></v-header>
        <el-container>
            <v-aside></v-aside>
            <v-main ref="refCreated"></v-main>
        </el-container>
    </div>
</template>


<script>
    import header from './Header'
    import Aside from './Aside'
    import Main from './Main'
    import axios from '@/utils/axios'

    export default {
        data() {
            return {

            }
        },
        methods: {

        },
        destroyed() {
        },
        components: {
            'v-header': header,
            'v-aside': Aside,
            'v-main': Main
        }
    }
</script>

<style scoped>
</style>
