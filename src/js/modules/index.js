import toggleBodyLock from './../helpers/toggleBodyLock';
import { html, firstScreen, header } from './../helpers/elementsNodeList';

// Проверка браузера на поддержку .webp изображений ======================================================
function isWebp() {
  // Проверка поддержки webp
  const testWebp = (callback) => {
    const webP = new Image();

    webP.onload = webP.onerror = () => callback(webP.height === 2);
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  };

  // Добавление класса _webp или _no-webp для HTML
  testWebp((support) => {
    const className = support ? 'webp' : 'no-webp';
    html.classList.add(className);
  });
}

/* Проверка мобильного браузера */
const isMobile = {
  Android: () => navigator.userAgent.match(/Android/i),
  BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
  iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => navigator.userAgent.match(/Opera Mini/i),
  Windows: () => navigator.userAgent.match(/IEMobile/i),
  any: () =>
    isMobile.Android() ||
    isMobile.BlackBerry() ||
    isMobile.iOS() ||
    isMobile.Opera() ||
    isMobile.Windows(),
};

/* Добавление класса touch для HTML если браузер мобильный */
function addTouchClass() {
  // Добавление класса _touch для HTML если браузер мобильный
  if (isMobile.any()) {
    html.classList.add('touch');
  }
}

// Добавление loaded для HTML после полной загрузки страницы
function addLoadedClass() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      html.classList.add('loaded');
    }, 0);
  });
}

// Получение хеша в адресе сайта
const getHash = () => location.hash?.replace('#', '');

// Указание хеша в адресе сайта
function setHash(hash) {
  hash = hash ? `#${hash}` : location.href.split('#')[0];
  history.pushState('', '', hash);
}
function homeRedirect() {
  var bookButton = document.getElementById("bookButton");
  if (bookButton) {
    bookButton.onclick = function() {
      window.open("https://calendly.com/detailingonwheels-ca/booking", "_blank");
    };
  }
}

// Универсальная функция для открытия и закрытия попапов ==================================================
const togglePopupWindows = () => {
  document.addEventListener('click', ({ target }) => {
    if (target.closest('[data-type]')) {
      const popup = document.querySelector(
        `[data-popup="${target.dataset.type}"]`
      );

      if (document.querySelector('._is-open')) {
        document.querySelectorAll('._is-open').forEach((modal) => {
          modal.classList.remove('_is-open');
        });
      }

      popup.classList.add('_is-open');
      toggleBodyLock(true);
    }

    if (
      target.classList.contains('_overlay-bg') ||
      target.closest('.button-close')
    ) {
      const popup = target.closest('._overlay-bg');

      popup.classList.remove('_is-open');
      toggleBodyLock(false);
    }
  });
};

const faqPage = () => {
  const items = document.querySelectorAll(".accordion button");

  function toggleAccordion() {
    const itemToggle = this.getAttribute('aria-expanded');
    
    for (var i = 0; i < items.length; i++) {
      items[i].setAttribute('aria-expanded', 'false');
    }
    
    if (itemToggle == 'false') {
      this.setAttribute('aria-expanded', 'true');
    }
  }
  items.forEach(item => item.addEventListener('click', toggleAccordion));
}

function burgerMenu() {
  const mobileNavButton = document.querySelector('.mobile-nav-button');
  const menuItems = document.querySelectorAll('.mobile-menu li a');

  function handleClick() {
    mobileNavButton.click();
  }

  menuItems.forEach((menuItem) => {
    menuItem.addEventListener('click', handleClick);
  });

  document.querySelector('.mobile-nav-button').addEventListener('click', function() {
    var line1 = document.querySelector(".mobile-nav-button .mobile-nav-button__line:nth-of-type(1)");
    var line2 = document.querySelector(".mobile-nav-button .mobile-nav-button__line:nth-of-type(2)");
    var line3 = document.querySelector(".mobile-nav-button .mobile-nav-button__line:nth-of-type(3)");

    line1.classList.toggle("mobile-nav-button__line--1");
    line2.classList.toggle("mobile-nav-button__line--2");
    line3.classList.toggle("mobile-nav-button__line--3");

    var mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.classList.toggle('mobile-menu--open');

    // Add or remove additional CSS properties based on menu state
    if (mobileMenu.classList.contains('mobile-menu--open')) {
      // Burger menu is open
      document.body.classList.add('overflow-hidden'); // Add class to body
    } else {
      // Burger menu is closed
      document.body.classList.remove('overflow-hidden'); // Remove class from body
    }

    return false;
  });
}

$(document).ready(function() {
  var hasPopupShown = sessionStorage.getItem('popupShown');

  if (!hasPopupShown) {
    setTimeout(function() {
      $('#popup').fadeIn();
      sessionStorage.setItem('popupShown', true);
      $('body').css('overflow', 'hidden'); // Add overflow: hidden to body
      closeBurgerMenu(); // Close the burger menu
    }, 10000);
  }

  $('.close-popup').click(function(e) {
    e.preventDefault();
    $(this).closest('.popup').fadeOut();
    $('body').css('overflow', 'auto');
  });

  $('.popup-overlay').click(function(e) {
    if ($(e.target).hasClass('popup-overlay')) {
      $('.popup').fadeOut();
      $('body').css('overflow', 'auto');
    }
  });

  $('.promo-popup').submit(function(e) {
    e.preventDefault();
    var form = $(this);
    var spinner = $('#spinner');
    spinner.addClass("d-block");

    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      data: form.serialize(),
      success: function(response) {
        if (response === 'success') {
          $('#popup').fadeOut();
          $('#thank-you-popup').fadeIn();
          $('body').css('overflow', 'hidden');
        }
      },
      complete: function() {
        spinner.removeClass("d-block");
        spinner.addClass("d-none");
        $('body').css('overflow', 'auto');
      }
    });
  });

  function closeBurgerMenu() {
      var line1 = $(".mobile-nav-button .mobile-nav-button__line:nth-of-type(1)");
      var line2 = $(".mobile-nav-button .mobile-nav-button__line:nth-of-type(2)");
      var line3 = $(".mobile-nav-button .mobile-nav-button__line:nth-of-type(3)");

      line1.removeClass("mobile-nav-button__line--1");
      line2.removeClass("mobile-nav-button__line--2");
      line3.removeClass("mobile-nav-button__line--3");

      var mobileMenu = $('.mobile-menu');
      mobileMenu.removeClass('mobile-menu--open');
    }
  });

  $(document).ready(function() {
    function toggleAccordion() {
          var itemToggle = $(this).attr('aria-expanded');
        
          $('.item').attr('aria-expanded', 'false');
        
          if (itemToggle === 'false') {
            $(this).attr('aria-expanded', 'true');
          }
      }

      $('.item').on('click', toggleAccordion);
  });

  $(document).ready(function(){
    $('.carousel').slick({
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 2,
      autoplay: true,
      autoplaySpeed: 2000,
      dots:true,
      arrows: false,
      centerMode: true,
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          // centerMode: true,
  
        }
  
      }, {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
          infinite: true,
        }
      },

      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          dots: true,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 2000,
        }
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 2000,
        }
      }]
    });
  });

// keep the same height for slider
  $('.carousel').on('setPosition', function() {
    var slides = $('.card');
    var maxHeight = 0;
  
    slides.css('height', ''); // Reset slide heights
  
    slides.each(function() {
      var slideHeight = $(this).outerHeight();
      maxHeight = Math.max(maxHeight, slideHeight);
    });
  
    slides.css('height', maxHeight); // Set equal height to all slides
  });

export {
  isWebp,
  homeRedirect,
  addTouchClass,
  togglePopupWindows,
  addLoadedClass,
  burgerMenu,
  getHash,
  faqPage,
  setHash
};