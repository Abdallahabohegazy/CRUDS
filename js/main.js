
var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDesc = document.getElementById('productDesc');
var productContainer = [];
var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');


// localstorage لما اعمل ريفريش للصفحة ارجع الداتا المتخزنة ومتنساش عند الحذف بعيد علي ال 
if(localStorage.getItem('products') != null){
    productContainer = JSON.parse(localStorage.getItem('products'));
    displayProdects(productContainer);
}


function addProduct() {
if(validateProductName() == true){
    var product = {
        pName :productName.value ,
        price :productPrice.value,
        category : productCategory.value,
        desc : productDesc.value
    }
    productContainer.push(product);
    localStorage.setItem('products' , JSON.stringify(productContainer)); //بخزن الداتا 
    displayProdects(productContainer);
    clearForm();
}
else{
    alert('productName invalid');
}
}


function updateProduct(){
    if(validateProductName() == true){
        var product = {
            pName :productName.value ,
            price :productPrice.value,
            category : productCategory.value,
            desc : productDesc.value
        }
        productContainer[currentIndex] = product;
        localStorage.setItem('products' , JSON.stringify(productContainer)); //بخزن الداتا 
        displayProdects(productContainer);
        clearForm();
        updateBtn.classList.replace('d-block' , 'd-none');
        addBtn.classList.replace( 'd-none' , 'd-block');
    }
    else{
        alert('productName invalid');
    }

}


//بتعرض المنتجات في الجدول
//arr => productContainer
function displayProdects(arr) {
    var prodectsTable = ``;
    for(var i = 0 ; i <arr.length ; i++) {
        prodectsTable += `<tr>
                        <td>${arr[i].pName}</td>
                        <td>${arr[i].price}</td>
                        <td>${arr[i].category}</td>
                        <td>${arr[i].desc}</td>
                        <td><button onclick="setFromForUpdate(${i})" class="btn btn-warning btn-sm">update</button></td>
                        <td><button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">delete</button></td>
                    </tr>` ;
    }   
    document.getElementById('tableBody').innerHTML = prodectsTable ;
}


// بتمسح المنتج الاخير بعد كتابته في الفورم فورا مش بتمسحه من الجدول
function clearForm(){
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDesc.value = "";
}


// للعرض من تاني  display ومتنساش بعدها تعمل ال  deleteبتمسح اللي في الجدول بعدالضغط علي زرار ال 
function deleteProduct(productIndex){
    productContainer.splice(productIndex,1);
    localStorage.setItem('products' , JSON.stringify(productContainer));
    displayProdects(productContainer);
}




//باينه من اسمها 
function searchProducts(term) {
    var matchProducts = [];
    for( var i = 0 ; i < productContainer.length ; i++){
        if(productContainer[i].pName.toLowerCase().includes(term.toLowerCase()) === true){
            matchProducts.push(productContainer[i]);
        }
    }
    displayProdects(matchProducts);
}

var currentIndex = 0 ;//المتغير اللي هحط فيه رقم المنتج اللي هامعمله update
function setFromForUpdate(index){
    addBtn.classList.replace('d-block' , 'd-none');
    updateBtn.classList.replace( 'd-none' , 'd-block');
    productName.value = productContainer[index].pName;
    productPrice.value = productContainer[index].price;
    productCategory.value = productContainer[index].category;
    productDesc.value = productContainer[index].desc; 
    currentIndex = index;// علشان ارجعه مكانه updateProduct() في  update علشان هحتاج رقم المنتج  اللي هاعمله  
}




function validateProductName(){

    var regex = /^[A-Z][a-z]{3,8}$/;
    

    return regex.test(productName.value) ; //اللي تحت if  بتساوي حالة 
    // if(regex.test(productName.value) === true){
    //     return true;
    // }
    // else{
    //     return false;
    // }
}

























