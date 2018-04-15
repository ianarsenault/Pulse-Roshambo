import Vue from 'vue'
import App from '@/App';

describe('Landing.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(App)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.card-header-title').textContent)
      .toEqual('PI Fighter One:')
  })
})
