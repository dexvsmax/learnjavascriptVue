import { shallowMount } from '@vue/test-utils'
import TablePerPage from '@/components/TablePerPage.vue'

describe('TablePerPage.vue', () => {
  it('check if it is vue instance', () => {
    const wrapper = shallowMount(TablePerPage, {
      propsData: {
        value: 1
      }
    })
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('it contains value param', () => {
    const wrapper = shallowMount(TablePerPage, {
      propsData: {
        value: 1
      }
    })
    expect(wrapper.vm.value).toBeDefined()
    expect(wrapper.vm.value).toEqual(1)

    wrapper.setProps({
      value: 2
    })
    expect(wrapper.vm.value).toBeDefined()
    expect(wrapper.vm.value).toEqual(2)
  })

  it('it contains list param', () => {
    const wrapper = shallowMount(TablePerPage, {
      propsData: {
        value: 1
      }
    })
    expect(wrapper.vm.list).toBeDefined()
    expect(wrapper.vm.list).toEqual([1, 5, 10, 25])

    wrapper.setProps({
      list: [2, 4]
    })
    expect(wrapper.vm.list).toBeDefined()
    expect(wrapper.vm.list).toEqual([2, 4])
  })

  it('changed event', () => {
    const wrapper = shallowMount(TablePerPage, {
      propsData: {
        value: 1
      }
    })
    expect(wrapper.vm.changed).toBeDefined()
    wrapper.vm.changed(3)
    expect(wrapper.emitted('input').length).toEqual(1)
    expect(wrapper.emitted('input')[0]).toEqual([3])
  })

  it('check elements count render', () => {
    const wrapper = shallowMount(TablePerPage, {
      propsData: {
        value: 1
      }
    })
    expect(wrapper.find('select.form-control').findAll('option').length).toEqual(4)
  })
})
