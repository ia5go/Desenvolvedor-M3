import { Product } from "./Product";

const filtersColor : NodeListOf<Element> = document.querySelectorAll('.filter__color');
const filtersSize : NodeListOf<Element> = document.querySelectorAll('.filter__list--row');
const mainProducts : Element = document.querySelector('.main__products');
const loadItemsBtn : Element = document.querySelector('.main__load-products');
const orderBy : HTMLSelectElement = document.querySelector('.order-by');
const orderByMobileBtns : NodeListOf<Element> = document.querySelectorAll('.mobile-sidebar__item');
const bagCounter : HTMLElement = document.querySelector('.bag__counter');
const btnLoadMore : HTMLElement = document.querySelector('.main__load-products');

const serverUrl = "http://localhost:5000/products";

/* filter targets/controlers */
let filtered : boolean = false;
let colorFilterTarget : string | null = null;
let sizeFilterTarget : string | null = null;
let priceFilterTarget : number | null = null;

/* load patern and control */
const DEFAUL_ITEMS_TOTAL : number = 6;
const STEP : number = 2;
let nProdsNow : number = DEFAUL_ITEMS_TOTAL;
let currentProductsList : Product[] = [];

/* filter price eventListners */
document.querySelectorAll('.filter .filter__price input').forEach(el =>{
  el.addEventListener('click', ev =>{
    if((ev.target as HTMLInputElement).value){
      priceFilterTarget = Number((ev.target as HTMLInputElement).value);
      filterHandler();
    }
  });
});

document.querySelectorAll('.mobile-sidebar__filter .filter__price input').forEach(el =>{
  el.addEventListener('click', ev =>{
    if((ev.target as HTMLInputElement).value){
      priceFilterTarget = Number((ev.target as HTMLInputElement).value);
    }
  });
});
/* filter price eventListners */

/* mobile filter actions */
document.querySelector(".mobile-sidebar__actions__item.applay").addEventListener('click', () =>{
  filterHandler();
  document.querySelector('.mobile-sidebar.open').classList.remove('open');
})

document.querySelector(".mobile-sidebar__actions__item.clear").addEventListener('click', () =>{
  colorFilterTarget = null;
  sizeFilterTarget = null;
  priceFilterTarget = null;

  document.querySelectorAll("input[type='radio']:checked").forEach(el => {
    (el as HTMLInputElement).checked = false;
  });

  document.querySelectorAll('.filter__size button.active').forEach(el =>{
    el.classList.remove('active')
  })

  filterHandler();
  document.querySelector('.mobile-sidebar.open').classList.remove('open');
})
/* mobile filter actions */

async function main() {
  /* fetch items */
  const prodColeciton = await getData(serverUrl);
  /* build page */
  SidebarsConfig();
  currentProductsList = prodColeciton;
  renderColorList(currentProductsList);
  renderSizesList(currentProductsList);
  renderProductList(currentProductsList);
}

document.addEventListener("DOMContentLoaded", main);

/* config the .mobile-sidebar and .mobile-triggers items */
const SidebarsConfig = () => {
  const mobileTriggers : NodeListOf<Element> = document.querySelectorAll('.mobile-triggers__item');

  mobileTriggers.forEach((el : HTMLElement) =>{
    const sidebar = document.getElementById(`${el.dataset.target}`); 
    if(sidebar){
      //block for building the close button
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
async function getData (url:string):Promise<Product[]> {
  const response = await fetch(url);
  if(response.ok){
    const data = await response.json() as Product[];
    return data.map((product: any) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      parcelamento: product.parcelamento,
      color: product.color,
      image: product.image,
      size: product.size,
      date: product.date
    }));
  }else{
    console.error('Erro ao tentar carregar os produtos...');
  }
}
/* fetching products */

/* render product */
const renderProduct = (item: Product) => {
  return `
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
  let productList : string = '';
  if(nProdsNow > items.length){
    btnLoadMore.style['display'] = 'none';
  }else{
    btnLoadMore.style['display'] = 'inline-block';
  }

  const renderLimit = nProdsNow < items.length ? nProdsNow : items.length;
  
  for(let i = 0; i < renderLimit; i++){
    productList += renderProduct(items[i]);
  }
  mainProducts.innerHTML = productList;

  document.querySelectorAll('.product__action').forEach(el => { 
    el.addEventListener('click',addItemToBagHandler);
  });
}
/* call render product for each product */

const addItemToBagHandler = () => {
  if(bagCounter.classList.contains('hidden')){
    bagCounter.classList.remove('hidden');
  }

  const currentValue = bagCounter.dataset.counter;
  bagCounter.dataset.counter = (Number(currentValue) + 1).toString();
  bagCounter.innerHTML = bagCounter.dataset.counter;
}

/* renderColors */
const renderColor = (color: string) =>{
  return `
  <li class="filter__list__item">
    <label class="filter__label">
      <input type="radio" name="filterColor" value="${color}" />
      ${color}
    </label>
  </li>
  `;
}
/* renderColors */

/* call render color */
const renderColorList = (items: Product[]) =>{
  let colorArray : string[] = [];
  let colorList : string = '';
  items.forEach(el => {
    if(!colorArray.includes(el.color)){
      colorArray.push(el.color);
    }
  })

  colorArray.forEach(color=>{
    colorList += renderColor(color);
  })

  filtersColor.forEach(el =>{
    el.innerHTML = colorList;
  })

  document.querySelectorAll('.filter .filter__color input').forEach(el =>{
    el.addEventListener('click', ev =>{
      if((ev.target as HTMLInputElement).value){
        colorFilterTarget = (ev.target as HTMLInputElement).value;
        filterHandler();
      }
    });
  });
  
  document.querySelectorAll('.mobile-sidebar__filter .filter__color input').forEach(el =>{
    el.addEventListener('click', ev =>{
      if((ev.target as HTMLInputElement).value){
        colorFilterTarget = (ev.target as HTMLInputElement).value;
      }
    });
  });
}
/* call render color */

/* renderSize */
const renderSize = (size: string) => {
  return `
  <li class="filter__list--row__item">
    <button type="button" data-size="${size}">${size}</button>
  </li>
  `;
}
/* renderSizes */

/* call render size */
async function renderSizesList (items: Product[]) {
  let sizesArray : string[] = [];
  let sizesList : string = '';

  items.forEach(item =>{
    item.size.forEach(iSize =>{
      if(!sizesArray.includes(iSize)){
        sizesArray.push(iSize);
      }
    })
  })
  
  sizesArray.forEach(size => {
    sizesList += renderSize(size);
  });

  filtersSize.forEach(el =>{
    el.innerHTML = sizesList;
  })

  document.querySelectorAll('.filter .filter__size button').forEach(el =>{
    el.addEventListener('click', ev =>{
      if((ev.target as HTMLButtonElement).dataset.size){
        /* remove the .active from other buttons */
        if(document.querySelector('.filter__size button.active')){
          document.querySelector('.filter__size button.active').classList.remove('active');
        }

        el.classList.add('active');
        sizeFilterTarget = (ev.target as HTMLButtonElement).dataset.size;

        filterHandler();
      }
    })
  })

  document.querySelectorAll('.mobile-sidebar__filter .filter__size button').forEach(el =>{
    el.addEventListener('click', ev =>{
      if((ev.target as HTMLButtonElement).dataset.size){
        /* remove the .active from other buttons */
        if(document.querySelector('.filter__size button.active')){
          document.querySelector('.filter__size button.active').classList.remove('active');
        }

        el.classList.add('active');
        sizeFilterTarget = (ev.target as HTMLButtonElement).dataset.size;
      }
    })
  })
}
/* call render size */

/* Load more itens */
loadItemsBtn.addEventListener('click', () =>{
  nProdsNow += STEP;
  renderProductList(currentProductsList);
});
/* Load more itens */

/* function to sort products by price */
const sortByPrice = (items: Product[], asc = true): Product[] => {
  return items.sort((a, b) => {
    if (asc) {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });
}
/* function to sort products by price */

/* function to sort products by date */
const sortByDate = (items: Product[]): Product[] => {
  return items.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (dateA < dateB) return 1;
    if (dateA > dateB) return -1;
    return 0;
  });
};
/* function to sort products by date */

/* order by params */
const orderByHandler = (param: string)=>{
  nProdsNow = DEFAUL_ITEMS_TOTAL;

  if(param === 'S_PRICE'){
    currentProductsList = sortByPrice(currentProductsList);
  } if (param === 'B_PRICE') {
    currentProductsList = sortByPrice(currentProductsList, false);
  } else {
    currentProductsList = sortByDate(currentProductsList);
  }
  renderProductList(currentProductsList);
}
/* order by params */

/* run orderby with the select */
orderBy.addEventListener('change', ev =>{
  orderByHandler((ev.target as HTMLSelectElement).value)
});
/* run orderby with the select */

/* run orderBy mobile btns */
orderByMobileBtns.forEach(btn => {
  btn.addEventListener('click', ev =>{
    orderByHandler((ev.target as HTMLButtonElement).dataset.sortby);
    document.querySelector('.mobile-sidebar.open').classList.remove('open');
  });
});
/* run orderBy mobile btns */

/* filter handler */
async function filterHandler() {
  /* get full colection if we are changing hte filter*/
  if(filtered){
    currentProductsList = await getData(serverUrl);
    nProdsNow = DEFAUL_ITEMS_TOTAL;
  }

  /* filter color */
  if(colorFilterTarget){
    let auxList : Product[] = [];
    currentProductsList.forEach(el => {
      if(el.color.toLocaleLowerCase() === colorFilterTarget.toLocaleLowerCase()){
        auxList.push(el);
      }
    });
    currentProductsList = auxList;
  }
  
  /* filter size */
  if(sizeFilterTarget){
    let auxList : Product[] = [];
    currentProductsList.forEach(el => {
      if(el.size.includes(sizeFilterTarget)){
        auxList.push(el);
      }
    });
    currentProductsList = auxList;
  }

  /* filter price */
  if(priceFilterTarget !== null){
    let auxList : Product[] = [];
    currentProductsList.forEach(el =>{
      switch(priceFilterTarget){
        case 0:
          if(el.price > 0 && el.price < 51){
            auxList.push(el);
          }
          break;
        case 1:
          if(el.price > 50 && el.price < 151){
            auxList.push(el);
          }
          break;
        case 2:
          if(el.price > 150 && el.price < 301){
            auxList.push(el);
          }
          break;
        case 3:
          if(el.price > 300 && el.price < 501){
            auxList.push(el);
          }
          break;
        case 0:
          if(el.price > 500){
            auxList.push(el);
          }
          break;
      }
    });
    currentProductsList = auxList;
  }
  
  filtered = true;
  renderProductList(currentProductsList);
}
/* filter handler */