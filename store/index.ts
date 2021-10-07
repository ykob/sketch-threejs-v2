import { GetterTree, ActionTree, MutationTree } from 'vuex/types'
import { IContentDocument } from '@nuxt/content/types/content'

export const state = (): {
  pages: IContentDocument[]
} => ({
  pages: [],
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  pages: state => state.pages,
}

export const mutations: MutationTree<RootState> = {
  setPages: (state, pages: IContentDocument[]) => {
    state.pages = pages
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async getPages({ state, commit }) {
    if (state.pages.length === 0) return

    const pages = await this.$content('sketch').fetch()

    commit('setPages', pages)
  },
}