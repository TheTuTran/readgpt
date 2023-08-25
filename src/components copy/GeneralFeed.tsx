import { db } from "@/lib/db";
import PostFeed from "./PostFeed";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";

const GeneralFeed = async () => {
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      subchamber: true,
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS, // 4 to demonstrate infinite scroll, should be higher in production
  });

  return <PostFeed initialPosts={posts} />;
};

export default GeneralFeed;
