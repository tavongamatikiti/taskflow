class Modal {
  constructor() {
    this._modal = document.querySelector(".modal");
    this._modalBtn = document.querySelector(".add-btn");
    this._modalClose = document.querySelectorAll(".modal-close");
    this.addEventListeners();
  }

  addEventListeners() {
    this._modalBtn.addEventListener("click", this.open.bind(this));
    window.addEventListener("click", this.closeBtn.bind(this));
  }

  open() {
    this._modal.style.display = "flex";
  }

  close() {
    this._modal.style.display = "none";
  }

  closeBtn(e) {
    if (e.target === this._modal) {
      this.close();
    }
  }
}

export default Modal;
