<template>
    <div class="right-sidebar">
        <div class="hot-tag">
            <h3 class="hot-tag-title">
                热门标签
            </h3>
            <div class="hot-tag-content">
                <nuxt-link v-for="value in tags" :key="value._id" :class="{ hightlight: $route.query.category === value._id }" class="tag" :to="{path: '/', query: {category: value._id}}">
                    {{ value.name }}
                </nuxt-link>
            </div>
        </div>
        <div class="hot-article">
            <h3 class="hot-article-title">
                热门文章
            </h3>
            <div class="hot-article-content">
                <nuxt-link v-for="value in articleList" :key="value._id" :to="`/article_detail/${value._id}`" class="hot-article-item">
                    {{ value.title }}
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
import { getCategoryList, findHotArticleList } from '@/api/index'
export default {
    name: 'RightSidebar',
    components: {},
    data() {
        return {
            tags: [],
            articleList: []
        }
    },
    mounted() {
        this.getTags()
        this.getHotArticle()
    },
    methods: {
        async getTags() {
            const res = await getCategoryList()
            if (res) {
                this.tags = res
            }
        },
        async getHotArticle() {
            const res = await findHotArticleList()
            if (res) {
                this.articleList = res
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .right-sidebar {
        width: 360px;
        padding: 10px 40px 40px;
        & h3 {
            margin-bottom: 20px;
        }
        .hot-article {
            &-content {
                display: flex;
                flex-direction: column;
                .hot-article-item {
                    margin-bottom: 20px;
                    line-height: 20px;
                    cursor: pointer;
                    color: #7d7d7d; // white-space: nowrap;
                    // text-overflow: ellipsis;
                    // overflow: hidden;
                    &:hover {
                        color: #e42c64;
                    }
                }
            }
        }
        .hot-tag {
            margin-bottom: 40px;
            &-content {
                display: flex;
                flex-wrap: wrap;
                .tag {
                    background: #eee;
                    border-radius: 3px 0 0 3px;
                    cursor: pointer;
                    color: #999;
                    display: inline-block;
                    height: 26px;
                    line-height: 26px;
                    padding: 0 20px 0 23px;
                    position: relative;
                    margin: 0 10px 10px 0;
                    text-decoration: none;
                    transition: color 0.2s;
                }
                .tag::before {
                    background: #fff;
                    border-radius: 10px;
                    box-shadow: inset 0 1px rgba(0, 0, 0, 0.25);
                    content: '';
                    height: 6px;
                    left: 10px;
                    position: absolute;
                    width: 6px;
                    top: 10px;
                }
                .tag::after {
                    background: #fff;
                    border-bottom: 13px solid transparent;
                    border-left: 10px solid #eee;
                    border-top: 13px solid transparent;
                    content: '';
                    position: absolute;
                    right: 0;
                    top: 0;
                }
                .tag:hover,.tag.hightlight {
                    background-color: #e42c64;
                    color: white;
                }
                .tag:hover::after,.tag.hightlight::after {
                    border-left-color: #e42c64;
                }
            }
        }
    }
</style>
