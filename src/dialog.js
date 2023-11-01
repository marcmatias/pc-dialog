import { biXLg, biArrowLeft } from './icons';

/**
 * Generate modals with content and interactions
 * @class
 */
class Dialog {
  /**
   * @constructs Dialog
   * @container {HTMLElement} the element that will append modals
   * @activator {HTMLelement} clicked open dialog
   * @content {string} HTML or texto to be used as dialog content
   */
  constructor(container, activator, content) {
    this.container = container;
    this.activator = activator;
    this.content = content;

    this.setup();
  }

  setup() {
    if (!this.content) {
      return;
    }

    this.render();
    this.dialogElement.addEventListener('click', () => {
      const rect = this.dialogElement.getBoundingClientRect();
      let isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      if (!isInDialog) {
        this.close();
      }
    });
    // Element clicked opens the <dialog> modal
    if (this.activator) {
      this.activator.addEventListener('click', () => {
        this.show();
      });
    }
  }

  close() {
    this.dialogElement.close();
  }

  setContent(content) {
    // Remove last dialog
    if (this.dialogElement) {
      this.dialogElement.remove();
    }

    // Update content
    this.content = content;
    // Set new dialog
    this.setup();
  }

  setContentAndShow(content, backButtonCallback) {
    this.backButtonCallback = backButtonCallback ? backButtonCallback : undefined;

    this.setContent(content);

    // Display dialog
    this.show();
    this.dialogElement.querySelector('.dialog-content').scrollTo(0, 0);
  }

  show() {
    this.dialogElement.showModal();
  }

  render() {
    const self = this;
    const dialog = document.createElement('dialog');
    dialog.classList.add("d-dialog");
    dialog.innerHTML = `
      <form class="dialog-controls" method="dialog">
        ${this.backButtonCallback ? `
          <button class="dialog-control-button dialog-back">${biArrowLeft}</button>
        ` : ''}
        <button class="dialog-control-button" formmethod="dialog">${biXLg}</button>
      </form>
      <article class="dialog-content scrollbar" tabindex="-1">
        ${this.content}
      </article>`;
    this.container.appendChild(dialog);

    if (this.backButtonCallback) {
      this.container.querySelector(".dialog-back").addEventListener("click", (event) => {
        event.preventDefault();
        self.close();
        self.backButtonCallback();
      })
    }

    this.dialogElement = dialog;
  }
}

export default Dialog;
