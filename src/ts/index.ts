import { Product } from "./Product";
const mainProducts : Element = document.querySelector('.main__products');
const nProductsDisplay : Number = 9;

const serverUrl = "http://localhost:5000/products";

/* config the .mobile-sidebar and .mobile-triggers items */
const SidebarsConfig = () => {
  const mobileTriggers : NodeListOf<Element> = document.querySelectorAll('.mobile-triggers__item');

  mobileTriggers.forEach((el : HTMLElement) =>{
    const sidebar = document.getElementById(`${el.dataset.target}`); 
    if(sidebar){
      //block for building the  
      const closeBtn = document.createElement('button');
      closeBtn.classList.add('mobile-sidebar__close-btn');
      closeBtn.innerHTML = "X";
      sidebar.appendChild(closeBtn);
  
      el.addEventListener('click', () => {
        sidebar.classList.add('open');
      });
      
      closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('open');
      });
    }
  });
}
/* config the .mobile-sidebar and .mobile-triggers items */

/* fetching products */
async function getData (url:string) {
  let data: JSON;
  const response = await fetch(url);
  if(response.ok){
    data = await response.json();
    return data;
  }else{
    console.error('Erro ao tentar carregar os produtos...');
  }
}
/* fetching products */

/* render product */
const renderProduct = (item: Product) => {
  mainProducts.innerHTML += `
  <div class="product">
  <img
        src="${item.image}"
        alt="${item.name}"
        class="product__image"
        />
        
        <p class="product__name">${item.name}</p>
      <p class="product__price">R$ ${item.price.toFixed(2)}</p>
      <p class="product__price--divided">até ${item.parcelamento[0]}x de R$${item.parcelamento[0].toFixed(2)}</p>
      <button class="product__action btn--black">COMPRAR</button>
      </div>
  `;
} 
/* render product */

/* call render product for each product */
const renderProductList = (items: Product[]) =>{
  items.forEach(el =>{
    renderProduct(el);
  })
}
/* call render product for each product */




async function main() {
  const prodJson = await getData(serverUrl);
  renderProductList(prodJson);
  SidebarsConfig();
}

document.addEventListener("DOMContentLoaded", main);
