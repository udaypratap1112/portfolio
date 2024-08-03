function disableScroll() {
    // Get the current page scroll position
    scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop;
    scrollLeft =
        window.scrollX ||
        document.documentElement.scrollLeft,

        // if any scroll is attempted,
        // set this to the previous value
        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
        };
}
  disableScroll()
 setTimeout(() => {
    window.onscroll = function () { };
 }, 2000);