document.addEventListener("DOMContentLoaded", () => {

const tabs = document.querySelectorAll(".tab"),
          tabsContent = document.querySelectorAll(".tab__content"),
          tabsParent = document.querySelector(".tabs"),
          delivery = document.querySelector(".delivery"),
          registration = document.getElementById("registration"),
          overlay = document.querySelector(".overlay");

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = "none";
        });

        tabs.forEach(item =>{
            item.classList.remove("tab_active");
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = "block";
        tabs[i].classList.add("tab_active");
        if (tabs[i] == tabs[1]) {
            delivery.classList.add("delivery_color");
            tabsColor.style.backgroundColor = "#dcd1c6";
        } else {
            delivery.classList.remove("delivery_color");
        }
        
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (event) =>{
        const target = event.target;
        if(target && target.classList.contains("tab")) {
            tabs.forEach((item, i) =>{
                if (target==item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    
    $('[data-tray').on('click', function() {
        $('.overlay, #tray').fadeIn('slow');
        $("body").css('overflow','hidden');
        $("header").css('display','none');
    });

    // $('.btn_order').on('click', function() {
    //         $('.overlay, #descr').fadeIn('slow');
    //         $("body").css('overflow','hidden');
    //         $("header").css('display','none');
    // });

    $('.btn_submit').on('click', function() {
        $('.overlay, #registration').fadeIn('slow');
        $('#tray, #descr').fadeOut('slow');
        $("body").css('overflow','hidden');
        $("header").css('display','none');
    });

    $('.modal__close, .btn_edit').on('click', function() {
        $('.overlay, #tray, #descr, #registration').fadeOut('slow');
        $("body").css('overflow','visible');
        $("header").css('display','block');
    });


     $('.btn_order').each(function(i) {
        $(this).on('click', function() {
            $('.weight').text($('.product__weight').eq(i).text());
            $('.modal__text-name').text($('.product__name').eq(i).text());
            $('.price').text($('.product__price').eq(i).text());
            $('.price_old').text($('.product__discount').eq(i).text());
            $('.overlay, #descr').fadeIn('slow');
            $("body").css('overflow','hidden');
            $("header").css('display','none');
        })
    });

    overlay.addEventListener("click", (e) => {
        if(e.target === overlay) {
            // overlay.style.display = "none";
            // registration.style.display = "none";
            document.body.style.overflow = "visible";
            $('.overlay, #tray, #descr, #registration').fadeOut('slow');
            $("header").css('display','block');
        }
    });

    document.addEventListener("keydown", (e) => {   
        if (e.code === 'Escape') {
            // overlay.style.display = "none";
            // registration.style.display = "none";
            $('.overlay, #tray, #descr, #registration').fadeOut('slow');
            document.body.style.overflow = "visible";
            $("header").css('display','block');
        }
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    window.onscroll = () => {
        const header = document.querySelector(".header"),
              y = delivery.offsetTop;

            if (scrollY > y) {
                header.classList.add("header_fixed");
            } else if (y > scrollY) {
                header.classList.remove("header_fixed");
            }
    }

    const anchors = document.querySelectorAll('a[href*="#"]');

    for (let anchor of anchors) {
        anchor.addEventListener ("click", function(e) {
            e.preventDefault();
            const blockId = anchor.getAttribute('href');
            document.querySelector('' + blockId).scrollIntoView({
                behavior:"smooth",
                block:"start"
            })
        })
    }
});


