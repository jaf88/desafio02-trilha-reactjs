import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { WatchMeProvider } from './hooks/WatchMeContext';

import './styles/global.scss';

export function App() {
 
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <WatchMeProvider>
        <SideBar />
        <Content />
      </WatchMeProvider>    
    </div>
  )
}