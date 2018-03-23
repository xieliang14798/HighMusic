import * as types from './mutation-types'
import {playMode} from "../common/js/config";
import {shuffle} from "../common/js/utils";
import {saveSearch,deleteSearch,clearSearch} from "../common/js/cache";

function findIndex(list, song) {
    return list.findIndex((item) => {
        return item.id === song.id
    })
}

export const selectPlay = function ({commit, state}, {list, index}) {
    commit(types.SET_SEQUENCE_LIST, list)
    if (state.mode === playMode.random) {
        let randomList = shuffle(list)
        commit(types.SET_PLAYLIST, randomList)
        index = findIndex(randomList, list[index])
    } else {
        commit(types.SET_PLAYLIST, list)
    }
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function ({commit}, {list}) {
    commit(types.SET_PLAY_MODE, playMode.random)
    commit(types.SET_SEQUENCE_LIST, list)
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    commit(types.SET_CURRENT_INDEX, 0)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}
export const insertSong = function ({commit, state}, {song}) {
    let playlist = state.playlist.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex

    //记录当前歌曲
    let currentSong = playlist[currentIndex]
    // 查找当前列表中是否有待插入的歌曲并返回其索引
    let fpIndex = findIndex(playlist, song)
    //将歌曲插入到当前播放歌曲后面，索引加1
    currentIndex++
    playlist.splice(currentIndex, 0, song)
    //如果之前已经包含了这首歌曲
    if (fpIndex > -1) {
        //如果当前插入的序号在要删除的序号前面
        if (currentIndex > fpIndex) {
            playlist.splice(fpIndex, 1)
            currentIndex--
        } else {
            //如果当前插入的序号在要删除的序号前面,因为新插入了一首歌曲，所以删除的序号要加1
            playlist.splice(fpIndex + 1, 1)
        }
    }
    //处理sequenceList，逻辑和playlist一致
    let currentSIndex = findIndex(sequenceList, currentSong)
    let fsIndex = findIndex(sequenceList, song)
    currentSIndex++
    sequenceList.splice(currentSIndex, 0, song)
    if (fsIndex > -1) {
        if (currentSIndex > fsIndex) {
            sequenceList.splice(fsIndex, 1)
        } else {
            sequenceList.splice(fsIndex + 1, 1)
        }
    }
    commit(types.SET_PLAYLIST, playlist)
    commit(types.SET_SEQUENCE_LIST, sequenceList)
    commit(types.SET_CURRENT_INDEX, currentIndex)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}

export const saveSearchHistory = function ({commit}, query) {
    commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}
export const deleteSearchHistory=function ({commit},query) {
    commit(types.SET_SEARCH_HISTORY,deleteSearch(query))
}
export const clearSearchHistory = function ({commit}) {
    commit(types.SET_SEARCH_HISTORY,clearSearch())
}
