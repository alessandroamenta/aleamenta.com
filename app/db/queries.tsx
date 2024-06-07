'use server';

import { youtube, auth } from '@googleapis/youtube';
import supabase from './postgres';

import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from 'next/cache';

let googleAuth = new auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
});

let yt = youtube({
  version: 'v3',
  auth: googleAuth,
});

export async function getBlogViews() {
  noStore();
  let { data: views, error } = await supabase
    .from('views')
    .select('count');

  if (error) {
    throw error;
  }

  return views?.reduce((acc, curr) => acc + Number(curr.count), 0) || 0;
}

export async function getViewsCount(): Promise<
  { slug: string; count: number }[]
> {
  noStore();
  let { data: views, error } = await supabase
    .from('views')
    .select('slug, count');

  if (error) {
    throw error;
  }

  return views || [];
}

export const getLeeYouTubeSubs = cache(
  async () => {
    let response = await yt.channels.list({
      id: ['UCZMli3czZnd1uoc1ShTouQw'],
      part: ['statistics'],
    });

    let channel = response.data.items?.[0];
    return Number(channel?.statistics?.subscriberCount || 0).toLocaleString();
  },
  ['leerob-youtube-subs'],
  {
    revalidate: 3600,
  }
);

export const getVercelYouTubeSubs = cache(
  async () => {
    let response = await yt.channels.list({
      id: ['UCLq8gNoee7oXM7MvTdjyQvA'],
      part: ['statistics'],
    });

    let channel = response.data.items?.[0];
    return Number(channel?.statistics?.subscriberCount || 0).toLocaleString();
  },
  ['vercel-youtube-subs'],
  {
    revalidate: 3600,
  }
);

export async function getGuestbookEntries() {
  noStore();
  let { data: entries, error } = await supabase
    .from('guestbook')
    .select('id, body, created_by, updated_at')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) {
    throw error;
  }

  return entries || [];
}