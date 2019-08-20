<template>
    <div class="container">
        <div class="content">
            <a
                v-for="value in list"
                :key="value._id"
                class="article-container"
                :href="`/article_detail/${value._id}`"
                target="_blank"
            >
                <img class="article-background" src="../static/photo.jpeg">
                <div class="article-content">
                    <h3 class="article-content-title">{{ value.title }}</h3>
                    <div class="article-content-desc">{{ value.desc }}</div>
                    <div class="article-content-info">
                        <div class="article-content-info-user">
                            <a-avatar style="color: #f56a00; backgroundColor: #fde3cf">U</a-avatar>
                            <span class="username">Leo Luo</span>
                            <span class="time">{{ $dayjs().from(value.createdAt) }}</span>
                        </div>
                        <div class="article-content-info-count">
                            <span><a-icon type="eye" />{{ value.viewed }}</span>
                            <span><a-icon type="message" />{{ value.comment }}</span>
                            <span><a-icon type="star" />{{ value.stared }}</span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        <rightSidebar />
    </div>
</template>

<script>
import rightSidebar from '@/components/rightSidebar'
import { getArticleList } from '@/api/index'
export default {
    components: {
        rightSidebar
    },
    data() {
        return {
            list: []
        }
    },
    mounted() {
        this.getArticle()
    },
    methods: {
        imageStyle(value) {
            return value.urls.small.replace(/w=400/, 'w=450')
        },
        async getArticle() {
            const res = await getArticleList({ page: 2 })
            if (res) {
                this.list = res
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    .content {
        flex: 1;
        margin-right: 40px;
        .article-container {
            width: 100%;
            display: flex;
            flex-direction: column;
            margin-bottom: 40px;
            &:hover {
                .article-content-title {
                    color: #e42c64;
                }
            }
            .article-background {
                width: 100%;
            }
            .article-content {
                display: flex;
                flex-direction: column;
                margin-top: 40px;
                padding: 20px;
                color: #7d7d7d;
                &-title {
                    font-size: 24px;
                }
                &-desc {
                    height: 60px;
                    margin-bottom: 20px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    overflow: hidden;
                }
                &-info {
                    display: flex;
                    align-items: center;
                    height: 32px;
                    font-size: 13px;
                    &-user {
                        flex: 1;
                        .username,.time {
                            margin-left: 10px;
                        }
                    }
                    &-count {
                        flex: 2;
                        display: flex;
                        flex-direction: row-reverse;
                        & span {
                            margin-left: 20px;
                            & i {
                                margin-right: 5px;
                            }
                        }
                    }
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
