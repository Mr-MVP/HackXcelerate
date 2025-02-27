import React from "react";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type PostCardProps = {
  post: {
    creator: {
      name: "Mrudul";
      id: "Hardcoded-MVP";
    };
    likes: 8;
    captions: "Good Morning Mumbai";
    tags: ["soothing", "serene", "calming"];
    imageUrl: "src/assets/images/Mrudul_image.jpg";
    id: "ABC";
  };
};

const user = { name: "Mrudul", id: "Hardcoded-MVP" };

// const PostCard = ({ post }: PostCardProps) => {
//   return (
//     <div className="post-card">
//       <div className="flex-between">
//         <div className="flex items-center gap-3">
//           <Link to={`/profile/${post.creator.id}`}>
//             <img src={post?.creator?.imageUrl} />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

const PostCard = ({ post }: PostCardProps) => {
  //   const { user } = useUserContext();
  console.log(post);
  if (!post.creator) return;

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.id}`}>
            <img
              src={"src/assets/icons/profile-placeholder.svg"}
              alt="creator"
              className="w-12 lg:h-12 rounded-full"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post.creator.name}
            </p>
            <div className="flex-center gap-2 text-light-3">
              {/* <p className="subtle-semibold lg:small-regular ">
                {multiFormatDateString(post.$createdAt)}
              </p>
              • */}
              {/* <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p> */}
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${post.id}`}
          className={`${user.id !== post.creator.id && "hidden"}`}
        >
          <img
            src={"src/assets/icons/edit.svg"}
            alt="edit"
            width={20}
            height={20}
          />
        </Link>
      </div>

      <Link to={`/posts/${post.id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.captions}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string, index: number) => (
              <li key={`${tag}${index}`} className="text-light-3 small-regular">
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        <img src={post.imageUrl} alt="post image" className="post-card_img" />
      </Link>

      <PostStats post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
