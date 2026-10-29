// Helper to extract UTMs and Meta Ads query params with storage persistence
export function getTrackingParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  const searchParams = new URLSearchParams(window.location.search);
  const params: Record<string, string> = {};

  // List of all Meta Ads and UTM tracking keys
  const trackKeys = [
    // Meta Ads specific dynamic parameters
    'campaign_id',
    'adset_id',
    'ad_id',
    'campaign_name',
    'adset_name',
    'ad_name',
    'placement',
    'site_source_name',
    // Variations used by ad managers
    'hsa_cam',
    'hsa_grp',
    'hsa_ad',
    'utm_campaign_id',
    'utm_adset_id',
    'utm_ad_id',
    // Standard UTMs
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    // Click IDs
    'fbclid',
    'gclid',
  ];

  // 1. Check current URL query string
  trackKeys.forEach((key) => {
    const val = searchParams.get(key);
    if (val) {
      params[key] = val;
      // Persist to sessionStorage so navigation doesn't lose it
      try {
        sessionStorage.setItem(`track_${key}`, val);
      } catch (e) {}
    } else {
      // Fallback from sessionStorage if user navigated internally
      try {
        const stored = sessionStorage.getItem(`track_${key}`);
        if (stored) params[key] = stored;
      } catch (e) {}
    }
  });

  // Normalize Meta Ads IDs if aliases were used
  if (!params['campaign_id']) {
    params['campaign_id'] = params['hsa_cam'] || params['utm_campaign_id'] || '';
  }
  if (!params['adset_id']) {
    params['adset_id'] = params['hsa_grp'] || params['utm_adset_id'] || '';
  }
  if (!params['ad_id']) {
    params['ad_id'] = params['hsa_ad'] || params['utm_ad_id'] || '';
  }

  // Fallback campaign_name from utm_campaign
  if (!params['campaign_name'] && params['utm_campaign']) {
    params['campaign_name'] = params['utm_campaign'];
  }
  if (!params['ad_name'] && params['utm_content']) {
    params['ad_name'] = params['utm_content'];
  }

  // 2. Extract Facebook Cookies (_fbc, _fbp)
  try {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [name, val] = cookie.trim().split('=');
      acc[name] = val;
      return acc;
    }, {} as Record<string, string>);

    if (cookies['_fbc']) params['fbc'] = cookies['_fbc'];
    if (cookies['_fbp']) params['fbp'] = cookies['_fbp'];
  } catch (e) {}

  params['pageUrl'] = window.location.href;
  params['referrer'] = document.referrer || '';

  return params;
}

// Custom event dispatcher (Pixel / GTM compatible)
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
