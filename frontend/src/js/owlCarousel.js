$(document).ready(function () {
  $('.owl-carousel').owlCarousel({
    margin: 10,
    items: 2,
    responsive: {
      768: {
        items: 4,
      },
      1024: {
        items: 4,
      },
      1410: {
        items: 5,
      },
    },
  });
});
