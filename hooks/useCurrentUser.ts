'use client';

import { useCallback, useEffect, useState } from 'react';
import { getCurrentUser } from '@/app/api/auth';
import { AuthUser } from '@/types/auth';

export default function useCurrentUser() {
    const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const refreshCurrentUser = useCallback(async () => {
        setIsLoading(true);
        const user = await getCurrentUser();
        setCurrentUser(user);
        setIsLoading(false);
        return user;
    }, []);

    useEffect(() => {
        refreshCurrentUser();
    }, [refreshCurrentUser]);

    return {
        currentUser,
        isLoading,
        refreshCurrentUser,
    };
}
