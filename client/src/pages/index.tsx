import NavBar from "../components/NavBar";
import PostCard from "../components/PostCard";
import { Post, usePostsQuery } from "../generated/graphql";

export default function Home() {
  const { data } = usePostsQuery();
  if (!data) {
    return <h1>no post</h1>;
  }
  return (
    <div>
      <NavBar />
      <div className="max-w-5xl px-4 mx-auto">
        {data.posts.map((p: Post) => (
          <PostCard postData={p} key={p.id} />
        ))}
      </div>
    </div>
  );
}
