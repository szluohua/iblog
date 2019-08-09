<template>
	<div class="comment-container">
		<a-list v-if="comments.length" :data-source="comments" :header="`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`" item-layout="horizontal">
			<a-list-item slot="renderItem" slot-scope="item">
				<singleComment :comment="item" />
			</a-list-item>
		</a-list>
		<a-comment>
			<a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />
			<div slot="content">
				<a-form-item>
					<a-textarea ref="replyContainer" :placeholder="r_comment ? `你正在回复${r_comment.commentBy.username}` : ''" :rows="4" :value="value" @change="handleChange" />
				</a-form-item>
				<a-form-item>
					<a-button v-if="r_comment" html-type="submit" style="margin-right: 20px;" @click="cancelSubmit">
						Cancel
					</a-button>
					<a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
						Add Comment
					</a-button>
				</a-form-item>
			</div>
		</a-comment>
	</div>
</template>

<script>
import moment from 'moment'
import {
    getComment,
    createComment
} from '@/api/index'
import {
    mapState
} from 'vuex'
import singleComment from './singleComment'
export default {
    components: {
        singleComment
    },
    data() {
        return {
            comments: [],
            submitting: false,
            value: '',
            moment,
            articleId: ''
        }
    },
    computed: {
        ...mapState({
            r_comment: (state) => {
                return state.comment
            }
        })
    },
    watch: {
        r_comment(value) {
            if (value) {
                this.reply(value)
            }
        }
    },
    mounted() {
        this.articleId = this.$route.params.id
        getComment({
            articleId: this.articleId
        }).then((res) => {
            if (res) {
                this.comments = res
            }
        })
    },
    methods: {
        cancelSubmit() {
            this.value = ''
            this.$store.commit('clearComment')
        },
        async handleSubmit() {
            if (!this.value) {
                return
            }
            this.submitting = true
            let params = {
                articleId: this.articleId,
                content: this.value,
                commentBy: {
                    username: 'Han Solo',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                }
            }
            const r_comment = this.r_comment
            if (r_comment) {
                params = Object.assign({
                    replyBy: r_comment.commentBy,
                    parentId: r_comment._id
                }, params)
            }
            const res = await createComment(params)
            this.submitting = false
            if (res) {
                this.comments = [res, ...this.comments]
                this.value = ''
            }
        },
        reply(comment) {
            this.$refs.replyContainer.focus()
        },
        handleChange(e) {
            this.value = e.target.value
        }
    }
}
</script>

<style lang="scss" scoped>
	// .comment-container {
	//   max-width: 980px;
	// }
</style>
