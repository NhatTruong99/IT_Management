<template>
  <div class="home container mt-5">
    <div class="d-flex justify-content-start mb-3">
      <h4>Tất cả linh kiện</h4>
    </div>

    <div class="form-group d-flex justify-content-between">
      <div class="input-group w-25">
        <div class="input-group-prepend">
          <span class="input-group-text h-100"><i class="fas fa-search"></i></span>
        </div>
        <input 
          type="text" 
          v-model="searchText" 
          placeholder="Tìm kiếm theo tên linh kiện..." 
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
            <th scope="col">TÊN LINH KIỆN</th>
            <th scope="col">SỐ SERIAL</th>
            <th scope="col">LOẠI</th>
            <th scope="col">CẬP NHẬT GẦN ĐÂY</th>
            <th scope="col">NGƯỜI SỬ DỤNG</th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in filterHardwares" :key="item.id">
            <th scope="row">{{ item.id }}</th>
            <td>{{ item.status == 0 ? 'Trong kho' : 'Đang sử dụng' }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.serial_number }}</td>
            <td>{{ getCategoryName(item.type) }}</td>
            <td>{{ formatDateString(item.updated_at) }}</td>
            <td>{{ getUserName(item.user_id) }}</td>
            <td>
              <button class="btn">
                <router-link :to="`/hardwares/${item.id}`">
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
        <p class="modal-title">Thêm linh kiện mới</p>
        <span class="close" @click="closeModal"><i class="fas fa-times"></i></span>
        
        <form @submit.prevent="submitAddHardware">
          <div class="form-group row align-items-center">
            <label for="hardware_name" class="col-md-3 text-end ">Tên linh kiện <span class="text-danger">*</span></label>
            <div class="col-md-9">
              <input type="text" class="form-control col-md-5" :class="errors.name ? 'is-invalid' : ''" id="hardware_name" v-model="hardware.name">
            </div>
            <span v-if="errors.name" class="invalid-feedback">{{ errors.name }}</span>
          </div>

          <div class="form-group row align-items-center">
            <label for="product_serial_number" class="col-md-3">Số serial <span class="text-danger">*</span></label>
            <div class="col-md-9">
              <input type="text" class="form-control col-md-5" :class="errors.serial_number ? 'is-invalid' : ''" id="product_serial_number" v-model="hardware.serial_number">
            </div>
            <span v-if="errors.serial_number" class="invalid-feedback">{{ errors.serial_number }}</span>
          </div>

          <div class="form-group row align-items-center">
            <label for="product_price" class="col-md-3">Chi phí <span class="text-danger">*</span></label>
            <div class="col-md-9">
              <input type="number" class="form-control col-md-5" :class="errors.price ? 'is-invalid' : ''" id="product_price" v-model="hardware.price">
            </div>
            <span v-if="errors.price" class="invalid-feedback">{{ errors.price }}</span>
          </div>

          <div class="form-group row align-items-center">
            <label for="product_category_id" class="col-md-3">Loại thiết bị <span class="text-danger">*</span></label>
            <div class="col-md-9">
              <select class="form-control" :class="errors.category_id ? 'is-invalid' : ''" id="product_category_id" v-model="hardware.type">
                <option value="" disabled selected>Chọn loại thiết bị</option>
                <option v-for="category in hardwareCategory" :key="category.id" :value="category.id">{{ category.name }}</option>
              </select>
            </div>
            <span v-if="errors.category_id" class="invalid-feedback">{{ errors.category_id }}</span>
          </div>

          <div class="form-group row align-items-center">
            <label for="product_note" class="col-md-3">Mô tả</label>
            <div class="col-md-9">
              <textarea type="text" class="form-control col-md-5" id="product_note" rows="5" v-model="hardware.note"></textarea>
            </div>
          </div>

          <div class="form-group row align-items-center">
            <label for="product_note" class="col-md-3">Tệp đính kèm</label>
            <div class="col-md-9">
              <input class="form-control" type="file" @change="onFileChange" accept="image/*">
            </div>

            <!-- Hiển thị ảnh đã chọn -->
            <div v-if="hardware.image" class="mt-2">
                <img :src="hardware.image" alt="Selected Image" style="max-width: 100px;">
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
  name: "HardwareListView",
  mixins: [myMixin],
  data() {
      return {
          searchText: '',
          isShowModal: false,
          isShowAlert: false,
          isSubmitting: false,
          selectedFile: null,
          hardware: {
            name : '',
            serial_number : '',
            price : '',
            type : '',
            note : '',
            status : 0,
            image: null
          },
          errors: {}
      }
  },
  computed: {
      ...mapGetters(["hardwareList", "hardwareCategory", "userList"]),
      filterHardwares() {
          if (this.searchText != '') {
              return this.hardwareList.filter(item => item.name.toLowerCase().includes(this.searchText.toLowerCase()));
          } else {
              return this.hardwareList;
          }
      }
  },
  methods: {
      ...mapActions({
          getHardwareList: "hardwares/getHardwareList",
          createHardware: "hardwares/createHardware"
      }),

      validateForm() {
          this.errors = {};

          if (!this.hardware.name) {
            this.errors.name = "Tên linh kiện phải điền đầy đủ";
          }

          if (!this.hardware.serial_number) {
            this.errors.serial_number = "Số serial phải điền đầy đủ";
          }

          if (!this.hardware.price) {
            this.errors.price = 'Số tiền phải điền đầy đủ';
          } else if (isNaN(this.hardware.price)) {
            this.errors.price = 'Số tiền không hợp lệ';
          } else if (Number(this.hardware.price) <= 0) {
            this.errors.price = 'Số tiền phải lớn hơn 0';
          } 
          
          if (!this.hardware.type) {
            this.errors.type = "Loại linh kiện không được trống";
          }

          return Object.keys(this.errors).length === 0;
      },

      getCategoryName(categoryId) {
          return this.hardwareCategory?.find(category => category.id == categoryId)?.name || 'Không xác định';
      },

      getUserName(userId) {
          return this.userList?.find(user => user.id === userId)?.name || '';
      },

      closeModal() {
          this.isShowModal = false;
      },

      async submitAddHardware() {
          if (this.validateForm()) {
              this.isSubmitting = true

              this.createHardware(this.hardware).then(() => {
                this.isShowModal = false
                this.isShowAlert = true

                // Ẩn alert sau 2 giây
                setTimeout(() => {
                  this.isShowAlert = false;
                }, 2000);

                // Đặt lại giá trị default cho product
                this.hardware = {
                  name: '',
                  serial_number: '',
                  price: '',
                  type: '',
                  note: '',
                  status: 0,
                  image: null
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
          this.hardware.image = e.target.result;  // Lưu base64 vào imageBase64
        };
        reader.readAsDataURL(file);  // Đọc file dưới dạng Data URL (base64)
      }
  },
  created() {
      this.getHardwareList(); //Get product API
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
