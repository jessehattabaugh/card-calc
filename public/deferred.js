import { CalcField } from './CalcField.js';
import { CalcItem } from './CalcItem.js';

customElements.define('calc-field', CalcField);
customElements.define('calc-item', CalcItem);

// populate main with a 1000 <calc-item> elements
const main = document.querySelector('main');
for (let i = 0; i < 1000; i++) {
	const element = document.createElement('calc-item');
	element.setAttribute('data-capacity', i);
	element.setAttribute('data-price', i);
	main.appendChild(element);
}
