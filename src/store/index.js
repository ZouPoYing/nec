import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userId: '',
    song: {
      songId: '',
      songName: '歌曲名',
      songAuthor: '作者',
      songDate: '',
      songPic: 'song/song.jpg',
      songTime: '',
      songType: '',
      songSong: 'mp3/song.jpg'
    }
  },
  mutations: {
    getUserId(state,payload) {
      state.userId = payload
    },
    getSongId(state,payload) {
      state.song.songId = payload
    },
    getSong(state,payload) {
      state.song = payload
    }
  },
  actions: {

  },
  getters: {
    
  },
  modules: {

  }
})

export default store
