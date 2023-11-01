import './assets/style.css'
import Dialog from '@/dialog';

/**
 * Setting interface in element
 * @class
 * @container {HTMLElement} the element that will append modals
 * @activator {HTMLelement} clicked open dialog
 * @content {string} HTML or texto to be used as dialog content
 */
class DialogActions {
  setView(container, activator, content) {
    new Dialog(container, activator, content);
  }
}

export default new DialogActions();
