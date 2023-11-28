import "./Post.scss";

export default function Post({ children, img, href, ...props }) {
  if (img) {
    return (
      <a href={href} className="post" {...props}>
        <img src={img} alt="post_img" />
        <span className="postText">{`"${children}"`}</span>
      </a>
    );
  }

  return (
    <a href={href} className="post" {...props}>
      <img src={"https://placehold.co/800x400?text=Post"} alt="post_img" />
      <span className="postText">{`"${children}"`}</span>
    </a>
  );
}