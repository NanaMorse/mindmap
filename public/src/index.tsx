import 'babel-polyfill';
import './apptools/KeyBind';
import SocketHandler from './socketHandler'
import { renderUIComponent } from './components/ui'
import { renderCoreComponent } from './components/core'

// init socket handle with callback
new SocketHandler((store) => {
  // render core component after store data init
  renderCoreComponent(store);

  // render ui component
  renderUIComponent();
});