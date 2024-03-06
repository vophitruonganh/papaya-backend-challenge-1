import {default as getImage} from './index';
import {describe, expect, test} from "@jest/globals"

describe('Get image', () => {
	test('Not found image', async () => {
		const data = await getImage({pathParameters: {imageName: 'test.jpg'}, queryStringParameters: {width: '100', height: '100', v: '1'}})
		expect(data.statusCode).toBe(500);
	})

	test('Get image success', async () => {
		const data = await getImage({pathParameters: {imageName: 'avatar.jpg'}, queryStringParameters: {width: '100', height: '100', v: '1'}})
		expect(data.statusCode).toBe(200);
	})
})
