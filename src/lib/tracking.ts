// Helper to extract UTMs and query params
export function getTrackingParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  const searchParams = new URLSearchParams(window.location.search);
  const params: Record<string, string> = {};

  const trackKeys = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'fbclid',
    'gclid',
  ];

  trackKeys.forEach((key) => {
    const val = searchParams.get(key);
    if (val) params[key] = val;
  });

  // Extract Facebook cookies if present
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [name, val] = cookie.trim().split('=');
    acc[name] = val;
    return acc;
  }, {} as Record<string, string>);

  if (cookies['_fbc']) params['fbc'] = cookies['_fbc'];
  if (cookies['_fbp']) params['fbp'] = cookies['_fbp'];

  params['pageUrl'] = window.location.href;

  return params;
}

// Custom event dispatcher (Pixel / GTM mock/real compatible)
export function trackEvent(eventName: string, data?: Record<string, any>) {
  if (typeof window === 'undefined') return;

  const eventPayload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...data,
  };

  console.log(`[Tracking Event] ${eventName}:`, eventPayload);

  // Push to dataLayer if present
  const win = window as any;
  if (win.dataLayer && Array.isArray(win.dataLayer)) {
    win.dataLayer.push(eventPayload);
  }

  // Push to fbq if present
  if (typeof win.fbq === 'function') {
    win.fbq('trackCustom', eventName, data);
  }
}
