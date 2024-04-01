export class CalcField extends HTMLElement {
	constructor() {
		super();
		const { property } = this.dataset;
		const shadow = this.attachShadow({ mode: 'open' });
		shadow.innerHTML = /*html*/ `
		<label>${property}: <input type="number" /></label>`;
		shadow.querySelector('input').addEventListener('input', this.handleInput.bind(this));
	}

	handleInput(event) {
		const { value } = event.target;
		const { property } = this.dataset;
		console.debug(`CalcField.handleInput`, { event, property, value });
		this.dispatchEvent(
			new CustomEvent(`calc-field-input`, {
				bubbles: true,
				composed: true,
				detail: { property, value },
			}),
		);
	}
}
