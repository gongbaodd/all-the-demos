import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("simple-counter")
class Counter extends LitElement {
  @state() count = 0;

  private increminate() {
    this.count++;
  }

  private decrement() {
    this.count--;
  }

  render() {
    return html`
      <div>
        <button type=button @click=${this.increminate}>+</button>
        <span>${this.count}</span>
        <button type=button @click=${this.decrement}>-</button>
      </div>
    `;
  }
}

export default Counter;

declare global {
  interface HTMLElementTagNameMap {
    "simple-counter": Counter;
  }
}
