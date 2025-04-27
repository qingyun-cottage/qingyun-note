<script>
export default {
    name: "rulePopup",
    props: ['show'],
    data() {
        return {
            basePath: process.env.VUE_APP_BASE_API,
            isShowInfo: false,
        };
    },
    computed: {},
    components: {
        
    },
    mounted() {
        
    },
    destroyed() {},
    watch: {},
    methods: {
        // 同意
        agree(){
            localStorage.setItem('agree-rule-6', 1);
            this.$emit('close');
            this.gotoAuth();
        },
        // 不同意
        notAgree(){
            localStorage.setItem('last-time', new Date().getTime());
            this.$emit('close');
            this.gotoAuth();
        },
        // 去授权
        gotoAuth(){
            let openId = this.$route.query.type ? this.$route.query.openid : this.getQueryString('openId');
            if(!openId){
                if(window.location.hash == '#/gift'){
                    //没授权先授权
                    this.$api.getAuth({
                        url: process.env.NODE_ENV == 'development' ? `${process.env.VUE_APP_BASE_API}/h5/belmond-h5/#/gift` : `${process.env.VUE_APP_BASE_API}/h5/#/gift`,
                        c_source: this.getQueryString('c_source') ? this.getQueryString('c_source') : '',
                    }).then(res => {
                        if(res.code == 0){
                            window.location.href = res.data
                        }
                    })
                }else{
                    //没授权先授权
                    this.$api.getAuth({
                        url: process.env.NODE_ENV == 'development' ? `${process.env.VUE_APP_BASE_API}/h5/belmond-h5/` : `${process.env.VUE_APP_BASE_API}/h5/`,
                        c_source: this.getQueryString('c_source') ? this.getQueryString('c_source') : '',
                    }).then(res => {
                        if(res.code == 0){
                            window.location.href = res.data
                        }
                    })
                }
            }
        },
        getQueryString(name) {
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            let r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURIComponent(r[2]);
            };
            return null;
        },
    },
};
</script>

<template>
    <div class="popup" :class="{active: show}">
        <!-- h5使用条款 -->
        <div class="in">
            <div class="btn_close" @click="notAgree"></div>
            <div class="title">
                <img src="../assets/images/rule1_title.jpg" alt=""/>
            </div>
            <div class="content">
                <img src="../assets/images/rule1.jpg" alt=""/>
                <!-- <a class="link link1" :href="`${basePath}/belmond-info-rule/`"></a>
                <a class="link link2" :href="`${basePath}/belmond-info-rule/`"></a> -->
                <div class="link link1" @click="isShowInfo = true"></div>
                <div class="link link2" @click="isShowInfo = true"></div>
            </div>
            <div class="btn" @click="agree">同意</div>
            <div class="btn type2" @click="notAgree">不同意</div>
        </div>
        <!-- 个人信息处理规则 -->
        <div class="in" v-if="isShowInfo">
            <div class="btn_close" @click="isShowInfo = false"></div>
            <div class="title type2">
                <img src="../assets/images/rule2_title.jpg" alt=""/>
            </div>
            <div class="content">
                <img src="../assets/images/rule2.jpg" alt=""/>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.popup{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    visibility: hidden;
    transition: background-color .3s, visibility .3s;
    &.active{
        background: rgba(0, 0, 0, 0.5);
        visibility: visible;
        .in{
            opacity: 1;
            visibility: visible;
            transition-delay: .3s;
        }
    }
    img{
        width: 100%;
    }
    .in{
        background: #fff;
        width: 340px;
        height: 450px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        visibility: hidden;
        transition: opacity .3s, visibility .3s;
        padding-bottom: 20px;
        .btn_close{
            width: 20px;
            height: 20px;
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 1;
            &::before,
            &::after{
                content: "";
                width: 130%;
                border-top: 1px solid #ccc;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(45deg);
            }
            &::after{
                transform: translate(-50%, -50%) rotate(-45deg);
            }
        }
        .title{
            padding: 0 20px;
            &.title{
                padding: 0;
            }
        }
        .content{
            padding: 0 20px;
            overflow: hidden;
            overflow-y: auto;
            position: relative;
            margin-bottom: 20px;
            .link{
                width: 140px;
                height: 20px;
                position: absolute;
                // background: rgba(0, 0, 0, .5);
                &.link1{
                    top: 390px;
                    left: 85px;
                }
                &.link2{
                    top: 2680px;
                    left: 135px;
                }
            }
        }
        .btn{
            width: 100px;
            height: 30px;
            line-height: 30px;
            background: #000;
            color: #fff;
            text-align: center;
            font-size: 14px;
            margin-bottom: 10px;
            &.type2{
                text-decoration: underline;
                width: auto;
                height: auto;
                line-height: 1;
                background: none;
                color: #8b8b8b;
                margin-bottom: 0;
            }
        }
    }
}
</style>