import Nav from '../../components/common/Header/Nav';
import { VideoContainer } from '../../components/video/VideoContent';

export default async function Video({
    searchParams,
}: {
    searchParams: Promise<{ id: number }>;
}) {
    const id = (await searchParams).id;

    return (
        <div>
            <Nav style="white" />
            <VideoContainer id={id} />
        </div>
    );
}
