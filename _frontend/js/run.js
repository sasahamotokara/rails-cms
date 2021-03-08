// import polyfills
import 'mdn-polyfills/CustomEvent';

// import utilities.
import './widget/utils/setCustomEvents';
import './widget/utils/useDeviceObserver';

// import widgets.
import follow from './widget/follow';
import smoothScroll from './widget/smoothScroll';
import toggle from './widget/toggle';
import toggleMenu from './widget/toggleMenu';

(() => {
    follow();
    smoothScroll();
    toggle();
    toggleMenu();
})();
