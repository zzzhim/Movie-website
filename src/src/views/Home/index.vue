<template>
    <div>
        111
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
            axios({
                url: '/login',
                method: 'post'
            }).then(({ data }) => {

            })
        },
    }
</script>

<style scoped>

</style>
