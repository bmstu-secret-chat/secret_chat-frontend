import { ProfileModal, ProfilePage } from '@/features/profile/ui';

export default function Profile({ params }: { params: { id: string } }) {
	return (
		<ProfileModal>
			<ProfilePage userId={params.id} />
		</ProfileModal>
	);
}
