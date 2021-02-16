(function (window, document) {
    const HTML_ELEMENT = document.documentElement;
    const isIE11 = 'uniqueID' in document;
    const applyViewportHeight = function () {
        HTML_ELEMENT.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };

    if (isIE11) {
        HTML_ELEMENT.classList.add('ie11');
    }

    window.addEventListener('resize', applyViewportHeight);

    HTML_ELEMENT.dataset.scriptEnabled = 'true';
    applyViewportHeight();
}(window, window.document));
