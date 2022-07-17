import { createStore } from 'vuex'

export default createStore({
  state: {
    baseUrl: "",
    countries: [],
    countryCodes: [],
    recentStations: [],
    mostPopular: [],
    mostRated: [],
    allStations: [],
    urls: {
      countries: "/json/countries",
      countryCodes: "/json/countrycodes",
      recentStations: "/json/stations/lastchange/10",
      mostPopular: "/json/stations/topclick/10",
      mostRated: "/json/stations/topvote/10",
      allStations: "/json/stations",
      search: {
        id: "/json/stations/byuuid/",
        name: "/json/stations/byname/",
        nameexact: "/json/stations/bynameexact/",
        country: "/json/stations/bycountry/",
        countrycode: "/json/stations/bycountrycodeexact/",
        language: "/json/stations/bylanguage/",
        tag: "/json/stations/bytag/"
      },
      click: '/json/url/'
    },
    theme: "dark",
    volume: 100,
    initialLoad: false
  },

  actions: {
    setBase(store, url) {
      store.commit("setBase", url)
    },
    add(store, arr) {
      store.commit("add", arr)
    },
    setTheme(store, theme) {
      store.commit("setTheme", theme)
    },
    loaded(store) {
      store.commit("loaded")
    },
    volume(store, value) {
      store.commit("volume", value)
    }
  },

  mutations: {
    setBase(state, url) {
      state.baseUrl = url
    },
    add(state, arr) {
      state[arr[0]] = arr[1]
    },
    setTheme(store, theme) {
      store.theme = theme
    },
    loaded(store) {
      store.initialLoad = true
    },
    volume(store, value) {
      store.volume = value
    }
  }
})
