
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
let lenisInstance = null; 


$(document).ready(function () {

  function mobileMenu() {
    const menu = document.getElementById("mobile-menu");
    const menuToggle = document.getElementById("menuToggle");
    let menuOpen = false;

    menuToggle.addEventListener("click", () => {
      if (!menuOpen) {
        gsap.to(menu, { x: "0%", duration: 0.7 });
        // gsap.to("body", { overflowY: 'hidden', duration: 0.7 },);
      } else {
        gsap.to(menu, { x: "-100%", duration: 0.5 });
        // gsap.to("body", { overflowY: 'scroll', duration: 0.7 },);
      }
      menuOpen = !menuOpen;
    });
  }
  mobileMenu();

  function lenisScroll() {
    // Initialize Lenis only if it's not already initialized
    if (!lenisInstance) {
        lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.008 - Math.pow(2, -5 * t)),
            smoothWheel: true,
            smoothTouch: true,
        });
    }

    function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}

function initLenisForLargeScreens() {
    if (window.innerWidth >= 1024) {
        lenisScroll(); // Initialize and start Lenis for large screens

        document.querySelectorAll('#desktop-menu a, .footer-links ul a').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerOffset = 0; // Adjust if you have a fixed header
                    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    const offsetPosition = elementPosition - headerOffset;

                    // Use Lenis scrollTo method
                    lenisInstance.scrollTo(offsetPosition, {
                        duration: 0.5, // Adjust as needed
                    });
                }
            });
        });
    } else if (lenisInstance) {
        lenisInstance.destroy(); // Destroy Lenis instance when switching to smaller screens
        lenisInstance = null;    // Reset instance to null
    }
}

// Initial check when the page loads
initLenisForLargeScreens();

// Recheck when the window is resized
window.addEventListener("resize", function () {
    initLenisForLargeScreens();
});


  function sliders() {
    $("#banner-slider").owlCarousel({
      autoplay: false,
      autoplaySpeed: 1000,
      autoplayTimeout: 1000,
      smartSpeed: 1000,
      items: 1,
      stagePadding: 0,
      center: true,
      nav: false,
      margin: 0,
      dots: true,
      loop: true,

      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 1,
        },
        1000: {
          items: 1,
        },
      },
    });
    function productInitializeCarousel() {
      var windowWidth = $(window).width(); // Get the current window width

      // Set fade animation for large screens, slide animation for small screens
      var animateIn = windowWidth >= 769 ? "fadeIn" : false;
      var animateOut = windowWidth >= 769 ? "fadeOut" : false;
      console.log(animateIn, animateOut);

      $(".product-slider").owlCarousel({
        autoplay: false,
        smartSpeed: 1000,
        items: 1,
        stagePadding: 0,
        center: true,
        nav: true,
        margin: 10,
        dots: true,
        loop: true,
        touchDrag: true,
        pullDrag: true,
        mouseDrag: windowWidth >= 769 ? false : true, // Disable mouse drag on large screens
        animateIn: animateIn, // Fade animation on large screens
        animateOut: animateOut, // Fade animation on large screens
        dotsContainer: ".custom-dots",

        responsive: {
          375: {
            items: 1,
          },
          425: {
            items: 1,
          },
          576: {
            items: 1,
          },

          768: {
            items: 1,
          },
          1024: {
            items: 1,
            nav: false,
          },
          1366: {
            items: 1,
            nav: false,
          },
          1600: {
            items: 1,
            nav: false,
          },
        },
      });
    }

    // Initialize the carousel on page load
    productInitializeCarousel();

    // Reinitialize carousel when window is resized
    $(window).resize(function () {
      $(".product-slider").trigger("destroy.owl.carousel"); // Destroy current instance
      productInitializeCarousel(); // Reinitialize with new settings
    });

    const vhMargin = window.innerHeight * 0.02; // Calculate margin based on viewport height
    // recipe slider
    function initializeCarousel() {
      $(".recipe-slider").owlCarousel({
        autoplay: false,
        autoplaySpeed: 1000,
        autoplayTimeout: 1000,
        smartSpeed: 1000,
        items: 1,
        stagePadding: 0,
        center: false,
        nav: true,
        margin: vhMargin, // Set margin dynamically
        dots: true,
        loop: true, // Disable touch dragging
        mouseDrag: false,

        responsive: {
          0: {
            items: 1,
          },
          768: {
            items: 3,
          },
          1000: {
            items: 3,
          },
          1366: {
            items: 3,
          },
        },
      });
    }

    initializeCarousel();
    window.addEventListener("resize", () => {
      $(".recipe-slider").trigger("destroy.owl.carousel"); // Destroy the existing carousel
      initializeCarousel(); // Re-initialize with the new margin
    });

    // recipe small slider
    $(".sm-recipe-slider").owlCarousel({
      autoplay: false,
      autoplaySpeed: 1000,
      autoplayTimeout: 1000,
      smartSpeed: 1000,
      items: 1,
      stagePadding: 0,
      center: false,
      nav: true,
      margin: vhMargin, // Set margin dynamically
      dots: false,
      loop: true, // Disable touch dragging
      mouseDrag: false,
      touchDrag: false,
    });

    $(".testimonial-slider").owlCarousel({
      autoplay: false,
      autoplaySpeed: 1000,
      autoplayTimeout: 1000,
      smartSpeed: 1000,
      items: 1,
      stagePadding: 0,
      center: true,
      nav: false,
      margin: 10,
      dots: true,
      loop: true,

      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 1,
        },
        1000: {
          items: 1,
        },
      },
    });

    // Custom text for each dot
    var customTexts = ["Product_1", "Product_2", "Product_3"];

    // Add custom text to each dot after Owl Carousel initializes
    $(".custom-dots .owl-dot").each(function (index) {
      $(this).text(customTexts[index]);
    });
  }
  sliders();

  function process() {
    const processItemsLeft = document.querySelectorAll(".process-items-left");
    const processItemsRight = document.querySelectorAll(".process-items-right");

    // Combine the two NodeLists into one array
    const processItems = [...processItemsLeft, ...processItemsRight];

    processItems.forEach((section, i) => {
      // Check if this is the last section in the left or right items
      const isLastLeft =
        section.classList.contains("process-items-left") &&
        i === processItemsLeft.length - 1;
      const isLastRight =
        section.classList.contains("process-items-right") &&
        i === processItemsLeft.length + processItemsRight.length - 1;

      gsap.from(section, {
        y: 100,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
          onEnter: () => {
            // When the current section enters, fade it in
            gsap.to(section, { opacity: 1, duration: 1 });

            // If there is a previous section, fade it out
            if (i > 0 && !(isLastLeft || isLastRight)) {
              gsap.to(processItems[i - 1], { opacity: 0, duration: 0.5 });
            }
          },
          onLeave: () => {
            // Fade out except for the last left or right section
            if (!(isLastLeft || isLastRight)) {
              gsap.to(section, { opacity: 0, duration: 0.5 });
            }
          },
          onEnterBack: () => {
            // When scrolling back, fade the section in
            gsap.to(section, { opacity: 1, duration: 1 });

            // If there is a next section, fade it out
            if (i < processItems.length - 1 && !(isLastLeft || isLastRight)) {
              gsap.to(processItems[i + 1], { opacity: 0, duration: 0.5 });
            }
          },
          onLeaveBack: () => {
            // When scrolling back past the section, fade it out except for the last left or right section
            if (!(isLastLeft || isLastRight)) {
              gsap.to(section, { opacity: 0, duration: 1 });
            }
          },
        },
      });
    });

    // Pin the middle column
    const processWrapper = document.querySelector(".process-left-wrapper");

    // Calculate total height, adjusting based on viewport height
    const totalHeight = processWrapper.scrollHeight - window.innerHeight * 0.8;

    ScrollTrigger.create({
      trigger: ".pin-box2",
      pin: true,
      start: "0 1%",
      // markers: true,
      end: `+=${totalHeight}`, // Pin until the total height of all process items
      scrub: true,
    });
  }
  process();

  function recipeTabs(containerSelector) {
    // Target only the specific container (like for desktop or mobile)
    var $container = $(containerSelector);

    // Show corresponding content when clicking carousel item
    if ($container.attr("id") == "desktop-section") {
      if ($container.length) {
        // Set the first item's background to yellow on page load
        // $container.find('.item').first().find('.bg-orange_').css('background', 'yellow');
        var firstItem = $container
          .find(".owl-item.active")
          .first()
          .find(".bg-orange_")
          .css("background", "#e99d23");
        // Set up click event for items
        $container.find(".item").on("click", function () {
          // Reset background color for all items to the default color
          $container.find(".bg-orange_").css("background", ""); // Reset to default
          // Change the background of the clicked item to yellow
          $(this).find(".bg-orange_").css("background", "#e99d23");
        });
      }

      $container.find(".item").on("click", function () {
        var itemId = $(this).data("item");

        // Deactivate all items in this container and activate the clicked item
        $container.find(".content-item").removeClass("active-item");
        $container.find("#content-" + itemId).addClass("active-item");

        // Hide all button contents in this container and reset active states
        $container.find(".content-item .btn-content").removeClass("active"); // Reset all button states
        $container.find(".content-item [id^='btn-content']").hide(); // Hide all contents

        // Show the first button's content by default for the activated item
        $container.find("#btn-content-" + itemId + "-1").show(); // Show the first button content for the active item
        $container.find(".active-item .btn-content").first().addClass("active"); // Make the first button active
      });
    }

    // Show content based on button click within the selected item
    $container.on("click", ".active-item .btn-content", function () {
      var btnId = $(this).data("btn");

      // Remove active class from buttons within the active content item
      $(this)
        .closest(".content-item")
        .find(".btn-content")
        .removeClass("active");
      $(this).addClass("active");

      // Hide all content in the active item and show the corresponding content
      $(this).closest(".content-item").find('[id^="btn-content"]').hide();
      $(this)
        .closest(".content-item")
        .find("#btn-content-" + btnId)
        .show();
    });

    // Ensure the first button's content is shown by default on page load
    $container.find(".content-item").first().addClass("active-item"); // Ensure first item is active on load
    $container
      .find(".content-item")
      .first()
      .find(".btn-content")
      .first()
      .addClass("active"); // Ensure first button is active
    $container.find("#btn-content-1-1").show(); // Show the first button content by default
  }
  recipeTabs("#desktop-section");
  recipeTabs("#mobile-section"); // For small screens (or mobile)



  function accordian($parentClass) {
    // Show the first content by default
    $(`${$parentClass} .accordion-content`).first().slideDown();
    $(`${$parentClass} .accordion-header i`).first().addClass("rotate"); // Rotate the first icon by default

    $(`${$parentClass} .accordion-header`).click(function () {
      // Slide up all content and remove rotation from all icons
      $(`${$parentClass} .accordion-content`).slideUp();
      $(`${$parentClass} .accordion-header i`).removeClass("rotate");

      // If the clicked header's content is not visible, show it
      if (!$(this).next(`${$parentClass} .accordion-content`).is(":visible")) {
        $(this).next(`${$parentClass} .accordion-content`).slideDown();
        $(this).find("i").addClass("rotate"); // Rotate the icon of the clicked header
      }
    });
  }
  accordian(".process-section");
});
