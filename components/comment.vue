<template>
	<div class="comment-container">
        <a-divider>发表评论</a-divider>
		<a-comment>
            <avatar slot="avatar" :user="user" />
			<div slot="content">
				<a-form-item>
					<a-textarea ref="replyContainer" :placeholder="r_comment ? `你正在回复${r_comment.commentBy.username}` : ''" :rows="4" :value="value" @change="handleChange" />
				</a-form-item>
				<a-form-item>
					<a-button v-if="r_comment || value.length" html-type="submit" style="margin-right: 20px;" @click="cancelSubmit">
						取消
					</a-button>
					<a-button :loading="submitting" html-type="submit" type="primary" @click="handleSubmit">
						评论
					</a-button>
				</a-form-item>
			</div>
		</a-comment>
		<a-list v-if="filterList.length" :data-source="filterList" :header="`总 ${comments.length} 条评论`" item-layout="horizontal">
			<a-list-item slot="renderItem" slot-scope="item">
				<singleComment :comment="item" />
			</a-list-item>
		</a-list>
	</div>
</template>

<script>
import moment from 'moment'
import {
    mapState
} from 'vuex'
import avatar from './avatar'
import singleComment from './singleComment'
import {
    getComment,
    createComment
} from '@/api/index'
import { toastr } from '@/utils/index'
export default {
    components: {
        singleComment,
        avatar
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
            },
            user: (state) => {
                return state.user
            }
        }),
        filterList() {
            const allChildList = []; const firstList = []
            this.comments.forEach((v) => {
                if (v.parentId) {
                    allChildList.push(v)
                } else {
                    firstList.push(v)
                }
            })
            firstList.forEach((v) => {
                this.$set(v, 'children', allChildList.filter((val) => {
                    return val.parentId === v._id
                }))
            })
            return firstList.slice()
        }
    },
    watch: {
        r_comment(value) {
            if (value) {
                this.reply(value)
            }
        }
    },
    mounted() {
        this.getCommentList()
    },
    methods: {
        getCommentList() {
            this.articleId = this.$route.params.id
            getComment({
                articleId: this.articleId
            }).then((res) => {
                if (res) {
                    this.comments = res
                }
            })
        },
        cancelSubmit() {
            this.value = ''
            this.$store.commit('clearComment')
        },
        async handleSubmit() {
            if (!this.user) {
                toastr(Swal, 'info', '请先登录，再进行评论！')
            }
            if (!this.value) {
                return
            }
            this.submitting = true
            let params = {
                articleId: this.articleId,
                content: this.value,
                commentBy: {
                    username: this.user.username,
                    avatar: this.user.avatar
                }
            }
            const r_comment = this.r_comment
            if (r_comment) {
                params = Object.assign({
                    replyBy: r_comment.commentBy,
                    parentId: r_comment.parentId || r_comment._id
                }, params)
            }
            const res = await createComment(params)
            this.submitting = false
            if (res) {
                this.comments = [res, ...this.comments]
                this.value = ''
                this.$store.commit('clearComment')
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
