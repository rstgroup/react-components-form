import { BehaviorSubject } from "rxjs";

class FormController {
  form = undefined;
  initialized = false;
  model$ = new BehaviorSubject();
  errors$ = new BehaviorSubject();

  init(form) {
    this.form = form;
    this.initialized = true;
  }

  hasError() {
    const errors = this.errors$.getValue();
    return typeof errors === "object" && Object.keys(errors).length > 0;
  }
}

export default FormController;
