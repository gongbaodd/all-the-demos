<script lang="ts">
	import { Sequential, browser, layers, sequential, tidy, train, Tensor, Rank, type Tensor1D } from '@tensorflow/tfjs';
	import { MnistData } from '../helpers/data';
	/**
	async function calc() {
		const model = sequential();
		model.add(
			layers.dense({
				units: 100,
				activation: 'relu',
				inputShape: [10]
			})
		);
		model.add(
			layers.dense({
				units: 1,
				activation: 'linear'
			})
		);
		model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

		const xs = randomNormal([100, 10]);
		const ys = randomNormal([100, 1]);

		const res = await model.fit(xs, ys, {
			epochs: 100,
			callbacks: {
				onEpochEnd: (epoch, log) => console.log(`Epoch ${epoch}: loss = ${log?.loss}`)
			}
		});
		// const res = model.predict(tf.tensor2d([5], [1, 1])) as tf.Tensor<tf.Rank>;
		// res.print();
	}
*/

	const IMAGE_WIDTH = 28;
	const IMAGE_HEIGHT = 28;
	const IMAGE_CHANNELS = 1;

	const NUM_OUTPUT_CLASSES = 10;

	const BATCH_SIZE = 512;
	const TRAIN_DATA_SIZE = 5500;
	const TEST_DATA_SIZE = 1000;

	let container: HTMLElement;

	async function run() {
		const tfvis = await import('@tensorflow/tfjs-vis');
		const data = new MnistData();
		await data.load();
		// await showExample(data);

		const model = getModel();
		tfvis.show.modelSummary({ name: 'Model Architecture' }, model);
		await trainModel(model, data);
	}

	async function showExample(data: MnistData) {
		const examples = data.nextTestBatch(20);
		const numExamples = examples.xs.shape[0];

		for (let i = 0; i < numExamples; i++) {
			const imageTensor = tidy(() =>
				examples.xs
					.slice([i, 0], [1, examples.xs.shape[1]])
					.reshape([IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS])
			);
			const canvas = document.createElement('canvas');
			canvas.width = 28;
			canvas.height = 28;

			await browser.toPixels(imageTensor as any, canvas);
			container.appendChild(canvas);
			imageTensor.dispose();
		}
	}

	function getModel() {
		const model = sequential();
		model.add(
			layers.conv2d({
				inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
				kernelSize: 5,
				filters: 8,
				strides: 1,
				activation: 'relu',
				kernelInitializer: 'varianceScaling'
			})
		);

		model.add(layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }));

		model.add(
			layers.conv2d({
				kernelSize: 5,
				filters: 16,
				strides: 1,
				activation: 'relu',
				kernelInitializer: 'varianceScaling'
			})
		);

		model.add(layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }));

		model.add(layers.flatten());

		model.add(
			layers.dense({
				units: NUM_OUTPUT_CLASSES,
				kernelInitializer: 'varianceScaling',
				activation: 'softmax'
			})
		);

		const optimizer = train.adam();
		model.compile({
			optimizer,
			loss: 'categoricalCrossentropy',
			metrics: ['accuracy']
		});

		return model;
	}

	async function trainModel(model: Sequential, data: MnistData) {
		const tfvis = await import('@tensorflow/tfjs-vis');

		const [trainXs, trainYs] = tidy(() => {
			const { xs, labels } = data.nextTrainBatch(TRAIN_DATA_SIZE);
			return [xs.reshape([TRAIN_DATA_SIZE, IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS]), labels];
		});
		const [testXs, testYs] = tidy(() => {
			const { xs, labels } = data.nextTestBatch(TEST_DATA_SIZE);
			return [xs.reshape([TEST_DATA_SIZE, IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS]), labels];
		});

		const metrics = ['loss', 'val_loss', 'acc', 'val_acc'];
		const container = {
			name: 'Model Training',
			tab: 'Model',
			styles: { height: '1000px' }
		};
		const fitCallbacks = tfvis.show.fitCallbacks(container, metrics);

		const result = await model.fit(trainXs, trainYs, {
			batchSize: BATCH_SIZE,
			validationData: [testXs, testYs],
			epochs: 10,
			shuffle: true,
			callbacks: fitCallbacks
		});

		return result;
	}

	const classNames = [
		'Zero',
		'One',
		'Two',
		'Three',
		'Four',
		'Five',
		'Six',
		'Seven',
		'Eight',
		'Nine'
	];

	function doPrediction(model: Sequential, data: MnistData, testDataSize = 500): Tensor1D[]{
		const IMAGE_WIDTH = 28;
		const IMAGE_HEIGHT = 28;
		const testData = data.nextTestBatch(testDataSize);
		const testxs = testData.xs.reshape([testDataSize, IMAGE_WIDTH, IMAGE_HEIGHT, 1]);
		const labels = testData.labels.argMax(-1) as Tensor1D;
		const preds = (model.predict(testxs) as Tensor<Rank>).argMax(-1) as Tensor1D; 

		testxs.dispose();
		return [preds, labels];
	}

	async function showAccuracy(model: Sequential, data: MnistData) {
		const tfvis = await import('@tensorflow/tfjs-vis');

		const [preds, labels] = doPrediction(model, data);
		const classAccuracy = await tfvis.metrics.perClassAccuracy(labels, preds);
		const container = { name: 'Accuracy', tab: 'Evaluation' };
		tfvis.show.perClassAccuracy(container, classAccuracy, classNames);

		labels.dispose();
	}

	async function showConfusion(model: Sequential, data: MnistData) {
		const tfvis = await import('@tensorflow/tfjs-vis');

		const [preds, labels] = doPrediction(model, data);
		const confusionMatrix = await tfvis.metrics.confusionMatrix(labels, preds);
		const container = { name: 'Confusion Matrix', tab: 'Evaluation' };
		tfvis.render.confusionMatrix(container, { values: confusionMatrix, tickLabels: classNames });

		labels.dispose();
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section bind:this={container}>
	<button on:click={run}> click! </button>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
