import './Sidebar.css';

export default function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <ul>
          <li>
            <a href="#">
              <span className="icon">
                <i className="fas fa-fire"></i>
              </span>
              <span className="title">Trending</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon">
                <i className="fas fa-fire-extinguisher"></i>
              </span>
              <span className="title">Roast Me</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon">
                <i className="fas fa-coffee"></i>
              </span>
              <span className="title">Deep Captions</span>
            </a>
          </li>
          <li>
            <a href="#" className="active">
              <span className="icon">
                <i className="fas fa-video"></i>
              </span>
              <span className="title">Videos</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon">
                <i className="fas fa-dumpster-fire"></i>
              </span>
              <span className="title">Random</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
