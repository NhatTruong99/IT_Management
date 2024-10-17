const getters = {
    productList : state => state.products.products,
    productDetail : state => state.products.product,
    productCategory: state => state.productCategory.category,
    hardwareList : state => state.hardwares.hardwares,
    hardwareDetail : state => state.hardwares.hardware,
    hardwareCategory : state => state.hardwareCategory.category,
    userList: state => state.users.users
}

export default getters