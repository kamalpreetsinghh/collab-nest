import Feed from "@/components/project/Feed";

type HomeProps = {
  searchParams: {
    category?: string;
    page?: string;
  };
};

const HomePage = ({ searchParams: { category, page } }: HomeProps) => {
  return <Feed category={category || "Discover"} page={Number(page) || 1} />;
};

export default HomePage;
