import { redirect } from "next/navigation";

import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import { fetchUserPosts } from "@/lib/actions/user.actions";

import BuzzCard from "../cards/BuzzCard";

interface Result {
  name: string;
  image: string;
  id: string;
  buzzes: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    community: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    children: {
      author: {
        image: string;
      };
    }[];
  }[];
}

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

async function BuzzesTab({ currentUserId, accountId, accountType }: Props) {
  let result: Result;

  if (accountType === "Community") {
    result = await fetchCommunityPosts(accountId);
  } else {
    result = await fetchUserPosts(accountId);
  }

  if (!result) {
    redirect("/");
  }

  return (
    <section className='mt-9 flex flex-col gap-10'>
      {result.buzzes.map((buzz) => (
        <BuzzCard
          key={buzz._id}
          id={buzz._id}
          currentUserId={currentUserId}
          parentId={buzz.parentId}
          content={buzz.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: buzz.author.name,
                  image: buzz.author.image,
                  id: buzz.author.id,
                }
          }
          community={
            accountType === "Community"
              ? { name: result.name, id: result.id, image: result.image }
              : buzz.community
          }
          createdAt={buzz.createdAt}
          comments={buzz.children}
        />
      ))}
    </section>
  );
}

export default BuzzesTab;
