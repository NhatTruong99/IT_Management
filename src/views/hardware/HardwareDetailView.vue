<template>
    <div class="home mt-5">
        <h3>{{ hardwareName }}</h3>

        <div class="row">
            <div class="col-md-3 d-flex flex-column">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <h5 class="card-title">TÌNH TRẠNG</h5>
                            <i @click="isShowModalStatus = true" class="fas fa-edit"></i>
                        </div>
                        
                        <div class="product-status mb-1">
                            <p>Trạng thái</p>
                            <p>{{ hardwareDetail.status == 1 ? 'Đang sử dụng' : 'Trong kho'}}</p>
                        </div>

                        <div class="product-status">
                            <p>Cập nhật</p>
                            <p>{{ formatDateString(hardwareDetail.updated_at) }}</p>
                        </div>
                    </div>
                </div>

                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <h5 class="card-title">NGƯỜI SỬ DỤNG</h5>
                            <i @click="isShowModalUser = true" class="fas fa-edit"></i>
                        </div>

                        <p>{{ getUserName(hardwareDetail.user_id) }}</p>
                    </div>
                </div>
            </div>

            <div class="col-md-9">
                <div class="card card-product-detail">
                    <div class="card-body">
                        <h5 class="card-title">THÔNG TIN CƠ BẢN</h5>
                        
                        <div class="row">
                            <div class="col-9">                        
                                <form @submit.prevent="submitUpdateHardware($event, 'hardwareAll')">
                                    <div class="form-group row align-items-center">
                                        <label for="product_name" class="col-md-3 text-end ">Tên thiết bị <span class="text-danger">*</span></label>
                                        <div class="col-md-9 d-flex flex-column">
                                            <input type="text" class="form-control col-md-5" :class="errors.name ? 'is-invalid' : ''" id="product_name" v-model="hardwareDetail.name">
                                            <span v-if="errors.name" class="invalid-feedback">{{ errors.name }}</span>
                                        </div>
                                    </div>

                                    <div class="form-group row align-items-center">
                                        <label for="product_serial_number" class="col-md-3">Số serial <span class="text-danger">*</span></label>
                                        <div class="col-md-9 d-flex flex-column">
                                            <input type="text" class="form-control col-md-5" :class="errors.serial_number ? 'is-invalid' : ''" id="product_serial_number" v-model="hardwareDetail.serial_number">
                                            <span v-if="errors.serial_number" class="invalid-feedback">{{ errors.serial_number }}</span>
                                        </div>
                                    </div>

                                    <div class="form-group row align-items-center">
                                        <label for="product_price" class="col-md-3">Chi phí <span class="text-danger">*</span></label>
                                        <div class="col-md-9 d-flex flex-column">
                                            <input type="number" class="form-control col-md-5" :class="errors.price ? 'is-invalid' : ''" id="product_price" v-model="hardwareDetail.price">
                                            <span v-if="errors.price" class="invalid-feedback">{{ errors.price }}</span>
                                        </div>
                                    </div>

                                    <div class="form-group row align-items-center">
                                        <label for="product_category_id" class="col-md-3">Loại linh kiện <span class="text-danger">*</span></label>
                                        <div class="col-md-9 d-flex flex-column">
                                            <select class="form-control" :class="errors.category_id ? 'is-invalid' : ''" id="product_category_id" v-model="hardwareDetail.type">
                                                <option value="" disabled selected>Chọn loại thiết bị</option>
                                                <option v-for="category in hardwareCategory" :key="category.id" :value="category.id">{{ category.name }}</option>
                                            </select>
                                            <span v-if="errors.category_id" class="invalid-feedback">{{ errors.category_id }}</span>
                                        </div>
                                    </div>

                                    <div class="form-group row align-items-center">
                                        <label for="product_category_id" class="col-md-3">Thiết bị sử dụng <span class="text-danger">*</span></label>
                                        <div class="col-md-9 d-flex flex-column">
                                            <select class="form-control" :class="errors.category_id ? 'is-invalid' : ''" id="product_category_id" v-model="hardwareDetail.product_id">
                                                <option value="" disabled selected>Chọn loại thiết bị</option>
                                                <option v-for="product in productList" :key="product.id" :value="product.id">{{ product.name }}</option>
                                            </select>
                                            <span v-if="errors.category_id" class="invalid-feedback">{{ errors.category_id }}</span>
                                        </div>
                                    </div>

                                    <div class="form-group row align-items-center">
                                        <label for="product_note" class="col-md-3">Mô tả</label>
                                        <div class="col-md-9">
                                        <textarea type="text" class="form-control col-md-5" id="product_note" rows="5" v-model="hardwareDetail.note"></textarea>
                                        </div>
                                    </div>

                                    <button :disabled="isSubmittingAll" type="submit" class="btn btn-add-product">Lưu lại</button>
                                </form>
                            </div>

                            <div class="col-3 d-flex flex-column align-items-center">
                                <img :src="hardwareDetail.image" alt="Selected Image" style="max-width: 200px;">
                                <button class="btn btn-outline-dark mt-3" @click="triggerFileInput">Thay đổi ảnh</button>

                                <input ref="fileInput" class="form-control" type="file" @change="onFileChange" accept="image/*" style="display: none;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="d-flex justify-content-center alert-inform" v-if="isShowAlert">
            <div class="alert alert-success w-50" role="alert">
                Cập nhật thành công
            </div>
        </div>

        <div v-if="isShowModalStatus" class="modal" @click.self="closeModalStatus">
            <div class="modal-content">
                <p class="modal-title">Thay đổi trạng thái</p>
                <span class="close" @click="closeModalStatus"><i class="fas fa-times"></i></span>

                <form @submit.prevent="submitUpdateHardware(event, 'hardwareStatus')">
                    <div class="form-group row align-items-center">
                        <label for="product_category_id" class="col-md-3">Trạng thái <span class="text-danger">*</span></label>
                        <div class="col-md-9 d-flex flex-column">
                            <select class="form-control" :class="errors.category_id ? 'is-invalid' : ''" id="product_category_id" v-model="hardwareDetail.status">
                                <option v-for="status in statusList" :key="status.id" :value="status.id">{{ status.name }}</option>
                            </select>
                            <span v-if="errors.category_id" class="invalid-feedback">{{ errors.category_id }}</span>
                        </div>
                    </div>

                    <button :disabled="isSubmittingStatus" type="submit" class="btn btn-add-product">Lưu lại</button>
                </form>
            </div>
        </div>

        <div v-if="isShowModalUser" class="modal" @click.self="closeModalUser">
            <div class="modal-content">
                <p class="modal-title">Người sử dụng</p>
                <span class="close" @click="closeModalUser"><i class="fas fa-times"></i></span>

                <form @submit.prevent="submitUpdateHardware(event, 'hardwareStatus')">
                    <div class="form-group row align-items-center">
                        <label for="product_category_id" class="col-md-3">Người sử dụng <span class="text-danger">*</span></label>
                        <div class="col-md-9 d-flex flex-column">
                            <select class="form-control" :class="errors.category_id ? 'is-invalid' : ''" id="product_category_id" v-model="hardwareDetail.user_id">
                                <option v-for="user in userList" :key="user.id" :value="user.id">{{ user.name }}</option>
                            </select>
                        </div>
                    </div>

                    <button :disabled="isSubmittingStatus" type="submit" class="btn btn-add-product">Lưu lại</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { myMixin } from '@/mixin';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: "hardwareDetailView",
    mixins: [myMixin],
    computed: {
        ...mapGetters(["hardwareDetail", "hardwareCategory", "userList", "productList"])
    },
    data() {
        return {
            errors: {},
            isSubmittingAll: false,
            isSubmittingStatus: false,
            isShowAlert: false,
            isShowModalStatus: false,
            isShowModalUser: false,
            hardwareName: '',
            selectedFile: null,
            isSetHardware: false,
            statusList: [
                {
                    id: 0,
                    name: 'Trong kho'
                },
                {
                    id: 1,
                    name: 'Đang sử dụng'
                }
            ]
        }   
    },
    methods: {
        ...mapActions({
            getHardware: "hardwares/getHardware",
            getProductList: "products/getProductList",
            updateHardware: "hardwares/updateHardware"
        }),
        validateForm() {
            this.errors = {};

            if (!this.hardwareDetail.name) {
                this.errors.name = "Tên linh kiện phải điền đầy đủ";
            }

            if (!this.hardwareDetail.serial_number) {
                this.errors.serial_number = "Số serial phải điền đầy đủ";
            }

            if (!this.hardwareDetail.price) {
                this.errors.price = 'Số tiền phải điền đầy đủ';
            } else if (isNaN(this.hardwareDetail.price)) {
                this.errors.price = 'Số tiền không hợp lệ';
            } else if (Number(this.hardwareDetail.price) <= 0) {
                this.errors.price = 'Số tiền phải lớn hơn 0';
            } 
            
            if (!this.hardwareDetail.type) {
                this.errors.type = "Loại linh kiện không được trống";
            }

            return Object.keys(this.errors).length === 0;
        },
        getCategoryName(categoryId) {
            return this.hardwareCategory?.find(category => category.id == categoryId)?.name || 'Không xác định';
        },
        getUserName(userId) {
            return this.userList?.find(user => user.id == userId)?.name || '';
        },
        async submitUpdateHardware(event, type) {
            if (this.validateForm()) {
                if (type == 'hardwareAll') {
                    this.isSubmittingAll = true
                } else {
                    this.isSubmittingStatus = true
                }

                this.hardwareDetail.updated_at = Math.floor(Date.now() / 1000);

                this.updateHardware({
                    params: {id: this.$route.params.id}, 
                    data: this.hardwareDetail
                }).then((value) => {
                    this.isShowAlert = true
                    this.isShowModalStatus = false
                    this.isShowModalUser = false

                    // Ẩn alert sau 2 giây
                    setTimeout(() => {
                        this.isShowAlert = false;
                    }, 2000);

                    // Đặt lại giá trị default cho product
                    this.hardwareName = value.name;
                    this.hardwareDetail = value;
                    if (type == 'hardwareAll') {
                        this.isSubmittingAll = false
                    } else {
                        this.isSubmittingStatus = false;
                    }
                });
            }
        },
        closeModalStatus() {
            this.isShowModalStatus = false;
        },
        closeModalUser() {
            this.isShowModalUser = false;
        },
        // Mở cửa sổ chọn file khi nhấn nút "Chọn ảnh"
        triggerFileInput() {
            this.$refs.fileInput.click();  // Kích hoạt input file ẩn
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
            this.hardwareDetail.image = e.target.result;  // Lưu base64 vào imageBase64
            };
            reader.readAsDataURL(file);  // Đọc file dưới dạng Data URL (base64)
        },
    },
    created() {
        this.getProductList();
        this.getHardware({id: this.$route.params.id}).then((value) => this.hardwareName = value.name); //Get product API
    }
};
</script>

<style scoped>
    .home {
        padding: 20px 30px;
    }

    .home h3 {
        margin-bottom: 40px;
    }

    .card {
        margin-bottom: 20px;
    }

    .card i {
        cursor: pointer;
    }

    .card .card-title {
        font-size: 18px;
        margin-bottom: 20px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      text-align: right;
    }

    .btn-add-product {
      color: #fff;
      background-color: #1D37B5;
      float: right;
    }

    .btn-add-product:hover {
      color: #fff;
      background-color: #1D37B5;
      filter: brightness(1.3);
    }

    .product-status{
        display: flex;
        justify-content: space-between;
    }

    .product-status p:nth-child(1) {
        color: gray;
    }

    .alert-inform {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .invalid-feedback {
      display: block;
      text-align: left;
    }
</style>