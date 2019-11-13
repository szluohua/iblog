<template>
    <a-avatar v-if="typeof user === 'object' && user.avatar" :src="avatarUrl + user.avatar" :alt="user.username" />
    <a-avatar v-else-if="typeof user === 'object' && user.username" style="color: #f56a00; backgroundColor: #fde3cf">
        {{ showStr(user.username) }}
    </a-avatar>
    <a-avatar v-else-if="typeof user === 'string' && user !== ''" style="color: #f56a00; backgroundColor: #fde3cf">
        {{ showStr(user) }}
    </a-avatar>
    <a-avatar v-else icon="user" />
</template>

<script>
export default {
    name: 'Avatar',
    props: {
        user: {
            type: [String, Object],
            default: () => {
                return {}
            }
        }

    },
    data() {
        return {
            avatarUrl: `${process.env.apiUrl}/v1/getFile?path=`
        }
    },
    methods: {
        showStr(name) {
            const nameSplit = String(name).split(' ')
            let initials
            if (nameSplit.length === 1) {
                initials = nameSplit[0] ? nameSplit[0].charAt(0) : '?'
            } else {
                initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0)
            }
            return initials.toUpperCase()
        }
    }
}
</script>
