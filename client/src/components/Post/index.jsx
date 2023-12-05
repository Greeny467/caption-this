import "./Post.scss";
// import {LockOpenIcon, LockIcon} from '@mui/icons-material';

export default function Post({ post }) {
  console.log(post)
  return (
    <a href={`/posts/${post._id}`} className="post">
      <a className="userName" href={`/dashboard/${post.user._id}`}>{post.user.username}</a>
      <img src={post.imageURL ? post.imageURL : "https://placehold.co/800x600?text=Missing Image"} alt="post_img" />
      <h2>{post.caption ? post.caption : ''}</h2>
    </a>
  );
}