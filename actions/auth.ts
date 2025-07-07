'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.set('access-token', '', {
    expires: new Date(0),
    path: '/',
    domain: '.mrdang.cs.skku.edu',
  });
  cookieStore.set('refresh-token', '', {
    expires: new Date(0),
    path: '/',
    domain: '.mrdang.cs.skku.edu',
  });

  redirect('/');
}
