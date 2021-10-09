const productsBtn = document.querySelectorAll('.btn_order');
const cartProductsList = document.querySelector('.cart-content__list');
const cart = document.querySelector('.cart');
const cartQuantity = document.querySelector('.btn__sum');
const fullPrice = document.querySelector('.fullprice');
let price = 0;

const randomId = () => {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const priceWithoutSpaces = (str) => {
	return str.replace(/\s/g, '');
};

const normalPrice = (str) => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const plusFullPrice = (currentPrice) => {
	return price += currentPrice;
};

const minusFullPrice = (currentPrice) => {
	return price -= currentPrice;
};

const printQuantity = () => {
	let productsListLength = cartProductsList.children.length;
	cartQuantity.textContent = productsListLength;
	productsListLength > 0 ? cart.classList.add('active') : cart.classList.remove('active');
};

const printFullPrice = () => {
	fullPrice.textContent = `${normalPrice(price)} грн`;
};

const generateCartProduct = (title, weight, price, id) => {
	return `
        <div class="cart-content__item">
            <div class="cart-product__text">
                <h3 class="cart-product__title">${title}</h3>
                <div class="cart-product__weight">, ${weight}</div>   
            </div>
            
            <div class="cart__product-priceblock">
                <span class="cart-product__price">${normalPrice(price)}</span>
                <span class="price_fw16">грн</span>
            </div>  
        </div>
	`;
};

const deleteProducts = (productParent) => {
	let id = productParent.querySelector('.cart-product').dataset.id;
	document.querySelector(`.product__block[data-id="${id}"]`).querySelector('.product__btn').disabled = false;
	
	let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.cart-product__price').textContent));
	minusFullPrice(currentPrice);
	printFullPrice();
	productParent.remove();

	printQuantity();
};

productsBtn.forEach(el => {
	el.closest('.product__block').setAttribute('data-id', randomId());

	el.addEventListener('click', (e) => {
		let self = e.currentTarget;
		let parent = self.closest('.product__block');
		let id = parent.dataset.id;
		let img = parent.querySelector('.product__card').getAttribute('src');
		let title = parent.querySelector('.product__name').textContent;
		let weight = parent.querySelector('.product__weight').textContent;
		let priceString = priceWithoutSpaces(parent.querySelector('.product__price').textContent);
		let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.product__price').textContent));

		plusFullPrice(priceNumber);

		printFullPrice();

		cartProductsList.insertAdjacentHTML('afterbegin', generateCartProduct(title, weight, priceString, id));
		printQuantity();

		
		self.disabled = true;
	});
});

cartProductsList.addEventListener('click', (e) => {
	if (e.target.classList.contains('cart-product__delete')) {
		deleteProducts(e.target.closest('.cart-content__item'));
	}
});