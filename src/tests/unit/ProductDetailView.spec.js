import { mount } from '@vue/test-utils'
import ProductDetailView from '@/views/product/ProductDetailView.vue'

describe('ProductDetailView', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ProductDetailView)
  })

  it('returns false when product name is empty', () => {
    wrapper.vm.productDetail = { name: '' } // Đảm bảo bạn khởi tạo productDetail
    wrapper.vm.errors = {}; // Khởi tạo errors nếu cần
    expect(wrapper.vm.validateForm()).toBe(false)
    expect(wrapper.vm.errors.name).toBe("Tên sản phẩm phải điền đầy đủ")
  })
})
