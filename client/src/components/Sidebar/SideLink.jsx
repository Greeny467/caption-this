export default function SideLink({icon, children, ...props}) {
  return (
    <li>
      <a {...props}>
        <span className="icon">
          <i className="fas">{icon}</i>
        </span>
        <span className="title">{children}</span>
      </a>
    </li>
  )
}