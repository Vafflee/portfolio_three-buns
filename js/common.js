// === Animations ===
const animItems = document.querySelectorAll('._anim-item');
console.log(animItems.length);
if (animItems.length > 0) {
    window.addEventListener('scroll', AnimOnScroll);
    function AnimOnScroll(params) {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;
            // console.log('animItemHeight = ', animItemHeight);
            // console.log('animItemOffset = ', animItemOffset);
            
            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            // console.log('animItemPoint = ', animItemPoint);
            // console.log('pageYOffset = ', pageYOffset);
            // console.log('pageYOffset = ', pageYOffset);
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }
            if ((pageYOffset > animItemOffset - animStart - window.innerHeight) && (pageYOffset < animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            }
            else {
                if(!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active');
                }
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    setTimeout(() => {
        AnimOnScroll();
    }, 300);
}
// === Animations ===

// === Slider ===
let position = 0;
let slidesToShow = 1;
if (window.innerWidth >= 1600) {
    slidesToShow = 2;
}
// else {
//     const slidesToShow = 1;
// }
console.log(window.innerWidth); 
console.log(window.innerWidth >= 1600); 
const slidesToScroll = 1;
const container = document.querySelector('.slider');
const track = document.querySelector('.slider-items');
const btnPrev = document.querySelector('.prevBtn');
const btnNext = document.querySelector('.nextBtn');
const items = document.querySelectorAll('.slider-item');
const itemsCount = items.length;
const itemWidth = container.clientWidth / slidesToShow;
const movePosition = slidesToScroll * itemWidth;
const wrapper = document.querySelector('.section-header-promotions__content');
let mouseOver = false;

// console.log(itemsCount, container.clientWidth, itemWidth);

items.forEach((item) => {
    item.style.minWidth = itemWidth + 'px';
});

btnNext.addEventListener('click', () => {
    // console.log('NextBtn was pushed')
    position -= movePosition;

    SetPosition();
    BtnCheck();
});

btnPrev.addEventListener('click', () => {
    // console.log('PrevBtn was pushed')
    position += movePosition;

    SetPosition();
    BtnCheck();
});

const SetPosition = () => {
    track.style.transform = 'translateX(' + position + 'px)';
    // console.log('Position moved to ', position);
};

const BtnCheck = () => {
    btnNext.disabled = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth === 0;
    btnPrev.disabled = Math.abs(position) / itemWidth === 0;
}

const MoveToNext = () => {
    if (!mouseOver) {
        position = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth === 0 ? 0 : position - movePosition;   
        SetPosition();
        // console.log("Move To Next!");
    }
    BtnCheck();
}

BtnCheck();
setInterval(MoveToNext, 6000);
// === Slider ===
