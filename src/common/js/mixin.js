import {mapGetters, mapMutations, mapActions} from 'vuex'

export const playlistMixin = {
    computed: {
        ...mapGetters(['playlist'])
    },
    mounted() {
        this.handlePlaylist(this.playlist)
    },
    activated() {
        this.handlePlaylist(this.playlist)
    },
    watch: {
        playlist(newVal) {
            this.handlePlaylist(newVal)
        }
    },
    methods: {
        handlePlaylist() {
            throw new Error('component must implement handlePlaylist method')
        }
    }
}

export const searchMixin = {
    data() {
        return {
            query: ''
        }
    },
    methods: {
        onQueryChange(query) {
            this.query = query
        },
        blurInput() {
            this.$refs.searchBox.blur()
        },
        addQuery(query) {
            this.$refs.searchBox.setQuery(query)
        }
    }
}
