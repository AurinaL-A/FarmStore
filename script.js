!function (e) { "function" != typeof e.matches && (e.matches = e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || function (e) { for (var t = this, o = (t.document || t.ownerDocument).querySelectorAll(e), n = 0; o[n] && o[n] !== t;)++n; return Boolean(o[n]) }), "function" != typeof e.closest && (e.closest = function (e) { for (var t = this; t && 1 === t.nodeType;) { if (t.matches(e)) return t; t = t.parentNode } return null }) }(window.Element.prototype);


document.addEventListener('DOMContentLoaded', function () {

   /* Записываем в переменные массив элементов-кнопок и подложку.
      Подложке зададим id, чтобы не влиять на другие элементы с классом overlay*/
   var modalButtons = document.querySelectorAll('.js-open-modal'),
       overlay = document.querySelector('.js-overlay-modal'),
       closeButtons = document.querySelectorAll('.js-modal-close');


   /* Перебираем массив кнопок */
   modalButtons.forEach(function (item) {

      /* Назначаем каждой кнопке обработчик клика */
      item.addEventListener('click', function (e) {

            /* Предотвращаем стандартное действие элемента. Так как кнопку разные
                        люди могут сделать по-разному. Кто-то сделает ссылку, кто-то кнопку.
                        Нужно подстраховаться. */
            e.preventDefault();

            /* При каждом клике на кнопку мы будем забирать содержимое атрибута data-modal
               и будем искать модальное окно с таким же атрибутом. */
            var modalId = this.getAttribute('data-modal'),
               modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

            /* После того как нашли нужное модальное окно, добавим классы
               подложке и окну чтобы показать их. */
            modalElem.classList.add('active');
            overlay.classList.add('active');


      }); // end click

   }); // end foreach

   closeButtons.forEach(function (item) {

      item.addEventListener('click', function (e) {
         var parentModal = this.closest('.modal');

         parentModal.classList.remove('active');
         overlay.classList.remove('active');
      });

   }); // end foreach

   document.body.addEventListener('keyup', function (e) {
      var key = e.keyCode;

      if (key == 27) {

         document.querySelector('.modal.active').classList.remove('active');
         document.querySelector('.overlay').classList.remove('active');
      };
   }, false);

   overlay.addEventListener('click', function () {
      document.querySelector('.modal.active').classList.remove('active');
      this.classList.remove('active');
   });

}); ////////////////////// Модальное окно








HTMLElement.prototype.getNodesByText = function (text) {
  const expr = `.//*[text()[contains(
    translate(.,
      'ABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ',
      'abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщъыьэюя'
    ),
    '${text.toLowerCase()}'
  )]]`;    /**/
  const nodeSet = document.evaluate(expr, this, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null);
  return Array.from({ length: nodeSet.snapshotLength },
    (v, i) => nodeSet.snapshotItem(i)
  );
};

// код решения начинается здесь
const allCards  = document.querySelectorAll('.card'),
      container = document.querySelector('.cards');
document.getElementById('search').addEventListener('input', evt => {
  allCards.forEach(card => card.classList.remove('search-result'));      // убираем класс, добавленный при предыдущем поиске
  const searchStr = container.dataset.search = evt.target.value.trim();  // заносим поисковую строку в data-атрибут, чтобы магия скрытия карточек в CSS работала
  if (!searchStr.length) return;
  for (const el of container.getNodesByText(searchStr)) {  // в цикле по найденным элементам...
    const card = el.closest('.card');                      // ...находим родительскую карточку элемента...
    if (card) card.classList.add('search-result');         // ...и добавляем ей класс со стилем "видимости"
  }
});

/*swiper*/
const slider = document.querySelector('.gallery');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', e => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', _ => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', _ => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const SCROLL_SPEED = 3;
  const walk = (x - startX) * SCROLL_SPEED;
  slider.scrollLeft = scrollLeft - walk;
});


