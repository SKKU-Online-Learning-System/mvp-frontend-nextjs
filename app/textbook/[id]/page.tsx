import { TextBookContentContainer } from '@/app/component/textbook/TextBookContentContainer';

export default async function TextBookDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className='my-container'>
      <TextBookContentContainer id={+id} />
    </div>
  );
}
