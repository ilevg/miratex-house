/**Slide circle */


// window.addEventListener('wheel', function() {
//     let circleCoords = slideCircle.getBoundingClientRect().top
//     slideCircle.style.top = window.scrollY
// })

window.addEventListener('DOMContentLoaded', () => {
    const slideCircle = document.querySelector('.slide_circle')
    
    window.addEventListener('scroll', () => {

        const container = document.querySelector('.wrapper_cont')
        console.log(container.scrollHeight)
        console.log(document.body.scrollHeight)

        let windowHeight = window.innerHeight
        let scrollPercentage = (document.body.scrollHeight) / windowHeight;
        let coords = window.scrollY / scrollPercentage
        // if ( coords >= container.scrollHeight) {
        //     coords = container.scrollHeight
        // }
        slideCircle.style.top = coords + 60 +'px';
        slideCircle.style.position = 'fixed'
        
    });
  });

// scroll on cklick

const headerList = document.querySelectorAll('.header__link[data-goto]');
if (headerList.length > 0) {
    headerList.forEach(headerLink => {
        headerLink.addEventListener("click", onHeaderLinkClick);
    });

    function onHeaderLinkClick(e) {
        const headerLink = e.target;
        if (headerLink.dataset.goto && document.querySelector(headerLink.dataset.goto)) {
            const gotoBlock = document.querySelector(headerLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}

// img scroll


// function imgScroll() {
//   const imgCont = document.querySelector('.intro__images')
//   const img = document.querySelector('.img__intro')

//   window.addEventListener('scroll', function(event) {
//       imgCont.style.height = (parseInt(imgCont.style.height) + 10) + 'px';
//     if ( imgCont.style.height == img.clientHeight + 'px') {
//       return
//     }
//   }) 
// }
// imgScroll();
function scrollImg(event) {
  event.preventDefault();

  let container = document.querySelector('.intro__images');
  let image = document.querySelector('.img__intro');
  let containerHeight = container.offsetHeight;
  let imageHeight = image.offsetHeight;
  
  containerHeight = imageHeight
  container.style.height = containerHeight + 'px'
  
  function removeEvent() { 
    if (containerHeight <= imageHeight) {
    window.removeEventListener('wheel', scrollImg)  
    } 
  }
  
  setTimeout(removeEvent, 1000);
}
window.addEventListener('wheel', scrollImg, { passive: false })

/** Change opacity of sections with scroll*/

let timeoutId;
let targetArr = document.querySelectorAll('[data-opacity]')


targetArr.forEach(function(target) {
    document.addEventListener('scroll', function() {
        let targetCoordsTop = target.getBoundingClientRect().top
        let targetCoordsBottom = target.getBoundingClientRect().bottom

        let windowHeight = window.innerHeight
        const catalogButtons = document.querySelectorAll('button')
        const catalogBorder =  document.querySelector('.catalog_border')
        const catalogBorderSec =  document.querySelector('.catalog_border_second')
        const catButton = document.querySelectorAll('[data-catbutton]')
        const socialPic = document.querySelectorAll('[social_pic]')


        if (windowHeight > (targetCoordsTop + 600) ) {
            if( target.getAttribute('data-opacity') === 'catalog') {
                document.body.style.backgroundColor = 'black'
                document.body.style.color = 'white'
                catalogBorder.style.borderColor = 'white'
                catalogBorderSec.style.borderColor = 'white'
                
                catalogButtons.forEach(button => {
                    button.style.color = 'white'
                    button.style.borderColor = 'white'
                })
                catButton.forEach(button => button.style.filter = 'invert(100%)')
                socialPic.forEach(pic => pic.style.filter = 'invert(100%) brightness(150%);')
            }
            target.style.opacity = '1'
            
        } else {
            target.style.opacity = '0.2'

        }
        if (targetCoordsBottom < windowHeight - 700) {
            target.style.opacity = '0.2';
            document.body.style.backgroundColor = ''
            document.body.style.color = ''
            catalogBorderSec.style.borderColor = ''

            catalogButtons.forEach(button => {
                button.style.color = ''
                button.style.borderColor = ''
            })
            catButton.forEach(button => button.style.filter = '')
            socialPic.forEach(pic => pic.style.filter = '')
        }
    })
})

// ////////////////////////////////////////////////////

/** Load intro section */

let introContent = document.querySelector('.intro__content')
let introSubtext = document.querySelector('.intro__subtext_pc')
let introSubtextSecond = document.querySelector('.intro__subtext-second')


document.addEventListener('DOMContentLoaded', function() {
    introContent.style.animationName = 'slide-in';
    introContent.style.animationDuration = '1s'; 
    introContent.style.animationTimingFunction = 'ease-in-out'; 
    introContent.style.animationFillMode = 'forwards';
    
    introSubtext.style.animationName = 'slide-in-second';
    introSubtext.style.animationDuration = '1s';
    introSubtext.style.animationTimingFunction = 'ease-in-out';
    introSubtext.style.animationFillMode = 'forwards';
    
    introSubtextSecond.style.animationName = 'slide-in-second';
    introSubtextSecond.style.animationDuration = '1s';
    introSubtextSecond.style.animationTimingFunction = 'ease-in-out';
    introSubtextSecond.style.animationFillMode = 'forwards';
})
////////////////////////////////////////////////////////////////////////
/** Use dropdown list */

let firstButton = document.querySelector('.use__button_first')
let secondButton = document.querySelector('.use__button-second')
let dropdownFirst = document.querySelector('.use__popup')
let dropdownSecond = document.querySelector('.use__popup_second')

function buttonToggle(button, dropdown) {
    if ( button.classList.contains('active')) {
        button.classList.remove('active')
        dropdown.classList.remove('active')
        button.style.transform = 'rotate(0deg)'      
    } else {
        button.classList.add('active');
        dropdown.classList.add('active');
        button.style.transform = 'rotate(180deg)'
    }
}

firstButton.addEventListener('click', function() {
    buttonToggle(firstButton, dropdownFirst)
} )
secondButton.addEventListener('click', function() {
    buttonToggle(secondButton, dropdownSecond)
})

///////////////////////////////////////////////////////////////////

/** Slide the catalog */

let catalogButtons = document.querySelector('.catalog_buttons')
let catalogSection = document.querySelector('.catalog__section')
let allCatalogPages = catalogSection.querySelectorAll('[data-catalog]')

catalogButtons.addEventListener('click', function(e) {
    target = e.target.closest('.catalog__button')
    if ( !target ) return

    allCatalogPages.forEach( page => {
        page.style.display = 'none'
        page.style.opacity = '0'
    })

    let catalogPage = catalogSection.querySelector(`[data-catalog="${target.textContent}"]`)
    catalogPage.style.display = 'block'
    setTimeout(() => {
        catalogPage.style.opacity = '1'
    }, 0)

    let catalogPageCoords = catalogPage.getBoundingClientRect().top + window.scrollY
    window.scrollTo({
        top: catalogPageCoords,
        behavior: "smooth"
    })
    e.preventDefault()
})

    /**Scroling (Slide) page with buttons*/

let slideButton = document.querySelector('.catalog__button_slide')
let slideButtonSec = document.querySelector('.catalog__button_slide_second')
let pageIndex = 0;


function slidePages(e) {
    const target = e.target.closest('[data-catbutton]')

    allCatalogPages.forEach( page => {
        page.style.display = 'none'
        page.style.opacity = '0'
    })

    if ( target.getAttribute('data-catbutton') === 'first') {
        if ( pageIndex > 0) {
            pageIndex--
        } else {
            pageIndex = allCatalogPages.length - 1
        }
    } else {
        if ( pageIndex < allCatalogPages.length - 1) {
            pageIndex++
        } else {
            pageIndex = 0
        }
    }

    allCatalogPages[pageIndex].style.display = 'block'
    setTimeout(() => {
        allCatalogPages[pageIndex].style.opacity = '1'
    }, 0)

    let catalogPageCoords = allCatalogPages[pageIndex].getBoundingClientRect().top + window.scrollY
    window.scrollTo({
        top: catalogPageCoords,
        behavior: "smooth"
    })
}
slideButton.addEventListener('click', slidePages)
slideButtonSec.addEventListener('click', slidePages)


