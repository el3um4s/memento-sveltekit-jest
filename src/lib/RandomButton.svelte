<script lang="ts">
	export let value: number = 0;

	let randomValue: number = 0;

	function getRandomInt(min: number, max: number) {
		const positive = Math.random() > 0.5 ? 1 : -1;
		return positive * Math.floor(Math.random() * (max - min) + min);
	}

	function addRandomNumber() {
		randomValue = 0;
		randomValue = getRandomInt(1, 100);
		value += randomValue;
	}
</script>

<section>
	<button class="blue" on:click={addRandomNumber}>Click Me!</button>
	<div data-testid="value" class="{value < 0 ? 'red' : 'green'} value">{value}</div>
	<div data-testid="random-value" class="hidden">{randomValue}</div>
</section>

<style>
	* {
		font-size: larger;
		margin: 8px;
		padding: 8px;
		border-radius: 4px;
		color: #f0f0f0;
	}

	section {
		border: 1px solid darkgray;
		background-color: rgb(250, 250, 250);
		display: flex;
		flex-direction: row;
		align-items: baseline;
	}

	.value {
		flex-grow: 2;
	}

	.red {
		background-color: #ec4343;
		border: 1px solid #9d1d1d;
	}

	.green {
		background-color: #5fac5f;
		border: 1px solid #417741;
	}

	.blue {
		background-color: #427999;
		border: none;
		border-radius: 8px;
	}

	.hidden {
		display: none;
	}
</style>
