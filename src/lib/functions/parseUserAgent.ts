export function parseUserAgent(userAgent: string) {
    if (/android/i.test(userAgent)) return 'Android';
    if (/iphone/i.test(userAgent)) return 'iPhone';
    if (/ipad/i.test(userAgent)) return 'iPad';
    if (/ipod/i.test(userAgent)) return 'iPod';
    if (/windows phone/i.test(userAgent)) return 'Windows phone';
    if (/windows/i.test(userAgent)) return 'Windows';
    if (/macintosh/i.test(userAgent)) return 'Mac';
    if (/linux/i.test(userAgent)) return 'linux';
    if (/cros/i.test(userAgent)) return 'Chrome os';
    if (/playstation/i.test(userAgent)) return 'PlayStation';
    else return 'unknown';
}