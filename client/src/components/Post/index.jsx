import "./Post.scss";
// import {LockOpenIcon, LockIcon} from '@mui/icons-material';

export default function Post({ children, img, href, ...props }) {

  return (
    <a href={href} className="post" {...props}>
      <img src={img ? img : "https://placehold.co/800x600?text=Missing Image"} alt="post_img" />
      <span className="postText">{`"${children}"`}</span>
    </a>
  );
}