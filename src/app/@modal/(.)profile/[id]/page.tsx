'use client';

import { ProfilePage } from '@/features/profile/ui';

export default function Profile({ params }: { params: { id: string } }) {
	return <ProfilePage userId={params.id} />;
}
