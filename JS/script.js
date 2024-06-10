const products = JSON.parse(localStorage.getItem('products')) || {};

document.getElementById('add-button').addEventListener('click', function (event) {
    const bloodType = document.getElementById('blood-type').value;
    const quantity = document.getElementById('quantity').value;

    if (bloodType && quantity) {
        addProduct(bloodType, quantity);
        alertProduct(bloodType); // Chama a função de alerta após adicionar
    }
});

document.getElementById('remove-button').addEventListener('click', function (event) {
    const bloodType = document.getElementById('blood-type').value;
    const quantity = document.getElementById('quantity').value;

    if (bloodType && quantity) {
        removeProduct(bloodType, quantity);
        alertProduct(bloodType); // Chama a função de alerta após remover
    }
});

function addProduct(bloodType, quantity) {
    if (!products[bloodType]) {
        products[bloodType] = 0;
    }
    products[bloodType] += parseInt(quantity);
    updateProductList();
    document.getElementById('blood-form').reset();
    saveProducts();
}

function removeProduct(bloodType, quantity) {
    if (products[bloodType]) {
        products[bloodType] -= parseInt(quantity);
        if (products[bloodType] <= 0) {
            products[bloodType] = 0; // Mantém o produto na lista com quantidade 0
        }
        updateProductList();
        document.getElementById('blood-form').reset();
        saveProducts();
    } else {
        alert('Nenhum produto encontrado para remover.');
    }
}

function updateProductList() {
    const productList = document.getElementById('products');
    productList.innerHTML = '';

    for (const [bloodType, quantity] of Object.entries(products)) {
        const productItem = document.createElement('li');
        productItem.className = 'product-item';
        productItem.innerText = `Tipo de Sangue: ${bloodType}, Quantidade: ${quantity} bolsas`;
        productList.appendChild(productItem);
    }
}

function alertProduct(bloodType) {
    const quantity = products[bloodType];
    if (quantity <= 5 && quantity > 0) {
        alert(`O produto ${bloodType} está acabando!`);
    } else if (quantity === 0) {
        alert(`O produto ${bloodType} ACABOU!`);
    }
}

function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

document.addEventListener('DOMContentLoaded', function () {
    updateProductList();
});
