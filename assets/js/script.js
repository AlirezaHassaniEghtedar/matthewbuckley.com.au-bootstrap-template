const open_topHeader_btn = document.querySelector('.header .top-header div div .phone-icon')
const close_topHeader_btn = document.querySelector('.header .add-info-mobile#slideOut .close-info')
const topHeader_slideOut_Section = document.querySelector('.header .add-info-mobile#slideOut')
const toggleMobileMenuBtn = document.querySelector('.header .toggle-mobile-menu')
const overlay = document.querySelector('.header .overlay')
const mobileNavMenu = document.querySelector('header .main-header .nav-menu-links')
const slider_dots = document.querySelectorAll('.slick-dots li')
const mainHeader = document.querySelector('header .main-header')
const header = document.querySelector('header')
const mobile_menu_items_has_a_submenu = document.querySelectorAll('.header .main-header .nav-menu-links ul li.has-a-sub > a')
const scrollToTop = document.querySelector('.scrollTop');
const tabHeadings = document.querySelectorAll('.footer-heading')


// Event Listeners

open_topHeader_btn.addEventListener('click' , () => {
    topHeader_slideOut_Section.classList.add('active')
})
close_topHeader_btn.addEventListener('click' , () => {
    topHeader_slideOut_Section.classList.remove('active')
})

toggleMobileMenuBtn.addEventListener('click' , toggleMobileMenu)
overlay.addEventListener('click' , toggleMobileMenu)

slider_dots.forEach(dot => dot.addEventListener('click' , handleSliderDotClick))

mobile_menu_items_has_a_submenu.forEach(item => item.addEventListener('click' , openSubMenu))
window.addEventListener('scroll' , handleScroll)

// functions


function handleSliderDotClick(e) {
    const slider_height = document.querySelector('.slick-list.draggable').getBoundingClientRect().height
    const sliderClickedNumber = e.target.getAttribute('aria-label')
    const transformValue = (-1) * sliderClickedNumber * slider_height
    slider_dots.forEach(dot => dot.querySelector('button').getAttribute('aria-label') === sliderClickedNumber ? dot.querySelector('button').classList.add('active-slide') : dot.querySelector('button').classList.remove('active-slide'))
    document.querySelector('.slick-track').style.transform = `translateY(${transformValue}px)`
}

function toggleMobileMenu() {
    toggleMobileMenuBtnStyle()
    if(mobileNavMenu.classList.contains('active')) {
        mobileNavMenu.classList.remove('active')
    } else {
        mobileNavMenu.classList.add('active')
    }
}

function toggleMobileMenuBtnStyle() {
    if(toggleMobileMenuBtn.classList.contains('active')) { // if it was true => the menu was open and active 
        toggleMobileMenuBtn.classList.remove('active')
        overlay.classList.remove('active')
    } else { // if was not true => the menu was close and not active
        toggleMobileMenuBtn.classList.add('active')
        overlay.classList.add('active')
        handleMobileMenuTopDistance()
    }
}

function handleMobileMenuTopDistance(){
    const headerHeight = document.querySelector('.header').getBoundingClientRect().height
    overlay.style.height = `calc(100% - ${headerHeight}px)`
    mobileNavMenu.style.height = `calc(100% - ${headerHeight - 0.5}px)`
}
function handleStickyHeader() {
    if(scrollY > 0) {
        header.classList.add('sticky')
    } else {
        header.classList.remove('sticky')
    }
}

function handleScroll () {
    scrollBtnVisibility()
    handleStickyHeader()
}

function openSubMenu(e) {
    let menuItem;
    if(e.target.tagName === "A") {
        menuItem = e.target.parentElement;
    } else if(e.target.tagName === "I") {
        menuItem = e.target.parentElement.parentElement;
    }
    menuItem.querySelector('.submenu').classList.toggle('active')
}

// scroll to top visibility 
function scrollBtnVisibility() {
    if(scrollY > 100) {
        scrollToTop.style.opacity = '1'
        scrollToTop.style.visibility = 'visible'
    } else {
        scrollToTop.style.opacity = '0'
        scrollToTop.style.visibility = 'hidden'
    }
}

// footer accordion 

tabHeadings.forEach(item => item.addEventListener('click' , openTab))

function openTab(e) {
    e.target.parentElement.querySelector('.footer-links').classList.toggle('active')
}