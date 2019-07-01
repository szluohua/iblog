<template>
    <section class="container">
        <div class="content">
            <a
                v-for="value in list"
                :key="value._id"
                class="card"
                :href="`/article_detail/${value._id}`"
                target="_blank"
            >
                <img class="card-image" :src="imageStyle(value)">
                <div class="card-content">
                    <div class="card-content-title">
                        {{ value.title }}
                    </div>
                    <div class="card-content-desc">
                        {{ value.desc }}
                    </div>
                    <div class="card-content-count">
                        <span><a-icon type="eye" />20</span>
                        <span><a-icon type="message" />30</span>
                    </div>
                </div>
            </a>
            <!-- <button class="button" @click="viewContent(value)">Click Here</button> -->
        </div>
    </section>
</template>

<script>
import { getArticleList } from '@/api/index'
export default {
    data() {
        return {
            list: []
        }
    },
    async asyncData() {
        const res = await getArticleList({ page: 2 })
        return {
            list: res || []
        }
    },
    methods: {
        imageStyle(value) {
            return value.urls.small.replace(/w=400/, 'w=450')
        }
    }
}
</script>

<style lang="scss" scoped>
.content {
    margin: 0 auto;
    column-count: 6;
    column-gap: 40px;
    column-width: 400px;
}

.card {
    cursor: pointer;
    break-inside: avoid;
    // width: 400px;
    margin-bottom: 40px;
    display: flex;
    position: relative;
    display: flex;
    flex-direction: column;
    &-image {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
        opacity: 0.8;
        &:hover {
            opacity: 1;
        }
    }
    &-content {
        width: 100%;
        position: absolute;
        padding: 20px;
        left: 0;
        bottom: 0;
        color: #fff;
        &-title {
            font-size: 24px;
            font-weight: 500;
        }
        &-desc {
            margin-top: 5px;
        }
        &-count {
            margin-top: 5px;
            & > span {
                margin-right: 10px;
                & > i {
                    margin-right: 5px;
                }
            }
        }
    }
}
.button {
    $height: 40px;
    transform: translateZ($height);
    cursor: pointer;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    font-weight: bold;
    color: #fff;
    padding: 0.5em 1em;
    border-radius: 100px;
    font: inherit;
    border: none;
    position: relative;
    transform-style: preserve-3d;
    transition: 300ms ease;
    &:before {
        transition: 300ms ease;
        position: absolute;
        display: block;
        content: "";
        transform: translateZ(-$height);
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        height: calc(100% - 20px);
        width: calc(100% - 20px);
        border-radius: 100px;
        left: 10px;
        top: 16px;
    }
    &:active {
        transform: translateZ($height/2);
        &:before {
            transform: translateZ(-($height/2));
            top: 12px;
        }
    }
}
</style>
