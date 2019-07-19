import {saveSearch, deleteSearch, clearSearch, loadSearch} from '@/utils/cache'
import {setStorageSync, getStorageSync} from '@/utils/storage'
const state = {
  data: [],
  cityName: '广州市',
  city: [],
  user: getStorageSync('userInfo') ? getStorageSync('userInfo') : '',
  address: '',
  searchHitory: loadSearch(),
  goods: [],
  conponData: {},
  DefaultAddress: getStorageSync('DefaultAddress')
}

const mutations = {
  CHANGE_SETTING: (state, data) => {
    state.data = data
  },
  SET_DfAD: (state, DefaultAddress) => {
    state.DefaultAddress = DefaultAddress
    setStorageSync('DefaultAddress', DefaultAddress)
  },
  SET_COUPONDATA: (state, data) => {
    state.conponData = data
  },
  SET_CITYNAME: (state, cityName) => {
    state.cityName = cityName
  },
  SET_GOODS: (state, goods) => {
    state.goods = goods
  },
  SET_CITY: (state, city) => {
    state.city = city
  },
  SET_ADDRESS: (state, address) => {
    state.address = address
  },
  SET_USER: (state, user) => {
    state.user = user
    setStorageSync('userInfo', user)
  },
  SET_SEARCH_HITORY: (state, hitory) => {
    state.searchHitory = hitory
  }
}

const actions = {
  changeSetting ({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  setUser ({ commit }, data) {
    commit('SET_USER', data)
  },
  setGood ({ commit }, good) {
    commit('SET_GOODS', good)
  },
  saveSearchHitory  ({commit}, query) {
    commit('SET_SEARCH_HITORY', saveSearch(query))
  },
  deleteSearchHitory  ({commit}, query) {
    commit('DEL_SEARCH_HITORY', deleteSearch(query))
  },
  clearSearchHitory  ({commit}) {
    commit('SET_SEARCH_HITORY', clearSearch())
  }
}

export default {
  state,
  mutations,
  actions
}
