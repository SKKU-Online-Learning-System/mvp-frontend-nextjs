'use client';

import Link from 'next/link';
import { FaBookOpen } from 'react-icons/fa';
import { IoHome } from 'react-icons/io5';
import { MdFileUpload } from 'react-icons/md';
import useCurrentUser from '@/hooks/useCurrentUser';
import { SideBar } from './SideBar';
import { SideBarButton } from './SideBarButton';

type Props = {
    refreshToken?: unknown;
};

export default function LeftSideBar(_: Props) {
    const { currentUser } = useCurrentUser();

    return (
        <SideBar>
            <Link href="/">
                <SideBarButton icon={IoHome} text="홈" />
            </Link>

            {currentUser && (
                <Link href="/upload">
                    <SideBarButton icon={MdFileUpload} text="업로드" />
                </Link>
            )}

            <Link href="/textbook">
                <SideBarButton icon={FaBookOpen} text="교재" />
            </Link>
        </SideBar>
    );
}
