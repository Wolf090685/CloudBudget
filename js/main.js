// Carousel

window.addEventListener("load", () => {
    let carousels = document.querySelectorAll(".carousel-3d");
    for (let i = 0; i < carousels.length; i++) {
        carousel(carousels[i]);
    }
});
function carousel(root) {
    let figure = root.querySelector("figure"),
        nav = root.querySelector("nav"),
        images = figure.children,
        n = images.length,
        gap = root.dataset.gap || 0,
        bfc = "bfc" in root.dataset,
        theta = 2 * Math.PI / n,
        currImage = 0;
    setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
    window.addEventListener("resize", () => {
        setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
    });
    setupNavigation();
    function setupCarousel(n, s) {
        let apothem = s / (2 * Math.tan(Math.PI / n));
        figure.style.transformOrigin = `50% 50% ${-apothem}px`;
        for (let i = 0; i < n; i++) images[i].style.padding = `0 ${gap}px`;
        for (i = 0; i < n; i++) {
            images[i].style.transformOrigin = `50% 50% ${-apothem}px`;
            images[i].style.transform = `rotateY(${i * theta}rad)`;
        }
        if (bfc)
            for (i = 0; i < n; i++) images[i].style.backfaceVisibility = "hidden";
        rotateCarousel(currImage);
    }
    function setupNavigation() {
        nav.addEventListener("click", onClick, true);
        function onClick(e) {
            e.stopPropagation();
            let t = e.target;
            if (t.tagName.toUpperCase() != "BUTTON") return;
            if (t.classList.contains("next")) {
                currImage++;
            } else {
                currImage--;
            }
            rotateCarousel(currImage);
        }
    }
    function rotateCarousel(imageIndex) {
        figure.style.transform = `rotateY(${imageIndex * -theta}rad)`;
    }

    window.setInterval(function () {
        currImage++;
        rotateCarousel(currImage);
    }, 3000);
}

// Add class "active" to menu

$('.navbar__menu-link').on('click', function (event) {
    event.preventDefault();
    $('#menu a').removeClass('active');
    $(this).addClass('active');
});

// Scroll to top   

let scrolled,
    timer,
    btn = document.getElementById('to-top');

function scrollToTop() {
    if (scrolled > 0) {
        window.scrollTo(0, scrolled);
        scrolled = scrolled - 250;
        timer = setTimeout(scrollToTop, 50);
    }
    else {
        clearTimeout(timer);
        window.scrollTo(0, 0);
    }
}

$(window).on('scroll', function () {
    scrolled = window.pageYOffset;
    if (scrolled > 400) {
        btn.style.display = 'block';
    } else {
        btn.style.display = '';
    }
});

$(btn).on('click', function () {
    scrollToTop();
});

// Smooth scroll

let offerH = $("#offer").innerHeight(),
    header = $("#header");
scrollOffset = $(window).scrollTop();

$("[data-scroll]").on('click', function (event) {
    event.preventDefault();

    var $this = $(this),
        blockId = $(this).data('scroll'),
        blockOfset = $(blockId).offset().top;

    $('#menu a').removeClass('active');
    $(this).addClass('active');

    $("html, body").animate({
        scrollTop: blockOfset
    }, 700);

    if ($(window).width() < 920) {
        $('.navbar__menu-list').slideToggle();
    }

});

// Burger menu nav toogle

$('.nav-toggle').on('click', function () {
    $('.navbar__menu-list').slideToggle();
});