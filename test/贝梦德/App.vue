<template>
    <div id="app">
        <!-- 是否刷新 -->
        <template v-if="isRouterAlive">
            <!-- 判断是否缓存 -->
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </template>

        <!-- 全局loadding -->
        <audio
            src="./assets/ASMR_2.mp3"
            loop="loop"
            id="myAudio"
            preload="true"
        ></audio>
        <div class="mask">
            <van-overlay :show="isShow">
                <div class="app-wrapper" @click.stop>
                    <div class="block">
                        <img src="./assets/images/loadding.gif" alt />
                    </div>
                </div>
            </van-overlay>
        </div>
    </div>
</template>
<script>
import wxapi from '@/util/wxShare.js'
export default {
    name: 'App',
    provide() {
        //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
        return {
            reload: this.reload,
        }
    },
    data() {
        return {
            isRouterAlive: true, //控制视图是否显示的变量
        }
    },
    mounted() {
        //先判断有没有授权(判断地址栏code，有就-用户同意了授权，没有-没授权或者拒绝授权)
        try {
            var access_token = this.getQueryString('access_token') //此处使用的是history路由模式，hash这么拿不到。
            let openId = this.$route.query.type
                ? this.$route.query.openid
                : this.getQueryString('openId')
            if (openId) {
                this.$api.getUserInfo({ openId }).then(res => {
                    if (res.code == 0) {
                        localStorage.setItem(
                            'userInfo',
                            JSON.stringify(res.data)
                        )
                        localStorage.setItem('unionid', res.data.unionid)
                        localStorage.setItem('openId', res.data.openId)
                        localStorage.setItem('access_token', access_token)
                        // this.addTrackScript()

                        // console.log('openId', localStorage.getItem('openId'));
                        // console.log('unionid', localStorage.getItem('unionid'));
                        // console.log(clab_tracker);
                        clab_tracker.push({
                            // identityType: 'unionid',
                            identityType: 'wechat-unionid',
                            identityValue: localStorage.getItem('unionid'),
                            // identityType2: 'wechat',
                            // identityValue2: localStorage.getItem('openId'),
                        })
                    }
                })
            } else if (localStorage.getItem('agree-rule-6') == 1) {
                if (window.location.hash == '#/gift') {
                    //没授权先授权
                    this.$api
                        .getAuth({
                            url:
                                process.env.NODE_ENV == 'development'
                                    ? `${process.env.VUE_APP_BASE_API}/h5/belmond-h5/#/gift`
                                    : `${process.env.VUE_APP_BASE_API}/h5/#/gift`,
                            c_source: this.getQueryString('c_source')
                                ? this.getQueryString('c_source')
                                : '',
                        })
                        .then(res => {
                            if (res.code == 0) {
                                window.location.href = res.data
                            }
                        })
                } else {
                    //没授权先授权
                    this.$api
                        .getAuth({
                            url:
                                process.env.NODE_ENV == 'development'
                                    ? `${process.env.VUE_APP_BASE_API}/h5/belmond-h5/`
                                    : `${process.env.VUE_APP_BASE_API}/h5/`,
                            c_source: this.getQueryString('c_source')
                                ? this.getQueryString('c_source')
                                : '',
                        })
                        .then(res => {
                            if (res.code == 0) {
                                window.location.href = res.data
                            }
                        })
                }
            }
        } catch {}
    },
    computed: {
        // 是否显示loadding
        isShow() {
            return this.$store.getters.isLoadingShow
        },
    },
    methods: {
        addTrackScript() {
            var sdk = document.createElement('script')
            sdk.onload = function () {
                var setting = document.createElement('script')
                // 如果您需要兼容IE，请使用字符串拼接，不要使用ES6提供的模版字符串
                // setting.innerHTML = 'clab_tracker.setEnableAutoTrackOpenPage(true)\n' +
                //                     'clab_tracker.setEnableAutoTrackExitPage(true)\n' +
                //                     'clab_tracker.setEnableAutoTrackClick(true)\n'

                setting.innerHTML = `
                clab_tracker.setEnableAutoTrackOpenPage(true)
                clab_tracker.setEnableAutoTrackExitPage(true)
                clab_tracker.setEnableAutoTrackClick(true)
                // 其他设置
                `
                document.getElementsByTagName('head')[0].appendChild(setting)
            }

            sdk.setAttribute(
                'src',
                '//cbe.convertlab.com/cbe/collect?tid=5460934712127893362&at=0&h=web'
            )
            document.getElementsByTagName('head')[0].appendChild(sdk)
            // console.log('openId', localStorage.getItem('openId'));
            // console.log('unionid', localStorage.getItem('unionid'));
            // console.log(clab_tracker);
            clab_tracker.push({
                identityType: 'unionid',
                identityValue: localStorage.getItem('unionid'),
                // identityType2: 'wechat',
                // identityValue2: localStorage.getItem('openId'),
            })
        },
        getQueryString(name) {
            let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
            let r = window.location.search.substr(1).match(reg)
            if (r != null) {
                return decodeURIComponent(r[2])
            }
            return null
        },
        // getParams(params) {
        //     let str = window.location.href
        //     let arr = str.split('?')
        //     if(arr.length == 1){
        //         return null
        //     }else{
        //         let arr1 = arr[1].split('&')
        //         let openId = arr1[0].split('=')[1]
        //         let access_token = arr1[1].split('=')[1].replace('#/', '')
        //         if(params == 'openId'){
        //             return openId
        //         }else{
        //             return access_token
        //         }
        //     }
        // },
        reload() {
            this.isRouterAlive = false //先关闭，
            this.$nextTick(function () {
                this.isRouterAlive = true //再打开
            })
        },
    },
}
</script>

<style lang="less">
// *{
// font-family: "HiraginoSansGB" !important;
// }

.mask {
    // loadding层级
    .van-overlay {
        z-index: 9999;
        background-color: rgba(0, 0, 0, 0.7) !important;
    }
    .app-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        z-index: 9999;
        .block {
            width: 120px;
            height: 120px;
            background-color: #ffffff;
            //   .bdr(4px);
            border-radius: 4px;
            position: relative;
            box-sizing: border-box;
            img {
                width: 120px;
                height: 120px;
                box-sizing: border-box;
                position: absolute;
                top: 0;
                left: 0;
            }
        }
    }
}
.box {
    padding: 0 10px;
    background: #ffffff;
    border-radius: 8px;
}
</style>
