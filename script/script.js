let rootElem = document.getElementById('root');
let content = document.querySelector('.content');

// НОЧНОЙ РЕЖИМ
(function (){
    let darkModeToggle = document.getElementById('darkModeToggle');
    if (!localStorage.getItem('darkMode')){
        localStorage.setItem('darkMode', 1);
    } else if (localStorage.getItem('darkMode') == 2){
        rootElem.classList.add('darkMode');
    }
    darkModeToggle.addEventListener('click', function () {
        let curMode = localStorage.getItem('darkMode');
        if (curMode == 1){
            rootElem.classList.add('darkMode');
            localStorage.setItem('darkMode',2);
        }else{
            rootElem.classList.remove('darkMode');
            localStorage.setItem('darkMode',1);
        }
    })
})();


// goods
rootElem.querySelector('.basket .count').innerText =localStorage.getItem('goodCount');
rootElem.querySelector('.basket .sum').innerText =localStorage.getItem('goodSum');

function createGood(good) {
    let divContainer = document.createElement('div');
    let divElem = document.createElement('div');
    let divElemImg = document.createElement('div');
    let titleElem = document.createElement('h3');
    let priceElem = document.createElement('p');
    let imgElem = document.createElement('img');
    let close = document.querySelector('.close')

    divContainer.classList.add('good');
    titleElem.innerText = good.title;
    priceElem.innerText = good.price;
    imgElem.src = good.src;
    imgElem.style.width = '100px';
    imgElem.style.maxHeight = '100px';

    divElem.appendChild(titleElem)
    divElem.appendChild(priceElem)
    divElemImg.appendChild(imgElem);
    divContainer.appendChild(divElem);
    divContainer.appendChild(divElemImg);

    if (!localStorage.getItem('goodSum')){
        rootElem.querySelector('.basket .count').innerText = 0;
        rootElem.querySelector('.basket .sum').innerText = 0;
    }
    if (localStorage.getItem('goodSum')){
        close.style.display = 'inline-flex';
    }

    divContainer.addEventListener('click', function () {
        close.style.display = 'inline-flex';

        if (!localStorage.getItem('goodSum')){
            localStorage.setItem('goodSum', 0);
            localStorage.setItem('goodCount', 0);
        }
        if (!localStorage.getItem(`${titleElem.innerText}`)){
            localStorage.setItem(`${titleElem.innerText}`, 0);
        }
        let goodCount = +localStorage.getItem('goodCount')+1;
        localStorage.setItem('goodCount', goodCount);

        let goodSum = +localStorage.getItem('goodSum')+good.price;
        localStorage.setItem('goodSum', goodSum);

        let title = +localStorage.getItem(`${titleElem.innerText}`)+1;
        localStorage.setItem(`${titleElem.innerText}`, title);

        rootElem.querySelector('.basket .count').innerText = goodCount;
        rootElem.querySelector('.basket .sum').innerText = goodSum;

    })
    // КОРЗИНА
    let basket = document.querySelector('.basket');
    basket.addEventListener('click', function () {
        if (document.querySelector('.modal-container')){return}else {
            // ОТРИСОВКА ЗАГОЛОВКА КОРЗИНЫ
            let modalContainer = document.createElement('div');
            modalContainer.classList.add('modal-container');
            let headerContainer = document.createElement('div');
            let headerTitle = document.createElement('div');
            let headerQuantity = document.createElement('div');
            let headerSum = document.createElement('div');
            headerContainer.classList.add('modalHeaderContainer')
            headerTitle.innerText = 'Наименование';
            headerQuantity.innerText = 'Кол-во';
            headerSum.innerText = 'Сумма';
            headerContainer.style.fontWeight = 'bold';
            headerTitle.style.width = '150px';
            headerQuantity.style.width = '60px';
            headerSum.style.width = '60px';
            headerContainer.appendChild(headerTitle);
            headerContainer.appendChild(headerQuantity);
            headerContainer.appendChild(headerSum);
            modalContainer.appendChild(headerContainer);

            // ОТРИСОВКА СПИСКА ТОВАРОВ
            for (let elem of JSONdata.data) {
                let elemContainer = document.createElement('div');
                let elemTitle = document.createElement('div');
                let elemQuantity = document.createElement('div');
                let elemSum = document.createElement('div');
                elemContainer.classList.add('modalElemContainer')
                elemTitle.innerText = elem.title;
                elemQuantity.innerText = localStorage.getItem(`${elemTitle.innerText}`);
                elemSum.innerText = localStorage.getItem(`${elemTitle.innerText}`) * elem.price;
                elemTitle.style.width = '150px';
                elemQuantity.style.width = '60px';
                elemSum.style.width = '60px';
                elemContainer.appendChild(elemTitle);
                elemContainer.appendChild(elemQuantity);
                elemContainer.appendChild(elemSum);
                modalContainer.appendChild(elemContainer);
                if (localStorage.getItem(`${elemTitle.innerText}`) === null) {
                    elemContainer.remove()
                }
            }

            // ОТРИСОВКА "ИТОГО"
            let totalContainer = document.createElement('div');
            let totalTitle = document.createElement('div');
            let totalSum = document.createElement('div');
            totalContainer.classList.add('modalTotalContainer')
            totalTitle.innerText = 'Итого:';
            totalSum.innerText = localStorage.getItem('goodSum');
            totalContainer.style.fontWeight = 'bold';
            totalTitle.style.width = '50px';
            totalSum.style.width = '60px';
            totalContainer.appendChild(totalTitle);
            totalContainer.appendChild(totalSum);
            modalContainer.appendChild(totalContainer);

            // КНОПКА ОЧИСТКИ В МОДАЛЬНОМ ОКНЕ
            let btnClose = document.createElement('button');
            btnClose.classList.add('btnClose')
            btnClose.innerText = 'Очистить корзину';
            modalContainer.appendChild(btnClose);
            btnClose.addEventListener('click', function () {
                localStorage.clear();
                rootElem.querySelector('.basket .count').innerText = 0;
                rootElem.querySelector('.basket .sum').innerText = 0;
                close.style.display = 'none';
                modalContainer.remove();
            })
            rootElem.appendChild(modalContainer);

            content.addEventListener('click', function () {
                modalContainer.remove();
            });
            modalContainer.addEventListener('click', function (event) {
                event.stopPropagation();
            });
            // КНОПКА ОЧИСТКИ В НАВИГАЦИИ В КОРЗИНЕ
            close.addEventListener('click', function () {
                localStorage.clear();
                rootElem.querySelector('.basket .count').innerText = 0;
                rootElem.querySelector('.basket .sum').innerText = 0;
                modalContainer.remove();
                close.style.display = 'none';
            })
        }
    })

    return divContainer
}

let goodContainerElem = rootElem.querySelector('.goods');
for (let elem of JSONdata.data){
    goodContainerElem.appendChild(createGood(elem))
}

