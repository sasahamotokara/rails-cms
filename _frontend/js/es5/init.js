(function (window, document) {
    const HTML_ELEMENT = document.documentElement;
    const applyViewportHeight = function () {
        HTML_ELEMENT.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };

    window.addEventListener('resizeEnd', applyViewportHeight);

    HTML_ELEMENT.dataset.scriptEnabled = 'true';
    applyViewportHeight();
}(window, window.document));
