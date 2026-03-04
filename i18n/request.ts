import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from './config';

// Pre-import all messages at module level
interface Messages {
  'en': Record<string, any>;
  'es': Record<string, any>;
}

let messagesCache: Messages | null = null;

async function getMessages(): Promise<Messages> {
  if (messagesCache) {
    return messagesCache;
  }

  const messages: Messages = {
    'en': (await import('./locales/en.json')).default,
    'es': (await import('./locales/es.json')).default,
  };

  messagesCache = messages;
  return messages;
}

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as any)) notFound();

  const messages = await getMessages();
  
  return {
    locale,
    messages: messages[locale as keyof Messages] || messages.en,
  };
});
