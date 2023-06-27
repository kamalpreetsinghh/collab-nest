import { UserProfile } from "@/common.types";
import { getUserProjects } from "@/lib/actions";

import Profile from "@/components/Profile";

type ProfilePageProps = {
  params: {
    id: string;
  };
};

const ProfilePage = async ({ params: { id } }: ProfilePageProps) => {
  const result = (await getUserProjects(id, 100)) as { user: UserProfile };

  if (!result?.user)
    return <p className="no-result-text">Failed to fetch user info</p>;

  return <Profile user={result?.user} />;
};

export default ProfilePage;
