import { TextBookContainer } from '@/components/TextBook/TextBookContent/TextBookContainer';
import Nav from '@/components/common/Header/Nav';

export default async function TextBook({
    searchParams,
}: {
    searchParams: Promise<{ id: number }>;
}) {
    const id = (await searchParams).id;

    return (
        <div>
            <Nav style="white" />
            <TextBookContainer id={id} />
        </div>
    );
}
