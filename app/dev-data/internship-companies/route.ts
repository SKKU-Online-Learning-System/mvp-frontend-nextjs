import { readFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

// Dev-only stand-in for the authenticated backend endpoint, so the page works
// without a local server. Reading from disk keeps the data out of the client bundle.
export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return new NextResponse(null, { status: 404 });
  }

  const file = path.join(process.cwd(), 'dev-data', 'internshipCompanies.json');

  return new NextResponse(await readFile(file, 'utf8'), {
    headers: { 'content-type': 'application/json' },
  });
}
