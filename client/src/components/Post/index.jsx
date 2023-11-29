import "./Post.scss";
// import {LockOpenIcon, LockIcon} from '@mui/icons-material';

export default function Post({ post }) {
  console.log(post)
  return (
    <a href={`/posts/${post._id}`} className="post" {...props}>
      <h2>{post.user.username}</h2>
      <img src={post.imageURL ? post.imageURL : "https://placehold.co/800x600?text=Missing Image"} alt="post_img" />
      <h2>{post.caption ? post.caption : ''}</h2>
    </a>
  );
}