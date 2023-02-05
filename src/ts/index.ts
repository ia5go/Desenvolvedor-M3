import { Product } from "./Product";

const serverUrl = "http://localhost:5000";

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

function main() {
  console.log(serverUrl);
  SidebarsConfig();
}

document.addEventListener("DOMContentLoaded", main);
