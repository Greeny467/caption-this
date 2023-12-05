import './Sidebar.scss';
import SideLink from './SideLink';
import CreatePost from '../CreatePost.jsx';
import { useLocation } from 'react-router-dom';


import Auth from '../../utils/auth';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import WavesIcon from '@mui/icons-material/Waves';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import CasinoIcon from '@mui/icons-material/Casino';

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
      <div className="sidebar">
        <ul>
        <SideLink to="/trending" icon={<TrendingUpIcon/>} className={isActive('/trending')}>Trending</SideLink>
        <SideLink to="/roast" icon={<WhatshotIcon/>} className={isActive('/roast')}>Roast Me</SideLink>
        <SideLink to="/deep" icon={<WavesIcon/>} className={isActive('/deep')}>Deep Captions</SideLink>
        <SideLink to="/videos" icon={<OndemandVideoIcon/>} className={isActive('/videos')}>Videos</SideLink>
        <SideLink to="/random" icon={<CasinoIcon/>} className={isActive('/random')}>Random</SideLink>
        </ul>
        {Auth.loggedIn() && <CreatePost/>}
      </div>
  );
}
