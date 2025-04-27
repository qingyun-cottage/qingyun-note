<template>
    <!-- <div v-if="openId"> -->
    <div>
        <div>
            <div>
                <div class="page no-touch">
                    <div v-if="type == 1" class="page1">
                        <div class="videoBox">
                            <video
                                id="myVideo"
                                preload
                                muted
                                src="../../assets/images/v2.mp4"
                                loop
                                webkit-playsinline="true"
                                playsinline="true"
                                v-if="isIOS"
                            ></video>
                            <video
                                id="myVideo"
                                preload
                                muted
                                src="../../assets/images/v2.mp4"
                                poster="../../assets/images/indexBack.png"
                                loop
                                webkit-playsinline="true"
                                playsinline="true"
                                v-else
                            ></video>
                            <!-- <video id="myVideo" preload muted src="../../assets/images/v2.mp4" poster="" loop webkit-playsinline="true" playsinline="true" ></video> -->
                        </div>
                        <div
                            class="mask fadeInDown"
                            :class="animatedIClass"
                        ></div>
                        <div class="content">
                            <div class="logo fadeIn" :class="animatedIClass">
                                <img
                                    src="../../assets/images/logo.png"
                                    alt=""
                                />
                            </div>
                            <div
                                class="text txt_center fadeIn delay1"
                                :class="animatedIClass"
                            >
                                每一次心的起伏
                            </div>
                            <div
                                class="text txt_center fadeIn delay1"
                                :class="animatedIClass"
                            >
                                都是一段心之所向的传奇之旅
                            </div>
                            <div
                                class="play"
                                @click="play"
                                v-show="isPlay && isAndroidOrIOS() == 'android'"
                            >
                                <img
                                    class="fadeIn"
                                    :class="animatedIClass"
                                    src="../../assets/images/play.png"
                                    alt=""
                                />
                            </div>
                            <div class="btnBox">
                                <div
                                    class="btn flex_btn fadeIn delay2"
                                    :class="animatedIClass"
                                    @click.stop="find"
                                >
                                    发现你的心之所向
                                </div>
                                <!-- <div class="checkbox_wrap" @click="isCheck = !isCheck">
                                    <div class="checkbox" :class="{active: isCheck}"></div>
                                    <p>同意<u>贝梦德网页使用条款和条件</u></p>
                                </div> -->
                            </div>
                        </div>
                        <RulePopup
                            :show="isShowRule"
                            @close="isShowRule = false"
                        />
                    </div>
                    <div
                        v-else-if="type == 2 || type == 3 || type == 4"
                        class="page2"
                    >
                        <div class="videoBox">
                            <div v-for="(item, index) in imgs" :key="index">
                                <div
                                    class="imgBox fadeIn"
                                    :class="
                                        [
                                            activeIndex == index
                                                ? 'show'
                                                : 'hide',
                                        ] +
                                        ' ' +
                                        animatedIClass
                                    "
                                >
                                    <img
                                        ref="imgBgi"
                                        class="imgBackgroundImg"
                                        :src="item"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            class="backBox fadeIn"
                            :class="
                                [type == 4 ? 'hide' : 'show'] +
                                ' ' +
                                animatedIClass
                            "
                        >
                            <img
                                src="../../assets/images/selSoundBack.png"
                                alt=""
                            />
                        </div>
                        <!-- 结果页面 -->
                        <div class="page4 page" v-if="type == 4">
                            <div
                                class="posterBox"
                                v-show="posterImgShow"
                                @click="posterImgShow = false"
                            >
                                <div class="posterPop" @click.stop>
                                    <div class="imgBox">
                                        <img
                                            class="close"
                                            style="z-index: 100"
                                            src="../../assets/images/close.png"
                                            alt=""
                                            @click.stop="posterImgShow = false"
                                        />
                                        <img
                                            class="img"
                                            :class="{ andriod: !isIOS }"
                                            :src="imgUrl"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="content2">
                                <div class="parent">
                                    <div
                                        class="head dis_flex items_center jus_between fadeIn"
                                        :class="animatedIClass"
                                    >
                                        <div class="logo">
                                            <img
                                                src="../../assets/images/logo.png"
                                                alt=""
                                            />
                                        </div>
                                        <div
                                            class="music flex_btn flex_column"
                                            @click.stop="listen"
                                        >
                                            <img
                                                src="../../assets/images/listen.png"
                                                alt=""
                                            />
                                            <div>重新聆听</div>
                                        </div>
                                    </div>
                                    <div
                                        class="info flex_btn flex_column fadeIn"
                                        :class="animatedIClass"
                                    >
                                        <img
                                            class="avatar"
                                            v-if="info.headImg"
                                            :src="info.headImg"
                                            alt=""
                                        />
                                        <div class="avatar" v-else></div>
                                        <div class="name txt_center">
                                            {{ info.nickName || '' }}
                                        </div>
                                    </div>
                                    <div
                                        class="result-text txt_center fadeIn delay1"
                                        :class="animatedIClass"
                                    >
                                        <div class="txt_center">
                                            你心之所向的旅程是一次「<strong>{{
                                                info.result
                                            }}</strong
                                            >」
                                        </div>
                                        <div>你的内心充满着</div>
                                    </div>

                                    <div
                                        class="heart fadeIn delay1"
                                        :class="animatedIClass"
                                    >
                                        <img
                                            src="../../assets/images/heart.png"
                                            alt=""
                                        />
                                        <div class="div1">
                                            10%{{
                                                JSON.parse(info.rate)[0]['10%']
                                            }}
                                        </div>
                                        <div class="div2">
                                            20%{{
                                                JSON.parse(info.rate)[0]['20%']
                                            }}
                                        </div>
                                        <div class="div3">
                                            30%{{
                                                JSON.parse(info.rate)[0]['30%']
                                            }}
                                        </div>
                                        <div class="div4">
                                            40%{{
                                                JSON.parse(info.rate)[0]['40%']
                                            }}
                                        </div>
                                    </div>
                                    <div
                                        class="longPress"
                                        @touchstart="gtouchstart"
                                        @touchmove="gtouchmove"
                                        @touchend="gtouchend"
                                    >
                                        <img
                                            class="posterImg"
                                            :class="{ andriod: !isIOS }"
                                            :src="imgUrl"
                                            alt=""
                                            v-if="!isIOS"
                                        />
                                    </div>
                                </div>
                                <div class="bottom">
                                    <div
                                        class="label txt_center fadeIn delay2"
                                        :class="animatedIClass"
                                    >
                                        你心之所向的传奇旅程目的地
                                    </div>
                                    <div class="imgs dis_flex jus_around">
                                        <div
                                            class="animation-imgBox flex_btn flex_column"
                                            v-for="(item, index) in resImgs"
                                            :key="index"
                                            @click.stop.prevent="pop(item)"
                                            :class="
                                                mgDelayClassName +
                                                (index + 1) +
                                                ' ' +
                                                imgBoxClass
                                            "
                                        >
                                            <img :src="item.url" alt="" />
                                            <div class="name txt_center">
                                                {{ item.name }}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="follow"
                                        :class="animatedIClass"
                                        v-if="type == 4"
                                    >
                                        <!-- <div class="btns flex_btn fadeIn" :class="animatedIClass" @click.stop="officialPopShow">关注贝梦德 解锁传奇臻礼</div> -->
                                        <div
                                            class="btns flex_btn fadeIn"
                                            :class="animatedIClass"
                                            v-if="isMP"
                                            @click="gotoMPIndex"
                                        >
                                            探索非凡体验
                                        </div>
                                        <div
                                            class="btns flex_btn fadeIn"
                                            :class="animatedIClass"
                                            v-else
                                        >
                                            探索非凡体验
                                            <div
                                                style="
                                                    width: 100%;
                                                    height: 100%;
                                                    position: absolute;
                                                    top: 0;
                                                    left: 0;
                                                    opacity: 0;
                                                "
                                            >
                                                <wx-open-launch-weapp
                                                    id="launch-btn"
                                                    appid="wx0d4309aad3042520"
                                                    path="/pages/index/index"
                                                    env-version="release"
                                                >
                                                    <script
                                                        type="text/wxtag-template"
                                                    >
                                                        <button style="width: 200px; height: 45px; text-align: center; font-size: 17px; display: block; margin: 0 auto; padding: 8px 24px; border: none; border-radius: 4px; background-color: #07c160; color:#fff;">打开小程序</button>
                                                    </script>
                                                </wx-open-launch-weapp>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="content1" v-else>
                            <div class="logo fadeIn" :class="animatedIClass">
                                <img
                                    src="../../assets/images/logo.png"
                                    alt=""
                                />
                            </div>
                            <!-- 聆听页面 -->
                            <div v-if="type == 2">
                                <div
                                    class="music fadeIn delay1"
                                    :class="animatedIClass"
                                >
                                    <img
                                        src="../../assets/images/music.png"
                                        alt=""
                                    />
                                    <div class="time">
                                        {{ formatTime(currentTime) }}
                                    </div>
                                </div>
                                <div
                                    class="ripple fadeIn delay1"
                                    :class="animatedIClass"
                                >
                                    <div
                                        class="ripMask"
                                        :style="{
                                            width: `${playWidth * 100}%`,
                                        }"
                                    >
                                        <img
                                            src="../../assets/images/voice.gif"
                                            alt=""
                                        />
                                    </div>
                                    <img
                                        class="img"
                                        src="../../assets/images/voice.gif"
                                        alt=""
                                    />
                                </div>
                                <div
                                    class="desc txt_center fadeIn delay1"
                                    :class="animatedIClass"
                                >
                                    <div>戴上耳机，聆听心声</div>
                                    <div>开启一段60秒的传奇之旅</div>
                                    <div>去发现你的心之所向</div>
                                </div>
                                <div
                                    class="btn flex_btn fadeIn delay2"
                                    :class="animatedIClass"
                                    @click.stop="finish"
                                >
                                    聆听完成
                                </div>
                            </div>
                            <!-- 选择声音页面 -->
                            <div v-else-if="type == 3" class="page3">
                                <div
                                    class="desc txt_center fadeIn"
                                    :class="animatedIClass"
                                >
                                    <div>按先后选择你心中聆听到的那4个声音</div>
                                    <div>发现你的心之所向</div>
                                </div>
                                <div
                                    class="items fadeIn delay1"
                                    :class="animatedIClass"
                                >
                                    <div
                                        class="item flex_btn"
                                        :class="{ active: item.isSel }"
                                        v-for="(item, index) in items"
                                        :key="index"
                                        @click.stop="selSound(item)"
                                    >
                                        <img
                                            src="../../assets/images/sel.png"
                                            alt=""
                                            v-if="item.isSel"
                                        />
                                        <img
                                            src="../../assets/images/unsel.png"
                                            alt=""
                                            v-else
                                        />
                                        <div class="txt_center">
                                            {{ item.soundName }}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="btn flex_btn fadeIn delay2"
                                    :class="animatedIClass"
                                    @click="confirm"
                                >
                                    确定心声
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="mask-big imgDelay5 fadeInDown"
                        :class="animatedIClass"
                        v-if="type == 4 && mask"
                    >
                        <div>
                            <img src="../../assets/images/finger_click.png" />
                            <p>长按此处保存</p>
                            <p>分享你心之所向的传奇旅程</p>
                        </div>
                    </div>
                    <van-popup v-model="popShow">
                        <div class="pop" v-if="selItem">
                            <div class="imgBox">
                                <img
                                    class="close"
                                    src="../../assets/images/close.png"
                                    alt=""
                                    @click.stop="popShow = false"
                                />
                                <img class="img" :src="selItem.popUrl" alt="" />
                            </div>
                        </div>
                    </van-popup>
                    <van-popup v-model="officialPop">
                        <div class="pops">
                            <div class="infoBox flex_btn flex_column">
                                <img
                                    class="close"
                                    src="../../assets/images/close.png"
                                    alt=""
                                    @click="officialPop = false"
                                />
                                <div class="label txt_center">
                                    请长按扫码关注公众号并回复暗号
                                </div>
                                <div class="text dis_flex items_center">
                                    心之所向
                                </div>
                                <div class="imgBox">
                                    <img
                                        src="../../assets/images/ewm.png"
                                        alt=""
                                    />
                                </div>
                                <div class="tips">即可获得传奇臻礼</div>
                            </div>
                        </div>
                    </van-popup>
                    <!-- <van-popup v-model="screenshotPop">
                        <div class="pop" style="height: auto;">
                            <div class="imgBox">
                                <img class="close" style="z-index: 100;" src="../../assets/images/close.png" alt="" @click.stop="screenshotPop = false">
                                <img class="img" :src="screenshotUrl" alt="">
                            </div>
                        </div>
                    </van-popup> -->

                    <div class="fix"></div>
                </div>
                <!-- 需要生成图片的页面 -->
                <div class="poster page2" v-if="posterShow">
                    <div class="videoBox">
                        <div v-for="(item, index) in imgs" :key="index">
                            <div
                                class="imgBox"
                                :class="[
                                    activeIndex == index ? 'show' : 'hide',
                                ]"
                            >
                                <img
                                    ref="imgBgi"
                                    class="imgBackgroundImg"
                                    :src="item"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <div class="page4 page">
                        <div class="content2">
                            <div class="parent">
                                <div
                                    class="head dis_flex items_center jus_between"
                                >
                                    <div class="logo">
                                        <img
                                            src="../../assets/images/logo.png"
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div class="info flex_btn flex_column">
                                    <img
                                        class="avatar"
                                        v-if="info.headImg"
                                        :src="info.headImg"
                                        alt=""
                                    />
                                    <div class="avatar" v-else></div>
                                    <div class="name txt_center">
                                        {{ info.nickName || '' }}
                                    </div>
                                </div>
                                <div class="result-text txt_center">
                                    <div class="txt_center">
                                        你心之所向的旅程是一次「<strong>{{
                                            info.result
                                        }}</strong
                                        >」
                                    </div>
                                    <div>你的内心充满着</div>
                                </div>
                                <div class="heart">
                                    <img
                                        src="../../assets/images/heart.png"
                                        alt=""
                                    />
                                    <div class="div1">
                                        10%{{ JSON.parse(info.rate)[0]['10%'] }}
                                    </div>
                                    <div class="div2">
                                        20%{{ JSON.parse(info.rate)[0]['20%'] }}
                                    </div>
                                    <div class="div3">
                                        30%{{ JSON.parse(info.rate)[0]['30%'] }}
                                    </div>
                                    <div class="div4">
                                        40%{{ JSON.parse(info.rate)[0]['40%'] }}
                                    </div>
                                </div>
                            </div>
                            <div class="bottom">
                                <div class="label txt_center">
                                    你心之所向的传奇旅程目的地
                                </div>
                                <div class="imgs dis_flex jus_around">
                                    <div
                                        class="animation-imgBox flex_btn flex_column"
                                        v-for="(item, index) in resImgs"
                                        :key="index"
                                    >
                                        <img :src="item.url" alt="" />
                                        <div class="name txt_center">
                                            {{ item.name }}
                                        </div>
                                    </div>
                                </div>
                                <div class="QR-code">
                                    <img
                                        src="../../assets/images/ewm_w.png"
                                        alt=""
                                    />
                                    <div class="share-parent">
                                        <div>
                                            <p>扫描二维码发现你</p>
                                            <p>心之所向的传奇之旅</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="noPage" v-else>
            <img src="../../assets/images/poster.png" alt="">
        </div> -->
        </div>
    </div>
</template>

<script>
import { dataURLToFile } from '../../util/toFile.js'
import html2canvas from 'html2canvas'
var timeOutEvent = null
import wxapi from '@/util/wxShare.js'
import RulePopup from '../../components/rulePopup.vue'
export default {
    data() {
        return {
            // isCheck: false,
            isShowRule: false,
            isMP: false,
            isPlay: true,
            type: 1,
            activeIndex: null,
            imgs: [
                require('../../assets/images/background1.jpg'),
                require('../../assets/images/background2.jpg'),
                require('../../assets/images/background3.jpg'),
                require('../../assets/images/background4.jpg'),
                require('../../assets/images/background5.jpg'),
            ],
            items: [
                {
                    id: 1,
                    soundName: '敲响服务的铃声',
                    color: '粉',
                    isSel: false,
                },
                {
                    id: 2,
                    soundName: '隐逸庄园清晨的鸟鸣',
                    color: '绿',
                    isSel: false,
                },
                {
                    id: 3,
                    soundName: '奏响工业文明的火车鸣笛',
                    color: '米白',
                    isSel: false,
                },
                {
                    id: 4,
                    soundName: '驶向未知的铁轨轰鸣声',
                    color: '黄',
                    isSel: false,
                },
                {
                    id: 5,
                    soundName: '远航的流水潺潺声',
                    color: '粉',
                    isSel: false,
                },
                {
                    id: 6,
                    soundName: '层层浪花拍打声',
                    color: '绿',
                    isSel: false,
                },
                {
                    id: 7,
                    soundName: '野外篝火的滋滋声',
                    color: '米白',
                    isSel: false,
                },
                {
                    id: 8,
                    soundName: '草原猎场的奔跑声',
                    color: '黄',
                    isSel: false,
                },
                {
                    id: 9,
                    soundName: '天真烂漫的孩童嬉笑声',
                    color: '白',
                    isSel: false,
                },
            ],
            ids: [],
            resultId: null,
            popShow: false, //  详情弹框
            officialPop: false, //  公众号弹框
            result: [
                {
                    resultId: 1,
                    result: '探古寻今的邂逅',
                    imgs: [
                        {
                            url: require('../../assets/images/result2-1.png'),
                            name: '威尼斯•辛普伦 东方快车',
                            popUrl: require('../../assets/images/popResult/popResultBack2-1.png'),
                            popIconUrl: require('../../assets/images/popResult/popResultIcon2-1.png'),
                            p1: '这趟列车，吸引世界游客纷纷搭乘，',
                            p2: '车厢内镶嵌蔚蓝玻璃，铺着东方黑漆地板，',
                            p3: '身穿制服乘务员，面带微笑恭候您的搭乘。',
                        },
                        {
                            url: require('../../assets/images/result2-2.png'),
                            name: '齐普里亚尼',
                            popUrl: require('../../assets/images/popResult/popResultBack2-2.png'),
                            popIconUrl: require('../../assets/images/popResult/popResultIcon2-2.png'),
                            p1: '入住奇普里亚尼酒店，远眺270度海景。',
                            p2: '俯瞰整个水域，欣赏从总督宫到圣乔治教堂甚至',
                            p3: '更远岛屿的美景。',
                        },
                        {
                            url: require('../../assets/images/result4-1.png'),
                            name: '法国慢调游轮',
                            popUrl: require('../../assets/images/popResult/popResultBack3-4.png'),
                            popIconUrl: require('../../assets/images/popResult/popResultIcon3-4.png'),
                            p1: '游轮在伊洛瓦底河上漂荡，',
                            p2: '白天在观景台烧烤，晚上在浪漫星空下晚宴，',
                            p3: '私人船舱的柚木硬装和丝绸软装充满缅甸风格。',
                        },
                        {
                            url: require('../../assets/images/result4-4.png'),
                            name: '萨缪特大象营地',
                            popUrl: require('../../assets/images/popResult/popResultBack4-4.png'),
                            popIconUrl: require('../../assets/images/popResult/popResultIcon2-4.png'),
                            p1: '在奥卡万戈三角洲中心的私人岛屿上，',
                            p2: '您可以近距离接近翱翔的鱼鹰、栖息的河马，',
                            p3: '在独木舟上将非洲的纵野尽收眼下。',
                        },
                    ],
                },
                {
                    resultId: 2,
                    result: '五洲四海的遨游',
                    imgs: [
                        {
                            url: require('../../assets/images/result4-4.png'),
                            name: '萨缪特大象营地',
                            popUrl: require('../../assets/images/popResult/popResultBack4-4.png'),
                            popIconUrl: require('../../assets/images/popResult/popResultIcon3-1.png'),
                            p1: '帐篷式房间，设有全景式私人甲板，',
                            p2: '是您欣赏非洲原野的完美之地，',
                            p3: '您可以在营地静谧的泳池放松身心，围坐火炉分享您的故事。',
                        },
                        {
                            url: require('../../assets/images/result3-3.png'),
                            name: '蒂梅奥',
                            popUrl: require('../../assets/images/popResult/popResultBack3-3.png'),
                            popIconUrl: require('../../assets/images/popResult/popResultIcon3-2.png'),
                            p1: '这是南美洲第一列豪华卧铺列车，',
                            p2: '当列车在安第斯平原上呼啸而过，',
                            p3: '复古内饰在窗外风景映衬下更显华贵。',
                        },
                        {
                            url: require('../../assets/images/result4-1.png'),
                            name: '法国慢调游轮',
                            popUrl: require('../../assets/images/popResult/popResultBack3-4.png'),
                            popIconUrl: require('../../assets/images/popResult/popResultIcon3-3.png'),
                            p1: '酒店位于陶尔米纳的中心地带，',
                            p2: ' 享有一个多世纪以来令人着迷的美景，',
                            p3: '甚至可以凝视海岸对面的埃特纳火山。',
                        },
                        {
                            url: require('../../assets/images/result3-2.png'),
                            name: '安第斯探险家号',
                            popUrl: require('../../assets/images/popResult/popResultBack3-2.png'),
                            popIconUrl: require('../../assets/images/popResult/popResultIcon3-4.png'),
                            p1: '游轮在伊洛瓦底河上漂荡，',
                            p2: '白天在观景台烧烤，晚上在浪漫星空下晚宴，',
                            p3: '私人船舱的柚木硬装和丝绸软装充满缅甸风格。',
                        },
                    ],
                },
                {
                    resultId: 3,
                    result: '回归心灵的谧享',
                    imgs: [
                        {
                            url: require('../../assets/images/result4-1.png'),
                            name: '法国慢调游轮',
                            popUrl: require('../../assets/images/popResult/popResultBack3-4.png'),
                            popIconUrl: require('../../assets/images/popResult/popResultIcon4-1.png'),
                            p1: '沿着风景如画的河道一路前行，',
                            p2: '你可以在甲板上享用美味佳肴，',
                            p3: '在停泊岸边后，体验丰富的户外活动。',
                        },
                        {
                            url: require('../../assets/images/result4-2.png'),
                            name: '索莱城堡',
                            popUrl: require('../../assets/images/popResult/popResultBack4-2.png'),
                            popIconUrl: require('../../assets/images/popResult/popResultIcon4-2.png'),
                            p1: '酒店本身的历史可以追溯到10世纪，',
                            p2: ' 多年来，它接待过皇室成员、电影明星和政治名人。',
                            p3: '如今，经过精心修复，传奇光影依旧历历在目。',
                        },
                        {
                            url: require('../../assets/images/result4-3.png'),
                            name: '亚洲东方快车',
                            popUrl: require('../../assets/images/popResult/popResultBack4-3.png'),
                            popIconUrl: require('../../assets/images/popResult/popResultIcon4-3.png'),
                            p1: '抛光木制走廊和丝绸陈设，装饰华丽餐车，',
                            p2: ' 铺着白色亚麻布的餐桌，陈列着异国美食，',
                            p3: '在水晶餐具间觥筹交错，开启贵族之旅。',
                        },
                        {
                            url: require('../../assets/images/result4-4.png'),
                            name: '萨缪特大象营地',
                            popUrl: require('../../assets/images/popResult/popResultBack4-4.png'),
                            popIconUrl: require('../../assets/images/popResult/popResultIcon4-4.png'),
                            p1: '营地客房让您与迷人的景致融为一体，',
                            p2: '黄昏或黎明，俯瞰水潭，观赏大象和猎豹。',
                            p3: '当您泛起惺忪睡意，酒店是您完美落脚点。',
                        },
                    ],
                },
                {
                    resultId: 4,
                    result: '无与伦比的奢享',
                    imgs: [
                        {
                            url: require('../../assets/images/result2-4.png'),
                            name: '诗浦兰蒂朵',
                            popUrl: require('../../assets/images/popResult/popResultBack2-4.png'),
                            popIconUrl: require('../../assets/images/popResult/popResultIcon1-1.png'),
                            p1: '帐入住11世纪酒店，享受贵族体验。',
                            p2: '漫步在玫瑰丛向天攀升的百年花园，',
                            p3: '这里绝对给你无出其右的独特体验。',
                        },
                        {
                            url: require('../../assets/images/result2-1.png'),
                            name: '威尼斯•辛普伦 东方快车',
                            popUrl: require('../../assets/images/popResult/popResultBack2-1.png'),
                            popIconUrl: require('../../assets/images/popResult/popResultIcon2-1.png'),
                            p1: '这趟列车，吸引世界游客纷纷搭乘，',
                            p2: '车厢内镶嵌蔚蓝玻璃，铺着东方黑漆地板，',
                            p3: '身穿制服乘务员，面带微笑恭候您的搭乘。',
                        },
                        {
                            url: require('../../assets/images/result4-1.png'),
                            name: '法国慢调游轮 ',
                            popUrl: require('../../assets/images/popResult/popResultBack3-4.png'),
                            popIconUrl: require('../../assets/images/popResult/popResultIcon4-1.png'),
                            p1: '沿着风景如画的河道一路前行，',
                            p2: '你可以在甲板上享用美味佳肴，',
                            p3: '在停泊岸边后，体验丰富的户外活动。',
                        },
                        {
                            url: require('../../assets/images/result4-4.png'),
                            name: '萨缪特大象营地',
                            popUrl: require('../../assets/images/popResult/popResultBack4-4.png'),
                            popIconUrl: require('../../assets/images/popResult/popResultIcon2-4.png'),
                            p1: '在奥卡万戈三角洲中心的私人岛屿上，',
                            p2: '您可以近距离接近翱翔的鱼鹰、栖息的河马，',
                            p3: '在独木舟上将非洲的纵野尽收眼下。',
                        },
                    ],
                },
                {
                    resultId: 5,
                    result: '满载雀跃的欢聚',
                    imgs: [
                        {
                            url: require('../../assets/images/result5-1.png'),
                            name: '圣安德里亚别墅',
                            popUrl: require('../../assets/images/popResult/popResultBack5-1.png'),
                            popIconUrl: require('../../assets/images/popResult/popResultIcon5-1.png'),
                            p1: '这里是陶尔米纳著名酒店之一，',
                            p2: '清晨可以品尝亲手采摘的当地水果，',
                            p3: '傍晚漫步通向圆石滩的美丽花园。',
                        },
                        {
                            url: require('../../assets/images/result5-2.png'),
                            name: '不列颠普尔曼号',
                            popUrl: require('../../assets/images/popResult/popResultBack5-2.png'),
                            popIconUrl: require('../../assets/images/popResult/popResultIcon5-2.png'),
                            p1: '在20世纪20年代风格的车厢里，',
                            p2: '坐在抛光木材和质感黄铜的扶手椅上。',
                            p3: '通过车窗眺望日出，或仰望繁星夜空。',
                        },
                        {
                            url: require('../../assets/images/result1-1.png'),
                            name: '卡露索',
                            popUrl: require('../../assets/images/popResult/popResultBack1-1.png'),
                            popIconUrl: require('../../assets/images/popResult/popResultIcon4-1.png'),
                            p1: '沿着风景如画的河道一路前行，',
                            p2: '你可以在甲板上享用美味佳肴，',
                            p3: '在停泊岸边后，体验丰富的户外活动。',
                        },
                        {
                            url: require('../../assets/images/result4-4.png'),
                            name: '萨缪特大象营地',
                            popUrl: require('../../assets/images/popResult/popResultBack4-4.png'),
                            popIconUrl: require('../../assets/images/popResult/popResultIcon3-1.png'),
                            p1: '帐篷式房间，设有全景式私人甲板，',
                            p2: '是您欣赏非洲原野的完美之地，',
                            p3: '您可以在营地静谧的泳池放松身心，围坐火炉分享您的故事。',
                        },
                    ],
                },
            ],
            selItem: null,
            info: null, //  获取到的结果数据
            resImgs: [], //  结果id对应的酒店数组
            imgsShow: false,
            timer: null, //  背景
            playTimer: null, //  播放
            playWidth: 0, //  播放宽度
            currentTime: 0, //  当前时间
            duration: 0, //  音乐总时间
            animatedIClass: 'animated',
            mgDelayClassName: 'imgDelay',
            imgBoxClass: 'imgBox',
            mask: true,
            imgUrl: '',
            // screenshotUrl:'',
            isAndroid: false,
            isIOS: false,
            posterShow: false, //  生成海报前页面显示
            posterImgShow: false, //  生成的图片
            openId: '',
        }
    },
    mounted() {
        setTimeout(() => {
            let agreeRule = localStorage.getItem('agree-rule-6')
            // 上次点击不同意的时间
            let lastTime = localStorage.getItem('last-time')
            // 间隔时间，防止跳转授权以后再次弹出是否弹窗
            let gapTime = new Date().getTime() - lastTime
            if (agreeRule != 1 && gapTime > 1000 * 10) {
                this.isShowRule = true
            }
            this.checkSign()
        }, 500)
        // 是否是小程序内嵌h5
        var ua = navigator.userAgent.toLowerCase()
        let self = this
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            //ios的ua中无miniProgram，但都有MicroMessenger（表示是微信浏览器）
            wx.miniProgram.getEnv(res => {
                if (res.miniprogram) {
                    self.isMP = true
                    // alert("在小程序里");
                } else {
                    // alert("不在小程序里");
                }
            })
        } else {
            // alert('不在微信里');
        }
        //
        this.isAndroidFun()
        this.openId = this.$route.query.type
            ? this.$route.query.openid
            : this.getQueryString('openId')
        document.addEventListener(
            'WeixinJSBridgeReady',
            () => {
                if (this.isAndroidOrIOS() == 'ios') {
                    this.$nextTick(() => {
                        let video = document.getElementById('myVideo')
                        video.play()
                    })
                }
            },
            false
        )
    },
    created() {
        console.log('[ process.env ] >', process.env)
        if (this.$route.query.type) {
            this.type = this.$route.query.type
        }
    },
    watch: {
        type(newVal, oldVal) {
            if (newVal == 4) {
                setTimeout(() => {
                    this.follow = true
                }, 7000)
                setTimeout(() => {
                    setTimeout(() => {
                        this.clearClassName()
                        this.mask = false
                    }, 1500)
                }, 9000)
            } else {
                this.mask = true
            }
        },
    },
    components: {
        RulePopup,
    },
    methods: {
        // 小程序内嵌h5跳转小程序首页
        gotoMPIndex() {
            wx.miniProgram.reLaunch({
                url: '/pages/index/index',
            })
        },
        //分享前的验证签名，因为Android和IOS在进入微信后路由变化的逻辑是不同的，所以要判断一下，IOS只能分享第一次进来时候的路由地址（IOS待验证，后面来填坑）
        checkSign() {
            // window.__wxjs_is_wkwebview为true 时 为 IOS 设备 false时 为 安卓 设备
            if (window.__wxjs_is_wkwebview) {
                // IOS
                if (window.entryUrl == '' || window.entryUrl == undefined) {
                    var url = location.href.split('#')[0]
                    window.entryUrl = url // 将后面的参数去除
                }
                wxapi.wxRegister(location.href.split('#')[0], 'ios')
            } else {
                // 安卓
                setTimeout(function () {
                    wxapi.wxRegister(location.href.split('#')[0], 'android')
                }, 500)
            }
        },
        getQueryString(name) {
            let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
            let r = window.location.search.substr(1).match(reg)
            if (r != null) {
                return decodeURIComponent(r[2])
            }
            return null
        },
        isAndroidFun() {
            var u = navigator.userAgent
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
            if (isAndroid) {
                this.isAndroid = isAndroid
                console.log('isAndroid', isAndroid)
            }
            if (isIOS) {
                this.isIOS = isIOS
                console.log('isIOS', isIOS)
            }
        },
        //开始按 type  1文字 2图片 3表情 4语音 5文件 6视频
        gtouchstart() {
            timeOutEvent = setTimeout(() => {
                this.longPress()
            }, 500) //这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适
            return false
        },
        //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
        gtouchend() {
            clearTimeout(timeOutEvent) //清除定时器
            // setTimeout(()=>{
            //     this.posterImgShow = false
            // }, 50)

            if (timeOutEvent != 0) {
                //这里写要执行的内容（尤如onclick事件）
                //vm.goChat(item);
            }
            return false
        },
        //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
        gtouchmove() {
            clearTimeout(timeOutEvent) //清除定时器
            timeOutEvent = 0
            // setTimeout(()=>{
            //     this.posterImgShow = false
            // }, 50)
        },
        //真正长按后应该执行的内容
        async longPress() {
            timeOutEvent = 0
            //执行长按要执行的内容，如弹出菜单
            this.posterImgShow = true
            clab_tracker.track('c_share_result')
            await this.clearClassName()
        },
        clearClassName() {
            /**
             * 判断动画结束，移出动画类名，否则影响html2canvas截屏
             * */
            this.animatedIClass = ''
            this.mgDelayClassName = ''
            this.imgBoxClass = 'animation-imgBox'
        },
        posters() {
            /**
             * 为防止用户进来就截屏，截屏前先清除动画类名
             * */
            var dom = document.querySelector('.poster') // 获取dom元素
            //解决办法：在生成图片之前 让滚动条高度为0就好
            html2canvas(dom, {
                width: dom.clientWidth, //dom 原始宽度
                height: dom.clientHeight,
                scrollY: 0, // html2canvas默认绘制视图内的页面，需要把scrollY，scrollX设置为0
                scrollX: 0,
                useCORS: true, //支持跨域，但好像没什么用
                allowTaint: false,
                logging: true,
                scale: 2,
                dpi: window.devicePixelRatio,
            }).then(canvas => {
                // this.screenshotUrl = canvas.toDataURL('image/png');
                let url = dataURLToFile(canvas.toDataURL('image/png'))
                this.$api.uploadFile(url).then(res => {
                    if (res.code == 0) {
                        // this.imgUrl = process.env.VUE_APP_STORAGE + res.data[0].url;
                        this.imgUrl = res.data[0].url
                    }
                })
            })
        },
        formatTime(time) {
            time = (this.duration - time).toString()
            if (time / 60 >= 1) {
                return `01:${
                    (time % 60).toString().length > 1
                        ? time % 60
                        : '0' + (time % 60)
                }`
            } else {
                return `00:${time.length > 1 ? time % 60 : '0' + time}`
            }
        },
        selSound(item) {
            if (this.ids.indexOf(item.id) > -1) {
                item.isSel = !item.isSel
                this.ids.splice(this.ids.indexOf(item.id), 1)
                return
            } else if (this.ids.length == 4) {
                this.$toast('最多选择四个声音')
                return
            }
            clab_tracker.track('c_voice_select_click_H5', {
                c_voice_selected: item.soundName,
            })
            item.isSel = !item.isSel
            this.ids.push(item.id)
        },
        confirm() {
            if (this.ids.length < 4) {
                this.$toast('请选择四个声音')
                return
            }
            clab_tracker.track('c_voice_confirm_click_H5')
            let arr = []
            this.ids.forEach(item => {
                this.items.forEach(it => {
                    if (item == it.id) {
                        delete it.isSel
                        arr.push(it)
                    }
                })
            })
            // let userInfo = {
            // // // this.info = {
            //     activityStatus: null,
            //     city: "",
            //     country: "",
            //     errcode: null,
            //     errmsg: null,
            //     flag: null,
            //     groupId: null,
            //     headImgUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/952hPjHqMeeA9aia84hLFicPVa8cSwID4ylUn4QUx0mssia2LWj0WicWHyC22ickuO2icpgrs6sTLicxEDUlcYc9qRZXQ/132",
            //     language: "",
            //     lotteryCount: null,
            //     newOrOld: null,
            //     nickname: "CXH",
            //     openId: "oJSOgwKsUzhI6JhqBQ4jIxd2_Fow",
            //     phoneNumber: null,
            //     province: "",
            //     qrScene: null,
            //     qrSceneStr: null,
            //     remark: null,
            //     sex: 0,
            //     subscribe: null,
            //     subscribeScene: null,
            //     subscribeTime: null,
            //     tagIdList: null,
            //     tagList: null,
            //     unionid: null
            // }
            // let agreeRule = localStorage.getItem('agree-rule-6');
            let userInfo = JSON.parse(localStorage.getItem('userInfo'))
            let requestData = {
                selectionSound: JSON.stringify(arr),
                headImg: this.openId ? userInfo.headImgUrl : '',
                nickName: this.openId ? userInfo.nickname : '',
                openId: this.openId ? userInfo.openId : '',
            }
            this.$api.submitResult(requestData).then(res => {
                if (res.code == 0) {
                    this.type = 4
                    this.resultId = res.data
                    this.ids = []
                    this.items.forEach(item => {
                        this.$set(item, 'isSel', false)
                    })
                    this.getResult()
                }
                this.$toast.clear()
            })
        },
        play() {
            let video = document.getElementById('myVideo')
            if (video.paused) {
                video.play()
                this.isPlay = false
            } else {
                video.pause()
            }
        },
        isAndroidOrIOS() {
            var u = navigator.userAgent
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
            if (isAndroid) {
                return 'android'
            }
            if (isiOS) {
                return 'ios'
            }
            return false
        },
        finish() {
            clab_tracker.track('c_listening_finish_click_H5', {
                c_user_stay_time_H5: this.currentTime,
            })
            let myAudio = document.getElementById('myAudio')
            if (this.isAndroidOrIOS() == 'ios') {
                myAudio.pause()
            } else {
                let timer = setInterval(() => {
                    if (myAudio.volume > 0.1) {
                        myAudio.volume = (myAudio.volume - 0.1).toFixed(2)
                    } else {
                        myAudio.volume = 0
                        myAudio.pause()
                        clearInterval(timer)
                    }
                }, 100)
            }
            clearInterval(this.playTimer)
            this.playWidth = 0
            this.type = 3
        },
        find() {
            // console.log(this.getQueryString('c_source'))
            clab_tracker.track('c_test_start_click_H5', {
                c_unionID: localStorage.getItem('unionid'),
                c_openID: localStorage.getItem('openId'),
                c_date_of_follow: this.$moment()
                    .locale('zh-cn')
                    .format('YYYY-MM-DD HH:mm:ss'),
                c_campaign_name: '心之所向的传奇之旅',
                c_campaignID: 'A01',
                c_source: this.getQueryString('c_source')
                    ? this.getQueryString('c_source')
                    : '',
            })
            let myAudio = document.getElementById('myAudio')
            if (myAudio.oncanplay) {
                myAudio.oncanplay = () => {
                    let duration = parseInt(myAudio.duration)
                    this.duration = duration.toFixed(0)
                    console.log('duration', this.duration)
                }
            } else {
                this.duration = 60
            }
            this.playTimer = setInterval(() => {
                let currentTime = myAudio.currentTime.toFixed(0)
                this.currentTime = currentTime
                this.playWidth = `${Number(this.currentTime / 60)}`
            }, 1000)

            myAudio.play()

            this.type = 2
        },
        getResult() {
            // oJSOgwKsUzhI6JhqBQ4jIxd2_Fow
            // let agreeRule = localStorage.getItem('agree-rule-6');
            this.$api
                .getResult({
                    resultId: this.resultId,
                    // resultId: 2,
                    // openId: 'oJSOgwKsUzhI6JhqBQ4jIxd2_Fow'
                    // openId: JSON.parse(localStorage.getItem('userInfo')).openId
                    openId: this.openId ? localStorage.getItem('openId') : '',
                })
                .then(res => {
                    if (res.code == 0) {
                        this.info = res.data.result
                        let result = []
                        result = this.result.filter(item => {
                            return item.resultId == res.data.result.resultId
                        })
                        this.resImgs = result[0].imgs
                        clearInterval(this.timer)
                        switch (res.data.result.resultId) {
                            case 1:
                                this.activeIndex = 1
                                break
                            case 2:
                                this.activeIndex = 2
                                break
                            case 3:
                                this.activeIndex = 3
                                break
                            case 4:
                                this.activeIndex = 0
                                break
                            case 5:
                                this.activeIndex = 4
                                break
                        }
                        setTimeout(() => {
                            this.posterShow = true
                            setTimeout(() => {
                                this.posters()
                            }, 0)
                        }, 7500)
                    }
                })
        },
        listen() {
            this.animatedIClass = 'animated'
            this.mgDelayClassName = 'imgDelay'
            this.imgBoxClass = 'imgBox'
            let myAudio = document.getElementById('myAudio')
            myAudio.load()
            myAudio.play()
            this.playTimer = setInterval(() => {
                let currentTime = myAudio.currentTime.toFixed(0)
                console.log('currentTime', currentTime)
                this.currentTime = currentTime
                this.playWidth = `${Number(this.currentTime / 60)}`
            }, 1000)

            this.type = 2
            this.posterShow = false
            this.info = null
            this.activeIndex = null
            this.resultId = null
        },
        pop(item) {
            this.selItem = item
            if (this.info.resultId == 1) {
                clab_tracker.track(
                    'c_property_recommendation_banner_click_H5',
                    {
                        c_property_name_EN: 'Result_page_1',
                        c_property_name_CN: '探古寻今的邂逅',
                    }
                )
            } else if (this.info.resultId == 2) {
                clab_tracker.track(
                    'c_property_recommendation_banner_click_H5',
                    {
                        c_property_name_EN: 'Result_page_2',
                        c_property_name_CN: '五洲四海的遨游',
                    }
                )
            } else if (this.info.resultId == 3) {
                clab_tracker.track(
                    'c_property_recommendation_banner_click_H5',
                    {
                        c_property_name_EN: 'Result_page_3',
                        c_property_name_CN: '回归心灵的谧享',
                    }
                )
            } else if (this.info.resultId == 4) {
                clab_tracker.track(
                    'c_property_recommendation_banner_click_H5',
                    {
                        c_property_name_EN: 'Result_page_4',
                        c_property_name_CN: '无与伦比的奢享',
                    }
                )
            } else if (this.info.resultId == 5) {
                clab_tracker.track(
                    'c_property_recommendation_banner_click_H5',
                    {
                        c_property_name_EN: 'Result_page_5',
                        c_property_name_CN: '满载雀跃的欢聚',
                    }
                )
            }

            this.popShow = true
        },
        officialPopShow() {
            clab_tracker.track('c_share_for_gift_click_H5')
            this.officialPop = true
        },
    },
}
</script>

<style lang="less" scoped>
.noPage {
    width: 100vw;
    height: 100vh;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.posterBox {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.75);
    z-index: 99;
    .posterPop {
        width: 300px;
        // height: 560px;
        box-sizing: border-box;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .imgBox {
            width: 100%;
            // height: 100%;
            position: relative;
            // object-fit: cover;
            .img {
                width: 100%;
                height: auto;
                object-fit: cover;
            }
            .close {
                width: 13px;
                height: 13px;
                position: absolute;
                top: 17px;
                right: 17px;
            }
        }
    }
}
.no-touch {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.page1 {
    .videoBox {
        width: 100vw;
        height: 100vh;
        z-index: -1;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        box-sizing: border-box;
    }
    .content {
        padding: 20px 0;
        position: relative;
        box-sizing: border-box;
        background: transparent;
        .logo {
            width: 109px;
            height: 74px;
            margin: 0 auto;
            margin-bottom: 20px;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .text {
            font-size: 21px;
            color: #ffffff;
            line-height: 1.3;
            font-weight: bold;
        }
        .play {
            width: 66px;
            height: 66px;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            img {
                width: 100%;
                height: 100%;
            }
        }
        .btnBox {
            position: fixed;
            bottom: 66px;
            left: 50%;
            transform: translateX(-50%);
        }
        .btn {
            width: 215px;
            height: 40px;
            border: 1px solid #ffffff;
            color: #ffffff;
            font-size: 18px;
            margin: 70px auto 0;
        }
        // .checkbox_wrap{
        //     display: flex;
        //     align-items: center;
        //     justify-content: center;
        //     font-size: 14px;
        //     color: #fff;
        //     margin-top: 10px;
        //     .checkbox{
        //         width: 12px;
        //         height: 12px;
        //         border: 1px solid #fff;
        //         margin-right: 5px;
        //         &.active{
        //             position: relative;
        //             &::after{
        //                 content: "";
        //                 position: absolute;
        //                 top: 50%;
        //                 left: 50%;
        //                 transform: translate(-50%, -50%);
        //                 width: 6px;
        //                 height: 6px;
        //                 background: #fff;
        //             }
        //         }
        //     }
        // }
    }
}
.poster {
    z-index: -1;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
.page2 {
    .backBox {
        width: 100vw;
        height: 100vh;
        z-index: -1;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        &.show {
            img {
                opacity: 1;
            }
        }
        &.hide {
            img {
                opacity: 0;
            }
        }
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: 5s;
        }
    }
    .videoBox {
        width: 100vw;
        height: 100vh;
        // z-index: -1;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: 2s;
        .imgBox {
            width: 100%;
            height: 100%;
            position: absolute;
            &.hide {
                img {
                    opacity: 0;
                }
            }
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: 5s;
            }
        }
    }
    .mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        box-sizing: border-box;
        div {
            position: relative;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                to bottom,
                rgba(0, 0, 0, 0.5),
                rgba(0, 0, 0, 0)
            );
        }
    }
    .content1 {
        padding: 20px 0;
        position: relative;
        box-sizing: border-box;
        background: transparent;
        .logo {
            width: 109px;
            height: 74px;
            margin: 0 auto;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .music {
            width: 70px;
            height: 57px;
            margin: 70px auto 0;
            position: relative;
            img {
                width: 100%;
                height: 100%;
            }
            .time {
                color: #fff;
                position: absolute;
                line-height: 1;
                bottom: 8px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 10px;
            }
        }
        .music-text {
            font-size: 15px;
            color: #ffffff;
            width: 100%;
            margin: 0 auto;
            line-height: 1.2;
            font-weight: bold;
        }
        .ripple {
            width: 100%;
            height: 27px;
            margin: 75px 0 90px;
            position: relative;
            .ripMask {
                position: absolute;
                top: 0;
                left: 0;
                height: 27px;
                overflow: hidden;
                z-index: 99;
                transition: 0.3s;
                img {
                    width: 100vw;
                    height: 27px;
                    object-fit: fill;
                }
            }
            .img {
                width: 100%;
                height: 27px;
                object-fit: fill;
                filter: invert(40%);
            }
        }
        .word {
            color: #ffffff;
            font-size: 13px;
        }
        .desc {
            color: #ffffff;
            font-size: 15px;
            margin-top: 30px;
            font-weight: bold;
        }
        .btn {
            width: 215px;
            height: 40px;
            border: 1px solid #ffffff;
            color: #ffffff;
            font-size: 18px;
            margin: 40px auto 0;
        }
    }
}
.page3 {
    .animated {
        animation-duration: 2s !important;
    }
    .desc {
        color: #fff;
        font-size: 15px;
        margin: 20px auto 0;
        font-weight: bold;
    }
    .items {
        width: 100%;
        height: 330px;
        margin-top: 44px;
        position: relative;
        .item {
            width: 190px;
            height: 35px;
            color: rgba(255, 255, 255, 0.4);
            font-weight: bold;
            position: absolute;
            transition: 0.3s;
            img {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }
            div {
                width: 170px;
                margin-left: 28px;
                font-size: 12px;
                white-space: nowrap;
            }
            &.active {
                color: #fff;
            }
            &:first-child {
                top: 0;
                left: 150px;
            }
            &:nth-child(2) {
                top: 41px;
                left: 30px;
            }
            &:nth-child(3) {
                top: 117px;
                left: 5px;
            }
            &:nth-child(4) {
                top: 161px;
                left: 96px;
            }
            &:nth-child(5) {
                top: 85px;
                right: 15px;
            }
            &:nth-child(6) {
                top: 202px;
                left: 16px;
            }
            &:nth-child(7) {
                top: 229px;
                right: 15px;
            }
            &:nth-child(8) {
                top: 267px;
                left: 39px;
            }
            &:nth-child(9) {
                top: 311px;
                left: 115px;
            }
        }
    }
}
.page4 {
    .content2 {
        z-index: 9;
        width: 100vw;
        min-height: 100vh;
        padding-top: 25px;
        position: relative;
        box-sizing: border-box;
        background: transparent;
        .parent {
            height: calc(100vh - 234px);
            position: relative;
            .longPress {
                width: 100%;
                height: 200px;
                position: relative;
            }
            .posterImg {
                width: 100vw;
                height: 100vh;
                object-fit: cover;
                z-index: 99;
                position: fixed;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                &.andriod {
                    width: 100% !important;
                    height: 100% !important;
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    z-index: 99;
                    opacity: 0;
                }
            }
        }
        .head {
            position: absolute;
            // top: 15px;
            padding: 0 30px 0 20px;
            width: 100%;
            z-index: 10;
            box-sizing: border-box;
            .logo {
                width: 100px;
                // height: 40px;
                img {
                    width: 100%;
                    // height: 100%;
                }
            }
            .music {
                img {
                    width: 20px;
                    height: 20px;
                }
                div {
                    font-size: 11px;
                    color: #fff;
                    margin-top: 5px;
                    line-height: 1;
                }
            }
        }
        .info {
            padding-top: 15px;
            .avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
            .name {
                margin-top: 6px;
                font-size: 15px;
                color: #fff;
                font-weight: bold;
                line-height: 1;
            }
        }
        .result-text {
            width: 100%;
            color: #fff;
            margin: 0 auto;
            margin-top: 20px;
            line-height: 1.2;
            font-size: 15px;
            span {
                font-weight: bold;
            }
        }
        .heart {
            width: 328px;
            height: 114px;
            margin: 20px auto 0;
            position: relative;
            div {
                font-size: 10px;
                color: #fff;
                position: absolute;
                white-space: nowrap;
                line-height: 1;
                &.div1 {
                    top: 29px;
                    right: 0;
                }
                &.div2 {
                    right: 14px;
                    bottom: 27px;
                }
                &.div3 {
                    left: 25px;
                    bottom: 21px;
                }
                &.div4 {
                    top: 9px;
                    left: 0;
                }
            }
            img {
                width: 100%;
                height: 100%;
            }
        }
        .bottom {
            position: fixed;
            bottom: 14px;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
        }
        .label {
            font-size: 15px;
            color: #fff;
            font-weight: bold;
            line-height: 1;
        }
        .imgs {
            margin-top: 8px;
            .animation-imgBox {
                position: relative;
                justify-content: flex-start;
                position: relative;
                img {
                    width: 70px;
                    height: 83px;
                }
                .name {
                    font-size: 10px;
                    color: #fff;
                    width: 70px;
                    line-height: 1.2;
                }
            }
            .imgBox {
                justify-content: flex-start;
                position: relative;
                animation-name: imgsOut;
                -moz-animation-name: imgsOut;
                -webkit-animation-name: imgsOut;
                -o-animation-name: imgsOut;
                animation-duration: 3s;
                -moz-animation-duration: 3s;
                -webkit-animation-duration: 3s;
                -o-animation-duration: 3s;
                animation-iteration-count: 1;
                -moz-animation-iteration-count: 1;
                -webkit-animation-iteration-count: 1;
                -o-animation-iteration-count: 1;
                animation-fill-mode: forwards; /*让动画停留在最后一帧 */
                -moz-animation-fill-mode: forwards;
                -webkit-animation-fill-mode: forwards;
                -o-animation-fill-mode: forwards;
                opacity: 0;
                img {
                    width: 70px;
                    height: 83px;
                }
                .name {
                    font-size: 10px;
                    color: #fff;
                    width: 70px;
                    line-height: 1.2;
                }
            }
        }
        .btns {
            width: 215px;
            height: 40px;
            border: 1px solid #fff;
            color: #fff;
            font-size: 15px;
            font-weight: bold;
            margin: 15px auto 10px;
        }
        .tips {
            font-size: 12px;
            color: #fff;
            line-height: 1;
        }
        .QR-code {
            width: 100%;
            height: 65px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 21px;
            img {
                width: 57px;
                height: 57px;
            }
            p {
                font-size: 13px;
                font-family: Hiragino Sans GB;
                font-weight: normal;
                color: #ffffff;
                margin-left: 12px;
            }
        }
    }
}
.pop {
    width: 330px;
    height: 555px;
    box-sizing: border-box;
    position: relative;
    .imgBox {
        width: 100%;
        height: 100%;
        position: relative;
        .img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .close {
            width: 13px;
            height: 13px;
            position: absolute;
            top: 17px;
            right: 17px;
        }
    }
    .more {
        color: #000000;
        font-size: 9px;
        text-decoration: underline;
        position: absolute;
        bottom: 52px;
        left: 50%;
        transform: translateX(-50%);
    }
    .infoBox {
        width: 290px;
        height: 160px;
        padding: 10px;
        box-sizing: border-box;
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: #fff;
        .info {
            border: 2px solid #e6c1ad;
            width: 100%;
            height: 100%;
            text-align: center;
            padding-top: 12px;
            box-sizing: border-box;
            .info-title {
                font-size: 15px;
                color: #000000;
                font-weight: bold;
                padding-bottom: 8px;
                position: relative;
                margin-bottom: 8px;
                &::after {
                    content: '';
                    display: block;
                    position: absolute;
                    width: 58px;
                    height: 1px;
                    background: #000000;
                    left: 50%;
                    bottom: 0;
                    transform: translateX(-50%);
                }
            }
            p {
                font-size: 9px;
                color: #000000;
            }

            .info-imgBox {
                width: 91px;
                height: auto;
                position: absolute;
                left: 0;
                bottom: -23px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
.pops {
    width: 330px;
    height: 330px;
    box-sizing: border-box;
    background: #fff;
    .infoBox {
        position: relative;
        width: 100%;
        height: 100%;
        position: relative;
        box-sizing: border-box;
        .close {
            position: absolute;
            width: 13px;
            height: 13px;
            top: 18px;
            right: 13px;
        }
        .label {
            width: 170px;
            padding: 0 30px 14px;
            border-bottom: 1px solid #b0b0b0;
            line-height: 1.2;
            font-weight: bold;
            font-size: 16px;
            color: #000;
        }
        .text {
            line-height: 1;
            font-size: 16px;
            color: #000;
            font-weight: bold;
            margin: 18px 0 25px;
            position: relative;
            .line {
                width: 16px;
                height: 1px;
                background: #000;
                margin: 0 7px;
            }
        }
        .imgBox {
            width: 114px;
            height: 114px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .tips {
            line-height: 1;
            font-size: 16px;
            margin-top: 16px;
        }
    }
}
.imgDelay1 {
    animation-delay: 3s;
}
.imgDelay2 {
    animation-delay: 3.5s;
}
.imgDelay3 {
    animation-delay: 4s;
}
.imgDelay4 {
    animation-delay: 4.5s;
}
.imgDelay5 {
    animation-delay: 7.5s;
}
@keyframes imgsOut {
    0% {
        opacity: 0;
    }
    90% {
        opacity: 1;
    }
    95% {
        opacity: 0.7;
    }
    100% {
        opacity: 1;
    }
}
// .no-touch {

// -webkit-touch-callout: none;

// -webkit-user-select: none;

// -khtml-user-select: none;

// -moz-user-select: none;

// -ms-user-select: none;

// user-select: none;

// }
// .share-parent{
//     position: relative;
// }
// .share-box{
//     position: absolute;
//     left: 0;
//     top: 0;
//     width: 100%;
//     height: 100%;
//     background-color: transparent;
//     position: 2;
// }
.follow {
    width: 100%;
    // position: fixed;
    // bottom: 0;
    // left: 0;
    z-index: 99;
    height: 85px;
    overflow: auto;
    img {
        width: 100%;
        position: absolute;
        left: 0;
        right: 0;
    }
    .btns {
        width: 215px;
        height: 40px;
        border: 1px solid #fff;
        color: #fff;
        font-size: 15px;
        font-weight: bold;
        margin: 15px auto 10px;
        position: absolute;
        bottom: 14px;
        left: 0;
        right: 0;
    }
}
.mask-big {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    z-index: 10000;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    div {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        img {
            width: 57px;
            height: 61px;
            margin-bottom: 22px;
        }
        p {
            font-size: 15px;
            font-family: Hiragino Sans GB;
            font-weight: normal;
            color: #ffffff;
            line-height: 21px;
            // .no-touch {

            // -webkit-touch-callout: none;

            // -webkit-user-select: none;

            // -khtml-user-select: none;

            // -moz-user-select: none;

            // -ms-user-select: none;

            // user-select: none;

            // }
        }
    }
}
</style>
