
import { useTheme } from '../theme/theme-provider';

import darkimg1 from '../../assets/Accountant.mp4'
import darkimg2 from '../../assets/calendar_bg-B.mp4'
import darkimg3 from '../../assets/goal_bg-B.mp4'
import darkimg4 from '../../assets/mailbox_bg-B.mp4'
import darkimg5 from '../../assets/protected_bg-B.mp4'
import darkimg6 from '../../assets/target_bg-b.mp4'
import darkimg7 from '../../assets/search.mp4'
import darkimg8 from '../../assets/writing_bg-B.mp4'



import lightimg1 from '../../assets/calendar_bg-W.mp4'
import lightimg2 from '../../assets/goal_bg-W.mp4'
import lightimg3 from '../../assets/mailbox_bg-W.mp4'
import lightimg4 from '../../assets/protected_bg-W.mp4'
import lightimg5 from '../../assets/target_bg-w.mp4'
import lightimg6 from '../../assets/whiteAccountant.mp4'
import lightimg7 from '../../assets/white_search.mp4'
import lightimg8 from '../../assets/writing_bg-W.mp4'



const videos = {
  dark: [darkimg1, darkimg2, darkimg3, darkimg4, darkimg5, darkimg6, darkimg7, darkimg8],
  light: [lightimg1, lightimg2, lightimg3, lightimg4, lightimg5, lightimg6, lightimg7, lightimg8],
};

const VideoRandomizer = () => {
  const { theme } = useTheme();
  const selectedVideo = videos[theme][Math.floor(Math.random() * videos[theme].length)];
  return selectedVideo;
};

export default VideoRandomizer;
