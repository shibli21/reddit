import { useMeQuery } from "../generated/graphql";

export default function Home() {
  const { data } = useMeQuery();
  return (
    <div>
      <div className="text-gray-100 bg-red-500">NEXT APP</div>
      <div>{data?.me?.username}</div>
    </div>
  );
}
