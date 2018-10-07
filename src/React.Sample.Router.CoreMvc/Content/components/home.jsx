import { Component } from 'react';
import {
	Link,
	BrowserRouter,
	Route,
	Switch,
	StaticRouter,
	Redirect
} from 'react-router-dom';

import { StyledComponentsDemo } from './styled-components.jsx';
import { EmotionDemo } from './emotion.jsx';
import { ReactJssDemo } from './react-jss.jsx';

class Navbar extends Component {
	render() {
		return (
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/styled-components">Styled Components Demo</Link>
				</li>
				<li>
					<Link to="/react-jss">React-JSS Demo</Link>
				</li>
				<li>
					<Link to="/emotion">Emotion Demo</Link>
				</li>
			</ul>
		);
	}
}

class HomePage extends Component {
	render() {
		return <h1 style={{ lineHeight: '2', color: '#222', fontFamily: 'Helvetica, sans-serif', textShadow: '0 0 5px lightgray' }}>React.NET is 🔥🔥</h1>
	}
}

export default class HomeComponent extends Component {
	render() {
		const app = (
			<div>
				<Navbar />
				<Switch>
					<Route exact path="/" render={() => <Redirect to="/home" />} />
					<Route path="/home" component={HomePage} />
					<Route path="/styled-components" component={StyledComponentsDemo} />
					<Route path="/react-jss" component={ReactJssDemo} />
					<Route path="/emotion" component={EmotionDemo} />
					<Route
						path="*"
						component={({ staticContext }) => {
							if (staticContext) staticContext.status = 404;

							return <h1>Not Found :(</h1>;
						}}
					/>
				</Switch>
			</div>
		);

		if (typeof window === 'undefined') {
			return (
				<StaticRouter context={this.props.context} location={this.props.location}>
					{app}
				</StaticRouter>
			);
		}
		return <BrowserRouter>{app}</BrowserRouter>;
	}
}
