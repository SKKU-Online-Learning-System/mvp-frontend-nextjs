import Nav from '@/components/common/Header/Nav';

export default function ContentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Nav style="white" />
            <div className="w-full">{children}</div>
        </div>
    );
}
