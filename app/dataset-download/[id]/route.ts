type Archive = {
  url: string;
  filename: string;
};

const ARCHIVES: Record<number, Archive> = {
  1: {
    filename: 'dataset-1.zip',
    url: 'https://github.com/Jeongchuljoo/mrdang_data_set/raw/refs/heads/main/%E1%84%89%E1%85%A5%E1%84%8B%E1%85%AE%E1%86%AF%20%E1%84%80%E1%85%A9%E1%86%BC%E1%84%80%E1%85%B5%20%E1%84%8B%E1%85%A9%E1%84%8B%E1%85%A7%E1%86%B7%20%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5%E1%84%89%E1%85%A6%E1%86%BA.zip',
  },
  2: {
    filename: 'dataset-2.zip',
    url: 'https://github.com/Jeongchuljoo/mrdang_data_set/raw/refs/heads/main/%E1%84%80%E1%85%AE%E1%86%A8%E1%84%8C%E1%85%A6%20%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%80%E1%85%B5%20%E1%84%89%E1%85%AE%E1%84%8B%E1%85%AD%20%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5%E1%84%89%E1%85%A6%E1%86%BA.zip',
  },
  3: {
    filename: 'dataset-3.zip',
    url: 'https://github.com/Jeongchuljoo/mrdang_data_set/raw/refs/heads/main/air+quality.zip',
  },
  4: {
    filename: 'dataset-4.zip',
    url: 'https://github.com/Jeongchuljoo/mrdang_data_set/raw/refs/heads/main/energy+efficiency.zip',
  },
  5: {
    filename: 'dataset-5.zip',
    url: 'https://github.com/Jeongchuljoo/mrdang_data_set/raw/refs/heads/main/%E1%84%80%E1%85%AE%E1%86%A8%E1%84%8C%E1%85%A6%20%E1%84%82%E1%85%A1%E1%84%86%E1%85%AE%20%E1%84%89%E1%85%A5%E1%86%BC%E1%84%8C%E1%85%A1%E1%86%BC%20%E1%84%80%E1%85%AA%E1%86%AB%E1%84%85%E1%85%A7%E1%86%AB%20%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5.zip',
  },
  6: {
    filename: 'dataset-6.zip',
    url: 'https://github.com/Jeongchuljoo/mrdang_data_set/raw/refs/heads/main/%E1%84%80%E1%85%AE%E1%86%A8%E1%84%8C%E1%85%A6%20%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%20%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5.zip',
  },
  7: {
    filename: 'dataset-7.zip',
    url: 'https://github.com/Jeongchuljoo/mrdang_data_set/raw/refs/heads/main/%E1%84%8C%E1%85%A1%E1%84%83%E1%85%A9%E1%86%BC%E1%84%8E%E1%85%A1%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%87%E1%85%A9%20%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5.zip',
  },
  8: {
    filename: 'dataset-8.zip',
    url: 'https://github.com/Jeongchuljoo/mrdang_data_set/raw/refs/heads/main/%E1%84%80%E1%85%AE%E1%86%A8%E1%84%8C%E1%85%A6%20%E1%84%92%E1%85%A1%E1%86%BC%E1%84%80%E1%85%A9%E1%86%BC%20%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A9%E1%86%BC%20%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5.zip',
  },
  9: {
    filename: 'dataset-9.zip',
    url: 'https://github.com/Jeongchuljoo/mrdang_data_set/raw/refs/heads/main/%E1%84%8E%E1%85%A5%E1%86%AF%E1%84%83%E1%85%A9%20%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A9%E1%86%BC%20%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%20%E1%84%87%E1%85%B5%E1%84%8B%E1%85%AD%E1%86%BC.zip',
  },
  10: {
    filename: 'dataset-10.zip',
    url: 'https://github.com/Jeongchuljoo/mrdang_data_set/raw/refs/heads/main/%E1%84%83%E1%85%A9%E1%84%89%E1%85%B5%20%E1%84%80%E1%85%B5%E1%84%8C%E1%85%AE%E1%86%AB%20%E1%84%83%E1%85%A9%E1%84%85%E1%85%A9%20%E1%84%80%E1%85%AD%E1%84%90%E1%85%A9%E1%86%BC%E1%84%89%E1%85%A1%E1%84%80%E1%85%A9%20%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5.zip',
  },
  11: {
    filename: 'dataset-11.zip',
    url: 'https://github.com/Jeongchuljoo/mrdang_data_set/raw/refs/heads/main/%E1%84%92%E1%85%A1%E1%86%AB%E1%84%80%E1%85%AE%E1%86%A8%20%E1%84%8F%E1%85%A9%E1%84%85%E1%85%A9%E1%84%82%E1%85%A1%20%E1%84%80%E1%85%AA%E1%86%AB%E1%84%85%E1%85%A7%E1%86%AB%20%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5%E1%84%89%E1%85%A6%E1%86%BA.zip',
  },
  12: {
    filename: 'dataset-12.zip',
    url: 'https://github.com/Jeongchuljoo/mrdang_data_set/raw/refs/heads/main/heart+disease.zip',
  },
  13: {
    filename: 'dataset-13.zip',
    url: 'https://github.com/Jeongchuljoo/mrdang_data_set/raw/refs/heads/main/%E1%84%89%E1%85%B5%E1%86%A8%E1%84%89%E1%85%B3%E1%86%B8%E1%84%80%E1%85%AA%E1%86%AB%20%E1%84%86%E1%85%B5%E1%86%BE%20%E1%84%86%E1%85%A9%E1%86%B7%20%E1%84%8F%E1%85%A5%E1%86%AB%E1%84%83%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%8B%E1%85%A6%20%E1%84%84%E1%85%A1%E1%84%85%E1%85%B3%E1%86%AB%20%E1%84%87%E1%85%B5%E1%84%86%E1%85%A1%E1%86%AB%20%E1%84%8C%E1%85%B5%E1%84%89%E1%85%AE.zip',
  },
  14: {
    filename: 'dataset-14.zip',
    url: 'https://github.com/Jeongchuljoo/mrdang_data_set/raw/refs/heads/main/%E1%84%80%E1%85%AE%E1%86%A8%E1%84%8C%E1%85%A6%20%E1%84%87%E1%85%A7%E1%86%BC%E1%84%8B%E1%85%AF%E1%86%AB%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%87%E1%85%A9.zip',
  },
  15: {
    filename: 'dataset-15.zip',
    url: 'https://github.com/Jeongchuljoo/mrdang_data_set/raw/refs/heads/main/%E1%84%89%E1%85%A6%E1%84%80%E1%85%A8%20%E1%84%92%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC%E1%84%8C%E1%85%A6%20%E1%84%82%E1%85%A2%E1%84%89%E1%85%A5%E1%86%BC%20%E1%84%92%E1%85%A7%E1%86%AB%E1%84%92%E1%85%AA%E1%86%BC.zip',
  },
  16: {
    filename: 'dataset-16.zip',
    url: 'https://github.com/Jeongchuljoo/mrdang_data_set/raw/refs/heads/main/%E1%84%80%E1%85%AE%E1%86%A8%E1%84%8C%E1%85%A6%20%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%20%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5.zip',
  },
  17: {
    filename: 'dataset-17.zip',
    url: 'https://github.com/Jeongchuljoo/mrdang_data_set/raw/refs/heads/main/%E1%84%80%E1%85%AE%E1%86%A8%E1%84%8C%E1%85%A6%20%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%20%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5.zip',
  },
  18: {
    filename: 'dataset-18.zip',
    url: 'https://github.com/Jeongchuljoo/mrdang_data_set/raw/refs/heads/main/%E1%84%89%E1%85%B5%E1%86%AB%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%8F%E1%85%A1%E1%84%83%E1%85%B3%20%E1%84%89%E1%85%B3%E1%86%BC%E1%84%8B%E1%85%B5%E1%86%AB%20%E1%84%8B%E1%85%A8%E1%84%8E%E1%85%B3%E1%86%A8.zip',
  },
  19: {
    filename: 'dataset-19.zip',
    url: 'https://github.com/Jeongchuljoo/mrdang_data_set/raw/refs/heads/main/%E1%84%80%E1%85%AE%E1%86%A8%E1%84%8C%E1%85%A6%20%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%20%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5.zip',
  },
  20: {
    filename: 'dataset-20.zip',
    url: 'https://github.com/Jeongchuljoo/mrdang_data_set/raw/refs/heads/main/%E1%84%80%E1%85%AE%E1%86%A8%E1%84%8C%E1%85%A6%20%E1%84%89%E1%85%A5%E1%86%BC%E1%84%8B%E1%85%B5%E1%86%B8%20%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5.zip',
  },
};

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const archive = ARCHIVES[Number(id)];

  if (!archive) {
    return new Response('Dataset archive not found', { status: 404 });
  }

  const range = request.headers.get('range');
  const archiveResponse = await fetch(archive.url, {
    cache: 'no-store',
    headers: range ? { Range: range } : undefined,
    redirect: 'follow',
  });

  if (!archiveResponse.ok || !archiveResponse.body) {
    return new Response('Dataset archive source not found', { status: 404 });
  }

  const headers = new Headers({
    'content-disposition': `attachment; filename="${archive.filename}"`,
    'content-type':
      archiveResponse.headers.get('content-type') ?? 'application/zip',
  });
  const contentLength = archiveResponse.headers.get('content-length');
  const contentRange = archiveResponse.headers.get('content-range');
  const acceptRanges = archiveResponse.headers.get('accept-ranges');

  if (contentLength) {
    headers.set('content-length', contentLength);
  }
  if (contentRange) {
    headers.set('content-range', contentRange);
  }
  if (acceptRanges) {
    headers.set('accept-ranges', acceptRanges);
  }

  return new Response(archiveResponse.body, {
    status: archiveResponse.status,
    headers: {
      ...Object.fromEntries(headers.entries()),
    },
  });
}
