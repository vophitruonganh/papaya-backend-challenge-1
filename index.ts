require('dotenv').config();

import {S3} from 'aws-sdk';
import sharp from 'sharp';

const s3: S3 = new S3();
const bucketName: string = process.env.BUCKET_NAME as string;

const getImage = async (event: EventDto): Promise<any> => {
	try {
		// parse params
		const imageKey: string | undefined = event?.pathParameters?.imageName;
		if (!imageKey) return {statusCode: 400, body: 'Image name is required'};

		const [_, imageExtension] = imageKey.split('.');

		if (imageExtension !== 'jpg' && imageExtension !== 'jpeg' && imageExtension !== 'png')
			return {statusCode: 400, body: 'Image extension not supported'};

		const queryStringParameters: { width: string, height: string, v: string } = event?.queryStringParameters;
		const width: number = parseInt(queryStringParameters?.width);
		const height: number = parseInt(queryStringParameters?.height);

		// get images from S3
		let imageBuffer: Buffer = await getFileS3(bucketName, imageKey);

		// Validate image exists
		if (!imageBuffer) return {statusCode: 404, body: 'Image not found'};

		// Resize image
		if (width) imageBuffer = await resizeImage(imageBuffer, width, height);

		return {
		};
	} catch (error) {
		console.error('Error', error);
		return {
			statusCode: 500,
			body: JSON.stringify(error)
		};
	}
};

const getFileS3 = async (bucketName: string, key: string): Promise<Buffer> => {
	const data: any = await s3.getObject({Bucket: bucketName, Key: key}).promise();
	return data?.Body as Buffer;
}

const resizeImage = async (imageBuffer: Buffer, width: number, height: number): Promise<Buffer> => {
	let resizeOptions: sharp.ResizeOptions = {width: width};

	if (height) resizeOptions.height = height;
	else resizeOptions.fit = sharp.fit.contain;
	return sharp(imageBuffer)
		.resize(resizeOptions)
		.toBuffer();
}

exports.handler = getImage
