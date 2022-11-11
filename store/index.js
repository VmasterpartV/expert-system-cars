import {
    getQuestions
  } from '../api'
  
  export const actions = {
    async getQuestions ({ commit }, data) {
      const res = await getQuestions(data)
      return res
    }
  }
  