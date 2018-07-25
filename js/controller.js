export default class Controller {

	constructor() {
		this.animAmt = 0;
	}

	update(dt) {
		const period = 2;
		this.animAmt += dt / peroid;
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

				context.beginPath();
				context.strokeStyle = 'black';
				context.arc(
					x * spacing,
					y * spacing,
					paddingAmt * spacing / 2,
					0, 2 * Math.PI
				)
				context.stroke();

			}
		}
	}

}
