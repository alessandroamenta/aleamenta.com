'use server';

import { youtube, auth } from '@googleapis/youtube';
import supabase from './postgres';

import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from 'next/cache';


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