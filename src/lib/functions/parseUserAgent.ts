import type { Device } from '$lib/types';

const deviceMap = {
	android: { name: 'Android', type: 'mobile' },
	iphone: { name: 'iPhone', type: 'mobile' },
	ipad: { name: 'iPad', type: 'mobile' },
	ipod: { name: 'iPod', type: 'mobile' },
	'windows phone': { name: 'Windows Phone', type: 'mobile' },
	windows: { name: 'Windows', type: 'desktop' },
	macintosh: { name: 'Macintosh', type: 'desktop' },
	linux: { name: 'Linux', type: 'desktop' },
	cros: { name: 'Chrome OS', type: 'desktop' },
	playstation: { name: 'PlayStation', type: 'console' }
};
export function parseUserAgent(userAgent: string): Device {
	const lowerCaseUserAgent = userAgent.toLowerCase();
	const matchedDevice = Object.entries(deviceMap).find(([device]) =>
		lowerCaseUserAgent.includes(device)
	);
	return matchedDevice
		? { name: matchedDevice[1].name, type: matchedDevice[1].type }
		: { name: 'Unknown', type: 'other' };
}
