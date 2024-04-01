export class CalcItem extends HTMLElement {
	capacity = 0;
	price = 0;

	constructor() {
		super();
		const shadow = this.attachShadow({ mode: 'open' });
		shadow.innerHTML = /*html*/ `
		<calc-field data-property="capacity"></calc-field>
		<calc-field data-property="price"></calc-field>
		<label>$ per GB<output></output></label>`;
		this.output = shadow.querySelector('output');
		this.addEventListener('calc-field-input', this.computeOutput.bind(this));
	}

	computeOutput(event) {
		// store the value from the field
		const { detail } = event;
		const { property, value } = detail;
		this[property] = value;

		// update the output element
		const { capacity, price } = this;
		if (capacity && price) {
			this.output.textContent = price / capacity;
		}

		console.debug('CalcItem.computeOutput', { capacity, detail, price, property });
	}
}
