require('dotenv').config();

import {S3} from 'aws-sdk';
import sharp from 'sharp';

const s3: S3 = new S3();
const bucketName: string = process.env.BUCKET_NAME as string;

const getImage = async (event: EventDto): Promise<any> => {
	try {
		// parse params

		// get images from S3

		// Validate image exists

		// Resize image

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

exports.handler = getImage
