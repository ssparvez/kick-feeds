import './Content.scss';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import StreamCreate from './streams/StreamCreate';
// import StreamEdit from './streams/StreamEdit';
// import StreamDelete from './streams/StreamDelete';
import Home from '../pages/Home.js';
// import StreamShow from './streams/StreamShow';
import OnNow from '../pages/OnNow.js';
import Following from '../pages/Following.js';
import Browse from '../pages/Browse.js';
import Competition from '../pages/Competition.js';
import Team from '../pages/Team.js';
import Match from '../pages/Match';
import PageNotFound from '../pages/errors/PageNotFound';

export default class Content extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="content">
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/matches/live" exact component={OnNow} />
					<Route path="/following" exact component={Following} />
					<Route path="/browse" exact component={Browse} />
					<Route path="/competitions/:id" exact component={Competition} />
					<Route path="/teams/:id" exact component={Team} />
					<Route path="/matches/:id" exact component={Match} />
					<Route component={PageNotFound} />

					{/* <Route path="/streams/new" exact render={() => <StreamCreate />} />
					<Route path="/streams/edit/:id" exact component={StreamEdit} />
					<Route path="/streams/delete/:id" exact component={StreamDelete} />
					<Route path="/streams/:id" exact component={StreamShow} /> */}
				</Switch>
			</div>
    )
  }
}