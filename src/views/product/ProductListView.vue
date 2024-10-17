<template>
  <div class="home container mt-5">
    <div class="d-flex justify-content-start mb-3">
      <h4>Tất cả thiết bị</h4>
    </div>

    <div class="form-group d-flex justify-content-between">
      <div class="input-group w-25">
        <div class="input-group-prepend">
          <span class="input-group-text h-100"><i class="fas fa-search"></i></span>
        </div>
        <input 
          type="text" 
          v-model="searchText" 
          placeholder="Tìm kiếm theo tên thiết bị..." 
          class="form-control"
        />
      </div>

      <button @click="isShowModal = true" class="btn btn-show-modal-product">Thêm mới</button>
    </div>

    <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">TRẠNG THÁI</th>
            <th scope="col">TÊN THIẾT BỊ</th>
            <th scope="col">SỐ SERIAL</th>
            <th scope="col">LOẠI</th>
            <th scope="col">CẬP NHẬT GẦN ĐÂY</th>
            <th scope="col">NGƯỜI SỬ DỤNG</th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in filterProducts" :key="item.id">
            <th scope="row">{{ item.id }}</th>
            <td>{{ item.status == 0 ? 'Trong kho' : 'Đang sử dụng' }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.serial_number }}</td>
            <td>{{ getCategoryName(item.category_id) }}</td>
            <td>{{ formatDateString(item.updated_at) }}</td>
            <td>{{ getUserName(item.user_id) }}</td>
            <td>
              <button class="btn">
                <router-link :to="`/products/${item.id}`">
                  <i class="far fa-edit"></i>
                </router-link>
              </button>
            </td>
          </tr>
        </tbody>
    </table>

    <!-- Modal -->
    <div v-if="isShowModal" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <p class="modal-title">Thêm thiết bị mới</p>
        <span class="close" @click="closeModal"><i class="fas fa-times"></i></span>
        
        <form @submit.prevent="submitAddProduct">
          <div class="form-group row align-items-center">
            <label for="product_name" class="col-md-3 text-end ">Tên thiết bị <span class="text-danger">*</span></label>
            <div class="col-md-9">
              <input type="text" class="form-control col-md-5" :class="errors.name ? 'is-invalid' : ''" id="product_name" v-model="product.name">
            </div>
            <span v-if="errors.name" class="invalid-feedback">{{ errors.name }}</span>
          </div>

          <div class="form-group row align-items-center">
            <label for="product_serial_number" class="col-md-3">Số serial <span class="text-danger">*</span></label>
            <div class="col-md-9">
              <input type="text" class="form-control col-md-5" :class="errors.serial_number ? 'is-invalid' : ''" id="product_serial_number" v-model="product.serial_number">
            </div>
            <span v-if="errors.serial_number" class="invalid-feedback">{{ errors.serial_number }}</span>
          </div>

          <div class="form-group row align-items-center">
            <label for="product_price" class="col-md-3">Chi phí <span class="text-danger">*</span></label>
            <div class="col-md-9">
              <input type="number" class="form-control col-md-5" :class="errors.price ? 'is-invalid' : ''" id="product_price" v-model="product.price">
            </div>
            <span v-if="errors.price" class="invalid-feedback">{{ errors.price }}</span>
          </div>

          <div class="form-group row align-items-center">
            <label for="product_category_id" class="col-md-3">Loại linh kiện <span class="text-danger">*</span></label>
            <div class="col-md-9">
              <select class="form-control" :class="errors.category_id ? 'is-invalid' : ''" id="product_category_id" v-model="product.category_id">
                <option value="" disabled selected>Chọn loại linh kiện</option>
                <option v-for="category in productCategory" :key="category.id" :value="category.id">{{ category.name }}</option>
              </select>
            </div>
            <span v-if="errors.category_id" class="invalid-feedback">{{ errors.category_id }}</span>
          </div>

          <div class="form-group row align-items-center">
            <label for="product_note" class="col-md-3">Mô tả</label>
            <div class="col-md-9">
              <textarea type="text" class="form-control col-md-5" id="product_note" rows="5" v-model="product.note"></textarea>
            </div>
          </div>

          <div class="form-group row align-items-center">
            <label for="product_note" class="col-md-3">Tệp đính kèm</label>
            <div class="col-md-9">
              <input class="form-control" type="file" @change="onFileChange" accept="image/*">
            </div>

            <!-- Hiển thị ảnh đã chọn -->
            <div v-if="product.image" class="mt-2">
                <img :src="product.image" alt="Selected Image" style="max-width: 100px;">
              </div>
          </div>

          <button :disabled="isSubmitting" type="submit" class="btn btn-add-product">Lưu lại</button>
        </form>
      </div>
    </div>  
    </div>

    <div class="d-flex justify-content-center" v-if="isShowAlert">
      <div class="alert alert-success w-50" role="alert">
        Thêm mới thành công
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { myMixin } from '@/mixin';

export default {
  name: "ProductListView",
  mixins: [myMixin],
  data() {
      return {
          searchText: '',
          isShowModal: false,
          isShowAlert: false,
          isSubmitting: false,
          selectedFile: null,
          product: {
            name : '',
            serial_number : '',
            price : '',
            category_id : '',
            note : '',
            status : 0,
            image: null
          },
          errors: {},      
          currentPage: 1,        // Trang hiện tại
          itemsPerPage: 5, 
      }
  },
  computed: {
      ...mapGetters(["productList", "productCategory", "userList"]),
      filterProducts() {
          if (this.searchText != '') {
              return this.productList.filter(item => item.name.toLowerCase().includes(this.searchText.toLowerCase()));
          } else {
              return this.productList;
          }
      }
  },
  methods: {
      ...mapActions({
          getProductList: "products/getProductList",
          createProduct: "products/createProduct"
      }),

      validateForm() {
          this.errors = {};

          if (!this.product.name) {
            this.errors.name = "Tên sản phẩm phải điền đầy đủ";
          }

          if (!this.product.serial_number) {
            this.errors.serial_number = "Số serial phải điền đầy đủ";
          }

          if (!this.product.price) {
            this.errors.price = 'Số tiền phải điền đầy đủ';
          } else if (isNaN(this.product.price)) {
            this.errors.price = 'Số tiền không hợp lệ';
          } else if (Number(this.product.price) <= 0) {
            this.errors.price = 'Số tiền phải lớn hơn 0';
          } 
          
          if (!this.product.category_id) {
            this.errors.category_id = "Loại sản phẩm không được trống";
          }

          return Object.keys(this.errors).length === 0;
      },

      getCategoryName(categoryId) {
          return this.productCategory?.find(category => category.id == categoryId)?.name || 'Không xác định';
      },

      getUserName(userId) {
          return this.userList?.find(user => user.id === userId)?.name || '';
      },

      closeModal() {
          this.isShowModal = false;
      },

      async submitAddProduct() {
          if (this.validateForm()) {
              this.isSubmitting = true

              this.createProduct(this.product).then(() => {
                this.isShowModal = false
                this.isShowAlert = true

                // Ẩn alert sau 2 giây
                setTimeout(() => {
                  this.isShowAlert = false;
                }, 2000);

                // Đặt lại giá trị default cho product
                this.product = {
                  name: '',
                  serial_number: '',
                  price: '',
                  category_id: '',
                  note: '',
                  status: 0
                };

                this.isSubmitting = false
            });
          }
      },

      onFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          this.selectedFile = file;
          this.convertToBase64(file);
        }
      },
      
      // Chuyển đổi file ảnh sang base64
      convertToBase64(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.product.image = e.target.result;  // Lưu base64 vào imageBase64
        };
        reader.readAsDataURL(file);  // Đọc file dưới dạng Data URL (base64)
      }
  },
  created() {
      this.getProductList(); //Get product API
  }
} ;
</script>

<style scoped>
    .home {
      padding: 20px 30px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .input-group-text {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }

    .btn-show-modal-product {
      color: #1D37B5;
      border: 1px solid #1D37B5;
    }

    .btn-show-modal-product:hover {
      color: #fff;
      background-color: #1D37B5;
    }

    .btn-add-product {
      color: #fff;
      background-color: #1D37B5;
    }

    .btn-add-product:hover {
      color: #fff;
      background-color: #1D37B5;
      filter: brightness(1.3);
    }

    .form-group label {
      text-align: right;
    }

    .form-group img {
      margin-left: -160px;
    }

    .alert {
      transition: all 0.5s ease;
    }

    .invalid-feedback {
      display: block;
      text-align: left;
      margin-left: 150px;
    }
</style>
