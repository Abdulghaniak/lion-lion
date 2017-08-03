(function ($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature
    $('.page-scroll a').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function () {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    $(function () {
        //Declare the Slider in Photos Section
        $('.imageSlider').pgwSlideshow({
            autoSlide: true
        });
        
        // Floating label headings for the contact form
        $("body").on("input propertychange", ".floating-label-form-group", function (e) {
            $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
        }).on("focus", ".floating-label-form-group", function () {
            $(this).addClass("floating-label-form-group-with-focus");
        }).on("blur", ".floating-label-form-group", function () {
            $(this).removeClass("floating-label-form-group-with-focus");
        });

        //Form Validation
        $("#contactForm input,#contactForm select").jqBootstrapValidation({
            preventSubmit: true,
            filter: function () {
                return $(this).is(":visible");
            },
        });

        //direct to section upon clicking the tab
        $("a[data-toggle=\"tab\"]").click(function (e) {
            e.preventDefault();
            $(this).tab("show");
        });
    });

})(jQuery); // End of use strict


// When clicking on Full hide fail/success boxes
$('#name').focus(function () {
    $('#success').html('');
});