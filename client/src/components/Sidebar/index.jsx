import './Sidebar.scss';
import SideLink from './SideLink';
import CreatePost from '../CreatePost.jsx';

import Auth from '../../utils/auth';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import WavesIcon from '@mui/icons-material/Waves';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import CasinoIcon from '@mui/icons-material/Casino';

export default function Sidebar() {
  return (
      <div className="sidebar">
        <ul>
          <SideLink href="/" icon={<TrendingUpIcon/>}>Trending</SideLink>
          <SideLink href="/" icon={<WhatshotIcon/>}>Roast Me</SideLink>
          <SideLink href="/" icon={<WavesIcon/>}>Deep Captions</SideLink>
          <SideLink href="/" icon={<OndemandVideoIcon/>} className='active'>Videos</SideLink>
          <SideLink href="/" icon={<CasinoIcon/>}>Random</SideLink>
        </ul>
        {Auth.loggedIn() && <CreatePost/>}
      </div>
  );
}
