'use server';

import { auth } from 'app/auth';
import { type Session } from 'next-auth';
import supabase from './postgres';

import { revalidatePath, unstable_noStore as noStore } from 'next/cache';

export async function increment(slug: string) {
  noStore();
  await supabase
    .from('views')
    .upsert({ slug, count: 1 }, { onConflict: 'slug' })
    .then((response) => {
      if (response.error) {
        throw response.error;
      }
    });
}


async function getSession(): Promise<Session> {
  let session = await auth();
  if (!session || !session.user) {
    throw new Error('Unauthorized');
  }

  return session;
}

export async function saveGuestbookEntry(formData: FormData) {
  let session = await getSession();
  let email = session.user?.email as string;
  let created_by = session.user?.name as string;

  if (!session.user) {
    throw new Error('Unauthorized');
  }

  let entry = formData.get('entry')?.toString() || '';
  let body = entry.slice(0, 500);

  await supabase
    .from('guestbook')
    .insert({
      email,
      body,
      created_by,
      created_at: new Date(),
    })
    .then((response) => {
      if (response.error) {
        throw response.error;
      }
    });

  revalidatePath('/guestbook');

  let data = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_SECRET}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'guestbook@leerob.io',
      to: 'me@leerob.io',
      subject: 'New Guestbook Entry',
      html: `<p>Email: ${email}</p><p>Message: ${body}</p>`,
    }),
  });

  let response = await data.json();
  console.log('Email sent', response);
}

export async function deleteGuestbookEntries(selectedEntries: string[]) {
  let session = await getSession();
  let email = session.user?.email as string;

  if (email !== 'me@leerob.io') {
    throw new Error('Unauthorized');
  }

  let selectedEntriesAsNumbers = selectedEntries.map(Number);
  let arrayLiteral = `{${selectedEntriesAsNumbers.join(',')}}`;

  await supabase
    .from('guestbook')
    .delete()
    .in('id', selectedEntriesAsNumbers)
    .then((response) => {
      if (response.error) {
        throw response.error;
      }
    });

  revalidatePath('/admin');
  revalidatePath('/guestbook');
}
