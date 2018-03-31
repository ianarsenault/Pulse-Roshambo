import Api from '@/services/Api'

export default {
  submitBattle(params) {
    return Api().post('battle', params)
  },
}
