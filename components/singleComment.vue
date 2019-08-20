<template>
    <a-comment :author="comment.commentBy.username" :avatar="comment.commentBy.avatar" :content="comment.content" :datetime="$dayjs().from(comment.createdAt)">
        <template slot="actions">
            <span>
                <a-tooltip title="Like">
                <a-icon
                    type="like"
                    :theme="action === 'liked' ? 'filled' : 'outlined'"
                    @click="like"
                />
                </a-tooltip>
                <span style="padding-left: '8px';cursor: 'auto'">
                {{ likes }}
                </span>
            </span>
            <span>
                <a-tooltip title="Dislike">
                <a-icon
                    type="dislike"
                    :theme="action === 'disliked' ? 'filled' : 'outlined'"
                    @click="dislike"
                />
                </a-tooltip>
                <span style="padding-left: '8px';cursor: 'auto'">
                {{ dislikes }}
                </span>
            </span>
            <span @click="reply">Reply to</span>
        </template>
    </a-comment>
</template>

<script>
export default {
    name: 'SingleComment',
    components: {},
    props: {
        comment: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            likes: 0,
            dislikes: 0,
            action: null
        }
    },
    methods: {
        like() {
            this.likes = 1
            this.dislikes = 0
            this.action = 'liked'
        },
        dislike() {
            this.likes = 0
            this.dislikes = 1
            this.action = 'disliked'
        },
        reply() {
            this.$store.commit('replyComment', this.comment)
        }
    }
}
</script>

<style scoped lang="scss">
</style>
