<template>
    <div class="profile-container">
        <div class="wrapper">
            <div :class="{ active }" class="profile-card js-profile-card">
                <!-- <div class="profile-card__img">
                    <img src="https://res.cloudinary.com/muhammederdem/image/upload/v1537638518/Ba%C5%9Fl%C4%B1ks%C4%B1z-1.jpg" alt="profile card">
                </div> -->
                <div class="profile-card__cnt js-profile-cnt">
                    <div class="profile-card__name">
                        {{ author }}
                    </div>
                    <div class="profile-card__txt">
                        <strong>涸辙遗鲋，旦暮成枯；人而无志，与彼何殊</strong>
                    </div>
                    <!-- <div class="profile-card-loc">
                        <span class="profile-card-loc__icon">
                            <svg class="icon">
                                <use xlink:href="#icon-location" />
                            </svg>
                        </span>
                        <span class="profile-card-loc__txt">China</span>
                    </div> -->
                    <div class="profile-card-inf">
                        <div class="profile-card-inf__item">
                            <div class="profile-card-inf__title">
                                {{ time }} 天
                            </div>
                            <div class="profile-card-inf__txt">
                                运行时间
                            </div>
                        </div>
                        <div class="profile-card-inf__item">
                            <div class="profile-card-inf__title">
                                {{ pv }}
                            </div>
                            <div class="profile-card-inf__txt">
                                访问量
                            </div>
                        </div>
                        <div class="profile-card-inf__item">
                            <div class="profile-card-inf__title">
                                {{ articleCount }}
                            </div>
                            <div class="profile-card-inf__txt">
                                总文章
                            </div>
                        </div>
                        <div class="profile-card-inf__item">
                            <div class="profile-card-inf__title">
                                {{ commentCount }}
                            </div>
                            <div class="profile-card-inf__txt">
                                总评论
                            </div>
                        </div>
                    </div>
                    <div class="profile-card-social">
                        <a :href="github" class="profile-card-social__item facebook" target="_blank">
                            <a-icon type="github" />
                        </a>
                        <a :href="`mailto:${email}`" class="profile-card-social__item twitter" target="_blank">
                            <a-icon type="mail" />
                        </a>
                        <!-- <a href="https://www.instagram.com/iamuhammederdem" class="profile-card-social__item instagram" target="_blank">
                            <a-icon type="wechat" />
                        </a> -->
                    </div>
                    <div class="profile-card-ctr">
                        <button class="profile-card__button button--blue js-message-btn" @click="active = true">
                            留言
                        </button>
                        <button class="profile-card__button button--orange">
                            关注
                        </button>
                    </div>
                </div>
                <div class="profile-card-message js-message">
                    <form class="profile-card-form">
                        <div class="profile-card-form__container">
                            <textarea placeholder="Say something..." />
                        </div>
                        <div class="profile-card-form__bottom">
                            <button class="profile-card__button button--blue js-message-close">
                                发送
                            </button>
                            <button class="profile-card__button button--gray js-message-close">
                                取消
                            </button>
                        </div>
                    </form>
                    <div class="profile-card__overlay js-message-close" @click.prevent="active = false" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getAllCount, getPublicSettingByKey } from '@/api/index'
export default {
    name: 'About',
    components: {},
    data() {
        return {
            active: false,
            time: '',
            articleCount: 0,
            commentCount: 0,
            pv: 0,
            author: process.env.author,
            email: process.env.email,
            github: process.env.github
        }
    },
    beforeMount() {
        this.time = this.showTime()
        getAllCount().then((res) => {
            if (res) {
                this.articleCount = res.allArticle
                this.commentCount = res.allComment
            }
        })
        getPublicSettingByKey({ key: 'pv' }).then((res) => {
            if (res && res.value) {
                this.pv = res.value
            }
        })
    },
    methods: {
        showTime() {
            return this.$dayjs().diff(this.$dayjs('2019-09-01'), 'day')
        }
    }
}
</script>

<style scoped lang="scss">
    .profile-container {
        position: relative;
    }
    .icon {
        display: inline-block;
        width: 1em;
        height: 1em;
        stroke-width: 0;
        stroke: currentColor;
        fill: currentColor;
    }
    .wrapper {
        width: 100%;
        width: 100%;
        height: auto;
        padding-top: 50px;
        display: flex; // background-image: linear-gradient(-20deg, #ff2846 0%, #6944ff 100%);
        display: flex; // background-image: linear-gradient(-20deg, #ff2846 0%, #6944ff 100%);
    }
    .profile-card {
        width: 100%;
        min-height: 460px;
        margin: auto;
        box-shadow: 0px 8px 60px -10px rgba(13, 28, 39, 0.6);
        background: #fff;
        border-radius: 12px;
        max-width: 700px;
        position: relative;
        &.active {
            .profile-card__cnt {
                filter: blur(6px);
            }
            .profile-card-message,
            .profile-card__overlay {
                opacity: 1;
                pointer-events: auto;
                transition-delay: 0.1s;
            }
            .profile-card-form {
                transform: none;
                transition-delay: 0.1s;
            }
        }
        &__img {
            width: 150px;
            height: 150px;
            margin-left: auto;
            margin-right: auto;
            transform: translateY(-50%);
            border-radius: 50%;
            overflow: hidden;
            position: relative;
            z-index: 4;
            box-shadow: 0px 5px 50px 0px rgb(108, 68, 252), 0px 0px 0px 7px rgba(107, 74, 255, 0.5);
            @media screen and (max-width: 576px) {
                width: 120px;
                height: 120px;
            }
            img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 50%;
            }
        }
        &__cnt {
            // margin-top: -35px;
            margin-top: 35px;
            text-align: center;
            padding: 0 20px;
            padding-bottom: 40px;
            transition: all 0.3s;
        }
        &__name {
            font-weight: 700;
            font-size: 24px;
            color: #6944ff;
            margin-bottom: 15px;
        }
        &__txt {
            font-size: 18px;
            font-weight: 500;
            color: #324e63;
            margin-bottom: 15px;
            strong {
                //color: #ff2846;
                font-weight: 700;
            }
        }
        &-loc {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            font-weight: 600;
            &__icon {
                display: inline-flex;
                font-size: 27px;
                margin-right: 10px; //color: #6944ff;
            }
        }
        &-inf {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            align-items: flex-start;
            margin-top: 35px;
            &__item {
                padding: 10px 35px;
                min-width: 150px;
                @media screen and (max-width: 768px) {
                    padding: 10px 20px;
                    min-width: 120px;
                }
            }
            &__title {
                font-weight: 700;
                font-size: 27px; //color: #6944ff;
                color: #324e63;
            }
            &__txt {
                font-weight: 500;
                margin-top: 7px;
            }
        }
        &-social {
            margin-top: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            &__item {
                display: inline-flex;
                width: 55px;
                height: 55px;
                margin: 15px;
                border-radius: 50%;
                align-items: center;
                justify-content: center;
                color: #fff;
                background: #405de6;
                box-shadow: 0px 7px 30px rgba(43, 98, 169, 0.5);
                position: relative;
                font-size: 21px;
                flex-shrink: 0;
                transition: all 0.3s;
                @media screen and (max-width: 768px) {
                    width: 50px;
                    height: 50px;
                    margin: 10px;
                }
                @media screen and (min-width: 768px) {
                    &:hover {
                        transform: scale(1.2);
                    }
                }
                &.facebook {
                    background: linear-gradient(45deg, #3b5998, #0078d7);
                    box-shadow: 0px 4px 30px rgba(43, 98, 169, 0.5);
                }
                &.twitter {
                    background: linear-gradient(45deg, #1da1f2, #0e71c8);
                    box-shadow: 0px 4px 30px rgba(19, 127, 212, 0.7);
                }
                &.instagram {
                    background: linear-gradient( 45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d);
                    box-shadow: 0px 4px 30px rgba(120, 64, 190, 0.6);
                }
                &.behance {
                    background: linear-gradient(45deg, #1769ff, #213fca);
                    box-shadow: 0px 4px 30px rgba(27, 86, 231, 0.7);
                }
                &.github {
                    background: linear-gradient(45deg, #333333, #626b73);
                    box-shadow: 0px 4px 30px rgba(63, 65, 67, 0.6);
                }
                &.codepen {
                    background: linear-gradient(45deg, #324e63, #414447);
                    box-shadow: 0px 4px 30px rgba(55, 75, 90, 0.6);
                }
                &.link {
                    background: linear-gradient(45deg, #d5135a, #f05924);
                    box-shadow: 0px 4px 30px rgba(223, 45, 70, 0.6);
                }
            }
            .icon-font {
                display: inline-flex;
            }
        }
        &-ctr {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 40px;
            @media screen and (max-width: 576px) {
                flex-wrap: wrap;
            }
        }
        &__button {
            background: none;
            border: none;
            font-family: "Quicksand", sans-serif;
            font-weight: 700;
            font-size: 19px;
            margin: 15px 35px;
            padding: 15px 40px;
            min-width: 201px;
            border-radius: 50px;
            min-height: 55px;
            color: #fff;
            cursor: pointer;
            backface-visibility: hidden;
            transition: all 0.3s;
            @media screen and (max-width: 768px) {
                min-width: 170px;
                margin: 15px 25px;
            }
            @media screen and (max-width: 576px) {
                min-width: inherit;
                margin: 0;
                margin-bottom: 16px;
                width: 100%;
                max-width: 300px;
                &:last-child {
                    margin-bottom: 0;
                }
            }
            &:focus {
                outline: none !important;
            }
            @media screen and (min-width: 768px) {
                &:hover {
                    transform: translateY(-5px);
                }
            }
            &:first-child {
                margin-left: 0;
            }
            &:last-child {
                margin-right: 0;
            }
            &.button--blue {
                background: linear-gradient(45deg, #1da1f2, #0e71c8);
                box-shadow: 0px 4px 30px rgba(19, 127, 212, 0.4);
                &:hover {
                    box-shadow: 0px 7px 30px rgba(19, 127, 212, 0.75);
                }
            }
            &.button--orange {
                background: linear-gradient(45deg, #d5135a, #f05924);
                box-shadow: 0px 4px 30px rgba(223, 45, 70, 0.35);
                &:hover {
                    box-shadow: 0px 7px 30px rgba(223, 45, 70, 0.75);
                }
            }
            &.button--gray {
                box-shadow: none;
                background: #dcdcdc;
                color: #142029;
            }
        }
        &-message {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            padding-top: 80px;
            padding-bottom: 100px;
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s;
        }
        &-form {
            box-shadow: 0 4px 30px rgba(15, 22, 56, 0.35);
            max-width: 80%;
            margin-left: auto;
            margin-right: auto;
            background: #fff;
            border-radius: 10px;
            padding: 35px;
            transform: scale(0.8);
            position: relative;
            z-index: 3;
            transition: all 0.3s;
            @media screen and (max-width: 768px) {
                max-width: 90%;
                height: auto;
            }
            @media screen and (max-width: 576px) {
                padding: 20px;
            }
            &__bottom {
                justify-content: space-between;
                display: flex;
                @media screen and (max-width: 576px) {
                    flex-wrap: wrap;
                }
            }
        }
        textarea {
            width: 100%;
            resize: none;
            height: 210px;
            margin-bottom: 20px;
            border: 2px solid #dcdcdc;
            border-radius: 10px;
            padding: 15px 20px;
            color: #324e63;
            font-weight: 500;
            font-family: "Quicksand", sans-serif;
            outline: none;
            transition: all 0.3s;
            &:focus {
                outline: none;
                border-color: #8a979e;
            }
        }
        &__overlay {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            pointer-events: none;
            opacity: 0;
            background: rgba(22, 33, 72, 0.35);
            border-radius: 12px;
            transition: all 0.3s;
        }
    }
</style>
