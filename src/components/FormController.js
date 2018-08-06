import { BehaviorSubject } from "rxjs";

class FormController {
  form = undefined;
  initialized = false;
  model$ = new BehaviorSubject();

  init(form) {
    this.form = form;
    this.initialized = true;
  }
}

export default FormController;
