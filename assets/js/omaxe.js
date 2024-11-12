// Initialize Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  smooth: true,
  smoothTouch: false,
});

// Animation frame for smooth scrolling
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Optional: Sync Lenis with GSAP's ScrollTrigger
gsap.registerPlugin(ScrollTrigger);
lenis.on("scroll", ScrollTrigger.update);

$(document).ready(function () {
  $(window).on("load", function () {
    gsap.to(".preloader-wrapper", {
      delay: 1,
      duration: 1,
      opacity: 0,
      onComplete: function () {
        $(".preloader-wrapper").css("display", "none");

        const tl = gsap.timeline();

        tl.to(".banner-1-bg", {
          duration: 2,
          backdropFilter: "blur(0px)",
        })
          .to(
            ".logo-2",
            {
              opacity: 1,
              duration: 2,
            },
            "<"
          )
          .to(
            ".fade",
            {
              opacity: 1,
            },
            "-=1.5"
          );
      },
    });

    // for logo
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".logo-2",
          start: "-20% top",
          end: "bottom top",
          scrub: true, // Smooth transition linked to scroll
          markers: true,
        },
      })
      .to(".logo-2", {
        opacity: 0,
      });

    // Apply scroll-triggered blur effect on .banner-1-bg
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".banner-1-bg",
          start: "40% 35%",
          end: "bottom top",
          scrub: true, // Smooth transition linked to scroll
          markers: false,
        },
      })
      .to(
        ".banner-1-bg",
        { backdropFilter: "blur(30px)" } // End with blur
      );

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".ground-bg",
          start: "top top",
          end: "bottom top",
          scrub: true, // Smooth transition linked to scroll
          markers: false,
          pin: true,
          pinSpacing: true,
        },
      })
      .to(".ground-bg", {
        transform: "translateX(-100%)",
      });
  });

  let isToggled = true;
  const menuTl = gsap.timeline();
  $(window).on("load", function () {
    // menu toggler
    $("#menu_toggler").click(function () {
      $(".menu_line-1").toggleClass("menu_line-1_move");
      $(".menu_line-2").toggleClass("menu_line-2_move");

      if (isToggled) {
        menuTl.to(".menu_toggler", {width: "500px", duration: 0.5 },"+=0");
        menuTl.to(".menu_toggler", { delay:0.2, height: "400px",duration: 0.5},);

        isToggled = false
      }
      else{
        menuTl.to(".menu_toggler", {height: "54px",duration: 0.5},"+=0");
        menuTl.to(".menu_toggler", {width: "auto", duration: 0.5 });
        isToggled = true
      }
      
    });
  });
});

// form validation
$(document).ready(function () {
  $("#contactForm").validate({
    highlight: function (element) {
      console.log($(element));
      $(element).addClass("border-red-500"); // Add red border on error
    },
    unhighlight: function (element) {
      $(element).removeClass("border-red-500").addClass("border-gray-300"); // Remove red border when valid
    },
    rules: {
      name: {
        required: true,
        minlength: 3,
      },
      phone: {
        required: true,
        digits: true,
        minlength: 10,
      },
      email: {
        required: true,
        email: true,
      },
    },
    messages: {
      name: {
        required: "Required",
        minlength: "At least 3 characters",
      },
      phone: {
        required: "Required",
        digits: "Use only digits",
        minlength: "Must be at least 10 digits",
      },
      email: {
        required: "Required",
        email: "Enter valid email",
      },
    },
    submitHandler: function (form, event) {
      event.preventDefault(); // Prevent form from reloading the page
      $.ajax({
        url: ajax_object.ajax_url, // Properly referencing ajax_object.ajax_url
        type: "POST",
        data: {
          name: $("#name").val(),
          email: $("#email").val(),
          phone: $("#phone").val(),
          action: "send_contact_form", // The action to trigger in PHP
        },
        success: function (response) {
          $("#formResponse").html(
            '<p class="bg-yellow text-green py-3 px-4 mt-3 rounded-full text-center">Message sent successfully!</p>'
          );
          $("#contactForm")[0].reset();
        },
        error: function (error) {
          $("#formResponse").html(
            '<p class="text-red-500">Error sending message. Please try again.</p>'
          );
        },
      });
    },
  });
});
