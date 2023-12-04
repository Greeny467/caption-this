import {Link} from 'react-router-dom';

export default function SideLink({icon, children, ...props}) {
  return (
    <li>
      <Link {...props}>
        <span className="icon">
          <i className="fas">{icon}</i>
        </span>
        <span className="title">{children}</span>
      </Link>
    </li>
  )
}