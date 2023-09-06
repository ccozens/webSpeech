import type { Device } from '$lib/types';
export function parseUserAgent(userAgent: string): Device {
	if (/android/i.test(userAgent)) return { name: 'Android', type: 'mobile' };
	if (/iphone/i.test(userAgent)) return { name: 'iPhone', type: 'mobile' };
	if (/ipad/i.test(userAgent)) return { name: 'iPad', type: 'mobile' };
	if (/ipod/i.test(userAgent)) return { name: 'iPod', type: 'mobile' };
	if (/windows phone/i.test(userAgent)) return { name: 'Windows Phone', type: 'mobile' };
	if (/windows/i.test(userAgent)) return { name: 'Windows', type: 'desktop' };
	if (/macintosh/i.test(userAgent)) return { name: 'Macintosh', type: 'desktop' };
	if (/linux/i.test(userAgent)) return { name: 'Linux', type: 'desktop' };
	if (/cros/i.test(userAgent)) return { name: 'Chrome OS', type: 'desktop' };
	if (/playstation/i.test(userAgent)) return { name: 'PlayStation', type: 'console' };
	else return { name: 'Unknown', type: 'unknown'};
}
