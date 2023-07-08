import * as tf from '@tensorflow/tfjs';

const IMAGE_SIZE = 784;
const NUM_CLASSES = 10;
const NUM_DATASET_ELEMENTS = 65000;

const TRAIN_TEST_RATIO = 5 / 6;

const NUM_TRAIN_ELEMENTS = Math.floor(TRAIN_TEST_RATIO * NUM_DATASET_ELEMENTS);
const NUM_TEST_ELEMENTS = NUM_DATASET_ELEMENTS - NUM_TRAIN_ELEMENTS;

const MNIST_IMAGES_SPRITE_PATH =
	'https://storage.googleapis.com/learnjs-data/model-builder/mnist_images.png';
const MNIST_LABELS_PATH =
	'https://storage.googleapis.com/learnjs-data/model-builder/mnist_labels_uint8';

export class MnistData {
	shuffledTrainIndex = 0;
	shuffledTestIndex = 0;

	datasetImages: Float32Array | null = null;
	get trainImages() {
		if (!this.datasetImages) throw new Error('Dataset not loaded');
		return this.datasetImages.slice(0, IMAGE_SIZE * NUM_TRAIN_ELEMENTS);
	}
	get testImages() {
		if (!this.datasetImages) throw new Error('Dataset not loaded');
		return this.datasetImages.slice(IMAGE_SIZE * NUM_TRAIN_ELEMENTS);
	}

	datasetLabels: Uint8Array | null = null;
	get trainLabels() {
		if (!this.datasetLabels) throw new Error('Dataset not loaded');
		return this.datasetLabels.slice(0, NUM_CLASSES * NUM_TRAIN_ELEMENTS);
	}
	get testLabels() {
		if (!this.datasetLabels) throw new Error('Dataset not loaded');
		return this.datasetLabels.slice(NUM_CLASSES * NUM_TRAIN_ELEMENTS);
	}

	trainIndices = tf.util.createShuffledIndices(NUM_TRAIN_ELEMENTS);
	#trainIndex = 0;
	get shuffleTrainIndex() {
		this.#trainIndex = (this.#trainIndex + 1) % this.trainIndices.length;
		return this.trainIndices[this.#trainIndex];
	}

	testIndices = tf.util.createShuffledIndices(NUM_TEST_ELEMENTS);
	#testIndex = 0;
	get shuffleTestIndex() {
		this.#testIndex = (this.#testIndex + 1) % this.testIndices.length;
		return this.testIndices[this.#testIndex];
	}

	#imgs = new Promise((resolve) => {
		const img = new Image();
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		img.crossOrigin = '';
		img.onload = () => {
			img.width = img.naturalWidth;
			img.height = img.naturalHeight;

			const datasetBytesBuffer = new ArrayBuffer(NUM_DATASET_ELEMENTS * IMAGE_SIZE * 4);
			const chunkSize = 5000;
			canvas.width = img.width;
			canvas.height = chunkSize;

			for (let i = 0; i < NUM_DATASET_ELEMENTS / chunkSize; i++) {
				const datasetBytesView = new Float32Array(
					datasetBytesBuffer,
					i * IMAGE_SIZE * chunkSize * 4,
					IMAGE_SIZE * chunkSize
				);
				ctx.drawImage(img, 0, i * chunkSize, img.width, chunkSize, 0, 0, img.width, chunkSize);
				const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

				for (let j = 0; j < imageData.data.length / 4; j++) {
					datasetBytesView[j] = imageData.data[j * 4] / 255;
				}
			}

			this.datasetImages = new Float32Array(datasetBytesBuffer);
			resolve(undefined);
		};
		img.src = MNIST_IMAGES_SPRITE_PATH;
	});
	#labels = new Promise((resolve) => {
		const load = async () => {
			const labelsResponse = await fetch(MNIST_LABELS_PATH);
			this.datasetLabels = new Uint8Array(await labelsResponse.arrayBuffer());
		};
		load().then(resolve);
	});

	async load() {
		await Promise.all([this.#imgs, this.#labels]);
	}

	nextBatch(batchSize: number, data: [Float32Array, Uint8Array], index: () => number) {
		const batchImagesArray = new Float32Array(batchSize * IMAGE_SIZE);
		const batchLabelsArray = new Uint8Array(batchSize * NUM_CLASSES);

		for (let i = 0; i < batchSize; i++) {
			const idx = index();
			const image = data[0].slice(idx * IMAGE_SIZE, idx * IMAGE_SIZE + IMAGE_SIZE);
			batchImagesArray.set(image, i * IMAGE_SIZE);

			const label = data[1].slice(idx * NUM_CLASSES, idx * NUM_CLASSES + NUM_CLASSES);
			batchLabelsArray.set(label, i * NUM_CLASSES);
		}

		const xs = tf.tensor2d(batchImagesArray, [batchSize, IMAGE_SIZE]);
		const labels = tf.tensor2d(batchLabelsArray, [batchSize, NUM_CLASSES]);

		return { xs, labels };
	}

	nextTrainBatch(batchSize: number) {
		const batch = this.nextBatch(
			batchSize,
			[this.trainImages, this.trainLabels],
			() => this.shuffleTrainIndex
		);
		return batch;
	}

	nextTestBatch(batchSize: number) {
		const batch = this.nextBatch(
			batchSize,
			[this.testImages, this.testLabels],
			() => this.shuffleTestIndex
		);
		return batch;
	}
}
