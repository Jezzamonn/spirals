import { slurp } from './util.js'

function rgb(r, g, b) {
	return 'rgb('+r+','+g+','+b+')';
}

function grey(amt) {
	const whiteAmount = Math.floor(255 * amt);
	return rgb(whiteAmount, whiteAmount, whiteAmount);
}

export default class Controller {

	constructor() {
		this.animAmt = 0;
	}

	update(dt) {
		const period = 2;
		this.animAmt += dt / period;
	}

	/**
	 * @param {CanvasRenderingContext2D} context 
	 */
	render(context) {
		const numSpirals = 5;
		const width = 500;
		const spacing = width / numSpirals;
		const maxDist = (numSpirals - 1) / 2;
		const paddingAmt = 0.8;

		for (let x = -maxDist; x <= maxDist; x ++) {

			for (let y = -maxDist; y <= maxDist; y ++) {

				this.renderSpiral(
					context,
					x * spacing,
					y * spacing,
					paddingAmt * spacing / 2,
					x + maxDist + 1,
					y + maxDist + 1,
					this.animAmt
				)
			}
		}
	}

	/**
	 * @param {CanvasRenderingContext2D} context 
	 */
	renderSpiral(context, x, y, radius, xFreq, yFreq, animAmt) {

		const numPoints = 100;
		for (let i = numPoints - 1; i >= 0; i --) {
			const amt = i / numPoints;
			const antiAmt = 1 - amt;
			const nextAmt = (i + 1) / numPoints;

			context.beginPath();
			context.strokeStyle = grey(1 - antiAmt * antiAmt);
			context.lineWidth = 2;
			context.moveTo(
				x + radius * this.getXAmt(xFreq, animAmt - amt),
				y + radius * this.getYAmt(yFreq, animAmt - amt)			
			)
			context.lineTo(
				x + radius * this.getXAmt(xFreq, animAmt - nextAmt),
				y + radius * this.getYAmt(yFreq, animAmt - nextAmt)				
			)
			context.stroke();
		}

		const xAmt = this.getXAmt(xFreq, animAmt);
		const yAmt = this.getYAmt(yFreq, animAmt);
		context.beginPath();
		context.strokeStyle = 'black';
		context.lineWidth = 2;
		context.arc(
			x + radius * xAmt,
			y + radius * yAmt,
			3,
			0, 2 * Math.PI);
		context.stroke();
	}
	
	getXAmt(freq, amt) {
		return this.getYAmt(freq, amt + 0.25);
		if (freq == 0) {
			return 0;
		}
		let xAmt = Math.sin(2 * Math.PI * freq * amt);
		if (freq < 0) {
			return -xAmt;
		}
		return xAmt;
	}

	getYAmt(freq, amt) {
		return Math.sin(2 * Math.PI * freq * amt)
	}

}
