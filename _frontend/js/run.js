import {setCustomEvents, useDeviceObserver} from './utils/global';
import toggle from './widget/toggle';
import toggleMenu from './widget/toggleMenu';
import follow from './widget/follow';
import smoothScroll from './widget/smoothScroll';

(() => {
    setCustomEvents();
    useDeviceObserver();
    toggle();
    toggleMenu();
    follow();
    smoothScroll();
})();
