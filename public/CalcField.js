export class CalcField extends HTMLElement {
	constructor() {
		super();


		// create shadow DOM
		const shadow = this.attachShadow({ mode: 'open' });
		shadow.innerHTML = /*html*/ `
		<style>
			label {
				display: block;
			}
		</style>
		<label>${property}: <input type="number" value="${value}" /></label>`;

		// listen for input events
		shadow.querySelector('input').addEventListener('input', this.handleInput.bind(this));
	}

	connectedCallback() {
		// initialize from attrs
		const { property, value } = this.dataset;
		
		console.log(`CalcField.connectedCallback`);
	}

	handleInput(event) {
		const { value } = event.target;
		const { property } = this.dataset;
		console.log(`CalcField.handleInput`, { event, property, value });
		this.dispatchEvent(
			new CustomEvent(`calc-field-input`, {
				bubbles: true,
				composed: true,
				detail: { property, value },
			}),
		);
	}
}
