import { TextBookContainer } from '@/components/TextBook/TextBookContent/TextBookContainer';
import Nav from '@/components/common/Header/Nav';
import { cookies } from 'next/headers';

export default async function TextBook({
  searchParams,
}: {
  searchParams: Promise<{ id: number }>;
}) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh-token');
  // const accessToken = cookieStore.get("access-token");

  const id = (await searchParams).id;
  return (
    <div>
      <Nav style='white' refreshToken={refreshToken} />
      <TextBookContainer id={id} refreshToken={refreshToken} />
    </div>
  );
}
