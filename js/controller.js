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
		const maxDist = 3;
		const spacing = 500 / (2 * maxDist + 1);
		const paddingAmt = 0.8;

		for (let x = -maxDist; x <= maxDist; x ++) {

			for (let y = -maxDist; y <= maxDist; y ++) {

				this.renderSpiral(
					context,
					x * spacing,
					y * spacing,
					paddingAmt * spacing / 2,
					x, y,
					this.animAmt
				)
			}
		}
	}

	/**
	 * @param {CanvasRenderingContext2D} context 
	 */
	renderSpiral(context, x, y, radius, xFreq, yFreq, animAmt) {
		context.beginPath();
		context.strokeStyle = 'black';
		context.lineWidth = 2;

		const numPoints = 50;
		for (let i = 0; i < numPoints; i ++) {
			const amt = i / numPoints;
			const xAmt = this.getXAmt(xFreq, amt);
			const yAmt = this.getYAmt(yFreq, amt);
			context.lineTo(
				x + radius * xAmt,
				y + radius * yAmt,
			)
		}
		context.closePath();
		context.stroke();

		const xAmt = this.getXAmt(xFreq, animAmt);
		const yAmt = this.getYAmt(yFreq, animAmt);
		context.beginPath();
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
