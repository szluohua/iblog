<template>
    <div class="MdRender-contaienr">
        <template v-if="article">
            <div class="article-header">
                <h2>{{ article.title }}</h2>
                <div class="article-header-info">
                    <span><a-icon type="eye" />{{ article.viewed }}</span>
                    <span><a-icon type="message" />{{ article.comment }}</span>
                    <span><a-icon type="star" />{{ article.stared }}</span>
                    <span><a-icon type="user" />{{ article.createBy.username }}</span>
                </div>
            </div>
            <div v-if="article.content" id="viewerSection" class="markdown-body" v-html="article.content" />
        </template>
        <a-icon v-else class="loading-container" type="loading" />
        <comment />
</div>
</template>

<script>
import comment from './comment'
export default {
    name: 'MdRender',
    components: {
        comment
    },
    props: {
        article: {
            type: [Object, String],
            default: () => {
                return ''
            }
        }
    },
    data() {
        return {
            renderContent: ''
        }
    },
    mounted() {
        // tui.Editor.factory({
        //     el: document.querySelector('#viewerSection'),
        //     viewer: true,
        //     initialValue: this.article.content
        // })
    }
}
</script>

<style scoped lang="scss">
.MdRender-contaienr {
    box-sizing: border-box;
    width: calc(100% - 360px);
    flex: 1;
    // min-width: 200px;
    // max-width: 980px;
    // margin: 0 auto;
    padding: 40px;
    .loading-container {
        font-size: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 500px;
    }
    .markdown-body {
        margin: 80px 0;
    }
    .article-header {
        text-align: center;
        &-info {
            display: flex;
            flex-direction: row-reverse;
            justify-content: center;
            & span {
                margin-left: 20px;
                &:last-of-type{
                    margin-left: 0;
                }
                & i {
                    margin-right: 5px;
                }
            }
        }
    }
}

@media (max-width: 767px) {
    .MdRender-contaienr {
        padding: 15px;
    }
}
</style>
