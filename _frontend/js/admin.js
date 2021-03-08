// import polyfills
import 'mdn-polyfills/CustomEvent';

// import utilities.
import './widget/utils/flash';
import './widget/utils/urlMender';
import './widget/utils/setCustomEvents';
import './widget/utils/useDeviceObserver';

// import widgets.
import associateHidden from './widget/associateHidden';
import checkAll from './widget/checkAll';
import copySource from './widget/copySource';
import drawer from './widget/drawer';
import dropUploader from './widget/dropUploader';
import editorTool from './widget/editorTool';
import follow from './widget/follow';
import formValidation from './widget/formValidation';
import inputFilePreview from './widget/inputFilePreview';
import linkageSelectValue from './widget/linkageSelectValue';
import modal from './widget/modal';
import smoothScroll from './widget/smoothScroll';
import tab from './widget/tab';
import tagCategoryHelper from './widget/tagCategoryHelper';
import toggle from './widget/toggle';
import toggleMenu from './widget/toggleMenu';
import toggleUserMenu from './widget/toggleUserMenu';

(() => {
    associateHidden();
    checkAll();
    copySource();
    drawer();
    dropUploader();
    editorTool();
    follow();
    formValidation();
    inputFilePreview();
    linkageSelectValue();
    modal();
    smoothScroll();
    tab();
    tagCategoryHelper();
    toggle();
    toggleMenu();
    toggleUserMenu();
})();
