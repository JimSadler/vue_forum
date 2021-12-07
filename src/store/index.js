import { createStore } from 'vuex'
import sourceData from '@/data'
import { findById, upsert } from '@/helpers'

export default createStore({
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },
  getters: {
    authUser: (state, getters) => {
      return getters.user(state.authId)
    },
    thread: (state) => {
      return (id) => {
        const thread = findById(state.threads, id)

        return {
          ...thread,
          get author() {
            return findById(state.users, thread.userId)
          },
          get repliesCount() {
            return thread.posts.length - 1
          },
          get contributorsCount() {
            return thread.contributors.length
          }
        }
      }
    },
    user: (state) => {
      return (id) => {
        const user = findById(state.users, id)
        if (!user) return null

        return {
          ...user,
          get postsCounts() {
            return this.posts.length
          },
          get posts() {
            return state.posts.filter((post) => post.userId == user.id)
          },
          get threads() {
            return state.threads.filter((thread) => thread.userId === user.id)
          },
          get threadsCount() {
            return this.threads.length
          }
        }
      }
    }
  },
  mutations: {
    setPost(state, { post }) {
      upsert(state.posts, post)
    },
    appendPostToThread: makeAppendChildToParentMutation({
      parent: 'threads',
      child: 'posts'
    }),
    setUser(state, { user, userId }) {
      const userIndex = state.users.findIndex((user) => user.id === userId)
      state.users[userIndex] = user
    },
    setThread(state, { thread }) {
      upsert(state.threads, thread)
    },
    appendThreadToForum: makeAppendChildToParentMutation({
      parent: 'forums',
      child: 'threads'
    }),
    appendThreadToUser: makeAppendChildToParentMutation({
      parent: 'users',
      child: 'threads'
    }),
    appendContributorToThread: makeAppendChildToParentMutation({
      parent: 'threads',
      child: 'contributors'
    })
  },
  actions: {
    createPost({ commit, state }, post) {
      post.id = 'ggg' + Math.random()
      post.userId = state.authId
      post.publishedAt = Math.floor(Date.now() / 1000)
      commit('setPost', { post })
      commit('appendPostToThread', {
        childId: post.id,
        parentId: post.threadId
      })
      commit('appendContributorToThread', {
        childId: state.authId,
        parentId: post.threadId
      })
    },
    async createThread({ commit, state, dispatch }, { text, title, forumId }) {
      const id = 'ggg' + Math.random()
      const userId = state.authId
      const publishedAt = Math.floor(Date.now() / 1000)
      const thread = { forumId, title, publishedAt, userId, id }
      commit('setThread', { thread })
      commit('appendThreadToUser', { parentId: userId, childId: id })
      commit('appendThreadToForum', { parentId: forumId, childId: id })
      dispatch('createPost', { text, threadId: id })
      return findById(state.threads, id)
    },
    async updateThread({ commit, state }, { title, text, id }) {
      const thread = findById(state.threads, id)
      const post = findById(state.posts, thread.posts[0])
      const newThread = { ...thread, title }
      const newPost = { ...post, text }
      commit('setThread', { thread: newThread })
      commit('setPost', { post: newPost })
      return newThread
    },
    updateUser({ commit }, user) {
      commit('setUser', { user, userId: user.id })
    }
  }
})
function makeAppendChildToParentMutation({ parent, child }) {
  return (state, { childId, parentId }) => {
    const resource = findById(state[parent], parentId)
    resource[child] = resource[child] || []
    if (!resource[child].includes(childId)) {
      resource[child].push(childId)
    }
  }
}
