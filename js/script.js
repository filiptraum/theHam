  document.addEventListener("DOMContentLoaded", () => {
    function gabmurgerFunc(gamburderSelector, navigationSelector, itemsSelector) {

      const gamburger = document.querySelector(gamburderSelector);
      const navigation = document.querySelector(navigationSelector);
      const items = document.querySelectorAll(itemsSelector);
      const body = document.querySelector('.body');

      items.forEach(item => {
        item.addEventListener('click', () => {
          gamburger.classList.remove('open');
          menuOpen = false;
          navigation.classList.remove('open');
          body.classList.remove('opened');
        });
      });

      window.addEventListener('click', (e) => {
        if (body.classList.contains('opened') && e.target.classList[0] !== navigation.classList[0] && e.target.classList[1] !== gamburger.classList[1] && e.target.classList[0] !== 'gamburger__item') {
          gamburger.classList.remove('open');
          menuOpen = false;
          navigation.classList.remove('open');
          body.classList.remove('opened');
          console.log(e.target);
        }
      });

      let menuOpen = false;
      gamburger.addEventListener('click', () => {
        if (!menuOpen) {
          gamburger.classList.add('open');
          menuOpen = true;
          navigation.classList.add('open');

          let wrapperWidth = document.querySelector('.wrapper').clientWidth;

          if (wrapperWidth <= 825) {
            body.classList.add('opened');
          } else {
            body.classList.remove('opened');
          }
        } else {
          gamburger.classList.remove('open');
          menuOpen = false;
          navigation.classList.remove('open');
          body.classList.remove('opened');
        }
      });
    }
    gabmurgerFunc(".gamburger", ".header-menu", ".header-menu__item");;

    // Check Page
    function checkPage() {
      const sections = document.querySelectorAll('section');
      const linkItems = document.querySelectorAll('.header-menu__item');

      function hideActive() {
        linkItems.forEach(item => {
          item.classList.remove('active');
        });

        if (window.scrollY == 0) {
          showActive(linkItems[0]);
        }
      }

      function showActive(item) {
        item.classList.add('active');
      }

      let numForThreshold;

      if (window.innerWidth >= 1050) {
        numForThreshold = 0.5;
      } else if (window.innerWidth < 1050 && window.innerWidth > 805) {
        numForThreshold = 0.4;
      } else if (window.innerWidth < 805 && window.innerWidth > 573) {
        numForThreshold = 0.3;
      } else if (window.innerWidth < 573 && window.innerWidth > 460) {
        numForThreshold = 0.2;
      } else {
        numForThreshold = 0.1;
      }

      const options = {
        threshold: numForThreshold
      };

      let observer = new IntersectionObserver(navCheck, options);

      function navCheck(entries) {
        entries.forEach(entry => {
          const className = entry.target.className;
          const activeAnchor = document.querySelector(`[data-page=${className.split(' ')[0]}]`);
          if (entry.isIntersecting) {
            if (activeAnchor == null) {
              hideActive();
            } else {
              hideActive();
              showActive(activeAnchor);
            }
          }
        });
      }

      sections.forEach(section => {
        observer.observe(section);
      });
    }

    checkPage();

    // changeImg
    const changeImg = (itemsSelector, btnSelector, contentSelector, classHidden, activeBtn) => {

      const itemsBlock = document.querySelector(itemsSelector);
      const btn = document.querySelectorAll(btnSelector);
      const content = document.querySelectorAll(contentSelector);

      function hideContent() {
        content.forEach(item => {
          item.classList.add(classHidden);
        });

        btn.forEach(item => {
          item.classList.remove(activeBtn);
        });
      }

      function showContent(i = 0) {
        btn[i].classList.add(activeBtn);
        let thisContent = document.querySelectorAll(btn[i].classList[0]);
        thisContent.forEach((item) => {
          item.classList.remove(classHidden);
        });
      }

      hideContent();
      showContent();

      itemsBlock.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains(btnSelector.replace(/\./, ""))) {
          btn.forEach((item, i) => {
            if (target == item) {
              hideContent();
              showContent(i);
            }
          });
        }
      });
    };

    changeImg(".works__list", ".works__btn", ".works__img", "hidden", "active");

    // changeImgFon
    function changeImgFon() {
      const section = document.querySelector('.about');
      const block = document.querySelector('.about__list');
      const btn = document.querySelectorAll('.about__item');

      const images = [
        'url(../img/About/fon1.jpg)',
        'url(../img/About/fon2.jpg)',
        'url(../img/About/fon3.jpg)'
      ];

      function setImgFon(i = 0) {
        section.style.backgroundImage = images[i];
      }

      block.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('.about__item'.replace(/\./, ""))) {
          btn.forEach((item, i) => {
            if (target == item) {
              setImgFon(i);
            }
          });
        }
      });
    }

    changeImgFon();

    if (window.innerWidth >= 740) {
      // smallSlider
      function smallSlider() {

        let position = 0;
        const itemsCount = 3;
        const btnPrev = document.querySelector('#image-slider__prev');
        const btnNext = document.querySelector('#image-slider__next');

        const section = document.querySelector('.home');
        const sliderBox = document.querySelector('.image-slider__image-box');

        const images = [
          'url(../img/Home/fon1.jpg)',
          'url(../img/Home/fon2.jpg)',
          'url(../img/Home/fon3.jpg)'
        ];

        const links = [
          'https://www.pexels.com/ru-ru/photo/1419923/',
          'https://www.pexels.com/ru-ru/photo/1419939/',
          'https://www.pexels.com/ru-ru/photo/414645/'
        ];

        btnNext.addEventListener('click', () => {
          if (position == itemsCount - 1) {
            position = itemsCount - 1;
          } else {
            position++;
          }

          setAttr();
          checkBtns();
        });

        btnPrev.addEventListener('click', () => {
          if (position == 0) {
            position = 0;
          } else {
            position--;
          }

          setAttr();
          checkBtns();
        });

        function setAttr() {
          section.style.backgroundImage = images[position];
          sliderBox.style.backgroundImage = images[position];
          sliderBox.setAttribute('href', links[position]);
        }

        function checkBtns() {
          if (position == 0) {
            btnPrev.classList.add('disabled');
          } else {
            btnPrev.classList.remove('disabled');
          }

          if (position == itemsCount - 1) {
            btnNext.classList.add('disabled');
          } else {
            btnNext.classList.remove('disabled');
          }
        }

        checkBtns();
      }

      smallSlider();
    }

    const changeTabs = (itemsSelector, btnSelector, contentSelector, hiddenContent, activeBtn) => {
      const itemsBlock = document.querySelector(itemsSelector);
      const btn = document.querySelectorAll(btnSelector);
      const content = document.querySelectorAll(contentSelector);

      function hideContent() {
        content.forEach(item => {
          item.classList.add(hiddenContent);
        });

        btn.forEach(item => {
          item.classList.remove(activeBtn);
        });
      }

      function showContent(i = 0) {
        content[i].classList.remove(hiddenContent);
        btn[i].classList.add(activeBtn);
      }

      hideContent();
      showContent();

      itemsBlock.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains(btnSelector.replace(/\./, ""))) {
          btn.forEach((item, i) => {
            if (target == item) {
              hideContent();
              showContent(i);
            }
          });
        }
      });
    };

    changeTabs(".about__list", ".about__item", ".about-skills__block", "hidden", "active");
    changeTabs(".services__list", ".services__btn", ".services__block", "hidden", "active");;
  });