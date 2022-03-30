import { GetterTree, ActionTree, MutationTree } from 'vuex/types'
import { IContentDocument } from '@nuxt/content/types/content'

export const state = (): {
  pages: IContentDocument[]
  resolution: {
    x: number
    y: number
  }
  isReady: boolean
} => ({
  pages: [],
  resolution: {
    x: 0,
    y: 0,
  },
  isReady: false,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  pages: (state) => state.pages,
  isReady: (state) => state.isReady,
}

export const mutations: MutationTree<RootState> = {
  setPages: (state, pages: IContentDocument[]) => {
    state.pages = pages
  },
  setSize: (state, { x, y }: { x: number; y: number }) => {
    state.resolution.x = x
    state.resolution.y = y
  },
  ready: (state) => {
    state.isReady = true
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async getPages({ state, commit }) {
    if (state.pages.length === 0) {
      return
    }

    const pages = await this.$content('sketch').fetch()

    commit('setPages', pages)
  },
}
