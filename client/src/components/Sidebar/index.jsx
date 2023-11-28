import './Sidebar.css';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import WavesIcon from '@mui/icons-material/Waves';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import CasinoIcon from '@mui/icons-material/Casino';

export default function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <ul>
          <li>
            <a href="/">
              <span className="icon">
                <i className="fas fa-fire"><TrendingUpIcon/></i>
              </span>
              <span className="title">Trending</span>
            </a>
          </li>
          <li>
            <a href="/">
              <span className="icon">
                <i className="fas fa-fire-extinguisher"><WhatshotIcon/></i>
              </span>
              <span className="title">Roast Me</span>
            </a>
          </li>
          <li>
            <a href="/">
              <span className="icon">
                <i className="fas fa-coffee"><WavesIcon/></i>
              </span>
              <span className="title">Deep Captions</span>
            </a>
          </li>
          <li>
            <a href="/" className="active">
              <span className="icon">
                <i className="fas fa-video"><OndemandVideoIcon/></i>
              </span>
              <span className="title">Videos</span>
            </a>
          </li>
          <li>
            <a href="/">
              <span className="icon">
                <i className="fas fa-dumpster-fire"><CasinoIcon/></i>
              </span>
              <span className="title">Random</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
