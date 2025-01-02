import { LitElement, html } from "lit";

import { TailwindMixin } from "./shared-styles.js";

class MainApp extends TailwindMixin(LitElement) {
  override render() {
    return html`TODO`;
  }
}
customElements.define("main-app", MainApp);
