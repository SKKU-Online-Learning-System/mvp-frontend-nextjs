import Nav from '../../components/common/Header/Nav';
import { VideoContainer } from '../../components/video/VideoContent';

export default async function Video({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; t?: string }>;
}) {
  const { id: rawId, t } = await searchParams;
  const id = Number(rawId);
  const startSeconds = Math.max(0, Number(t ?? 0) || 0);

  return (
    <div>
      <Nav style='white' />
      <VideoContainer id={id} startSeconds={startSeconds} />
    </div>
  );
}
