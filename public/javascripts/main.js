// function viewProfile() {
//     $(document).ready(function() {
//         $('.button-collapse').sideNav('show', {
//             menuWidth: 300, // Default is 300
//             edge: 'left', // Choose the horizontal origin
//             closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
//             draggable: true, // Choose whether you can drag to open on touch screens,
//             onOpen: function(el) { /* Do Stuff*/ }, // A function to be called when sideNav is opened
//             onClose: function(el) { /* Do Stuff*/ }, // A function to be called when sideNav is closed
//         }, 1000);
//         $('.parallax').parallax();
//     });
// }

// function waitForSideNav() {
//     if (typeof$(".button-collapse").sideNav !== 'undefined' && $.isFunction($(".button-collapse").sideNav)) {
//         $(".button-collapse").sideNav();
//     } else {
//         setTimeout(this.waitForSideNav, 100);
//     }
// }

// waitForSideNav();

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });

  // Initialize collapsible (uncomment the lines below if you use the dropdown variation)
  // var collapsibleElem = document.querySelector('.collapsible');
  // var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);

  // Or with jQuery

  $(document).ready(function(){
    $('.sidenav').sidenav();
  });