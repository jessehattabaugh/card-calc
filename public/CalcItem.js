export class CalcItem extends HTMLElement {
	capacity = 0;
	price = 0;

	constructor() {
		super();

		// create shadow DOM
		const shadow = this.attachShadow({ mode: 'open' });
		shadow.innerHTML = /*html*/ `	<style>
			label {
				display: block;
			}
			output {
				border: 1px inset;
				display: inline-block;
				width: 10em;
				height: 1em;
			}
		</style>
		<calc-field data-property="capacity"></calc-field>
		<calc-field data-property="price"></calc-field>
		<label>$ per GB<output></output></label>`;
		this.output = shadow.querySelector('output');

		// listen for calc-field-input events
		this.addEventListener('calc-field-input', this.computeOutput.bind(this));
	}

	connectedCallback() {
		// initialize from attrs
		this.capacity = this.getAttribute('data-capacity');
		this.price = this.getAttribute('data-price');
		this.shadowRoot
			.querySelector('calc-field[data-property="capacity"]')
			.setAttribute('data-value', this.capacity);
		this.shadowRoot
			.querySelector('calc-field[data-property="price"]')
			.setAttribute('data-value', this.price);
		this.computeOutput();
	}

	computeOutput(event) {
		if (event) {
			// store the value from the field
			const { detail } = event;
			const { property, value } = detail;
			this[property] = value;
			console.debug('CalcItem.computeOutput stored values', { detail, property });
		}

		// update the output element
		const { capacity, price } = this;
		if (capacity && price) {
			this.output.textContent = price / capacity;
		}

		console.log('CalcItem.computeOutput', { capacity, price });
	}
}
