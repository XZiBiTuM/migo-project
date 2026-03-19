const DEFAULT_BOT_URL = 'https://t.me/migo_work';

interface BotUrlParams {
  start?: string;
  source?: string;
  medium?: string;
  campaign?: string;
}

export function getBotUrl({ start, source = 'site', medium, campaign }: BotUrlParams = {}): string {
  const baseUrl = process.env.NEXT_PUBLIC_BOT_URL || DEFAULT_BOT_URL;

  const params = new URLSearchParams();

  if (start) {
    params.append('start', start);
  }

  if (source) params.append('utm_source', source);
  if (medium) params.append('utm_medium', medium);
  if (campaign) params.append('utm_campaign', campaign);

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}
