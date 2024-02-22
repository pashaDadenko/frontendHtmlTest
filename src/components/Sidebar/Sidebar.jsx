import './sidebar.scss';
import React from 'react';
import classnames from 'classnames';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const routes = [
	{ title: 'Home', icon: 'fas-solid fa-house', path: '/' },
	{ title: 'Sales', icon: 'chart-line', path: '/sales' },
	{ title: 'Costs', icon: 'chart-column', path: '/costs' },
	{ title: 'Payments', icon: 'wallet', path: '/payments' },
	{ title: 'Finances', icon: 'chart-pie', path: '/finances' },
	{ title: 'Messages', icon: 'envelope', path: '/messages' },
];

const bottomRoutes = [
	{ title: 'Settings', icon: 'sliders', path: '/settings' },
	{ title: 'Support', icon: 'phone-volume', path: '/support' },
];

export default class Sidebar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpened: true,
			activePath: '/',
			hoveredIndex: -1,
		};
	}

	toggleSidebar = () => {
		this.setState((state) => ({ isOpened: !state.isOpened }));
	};

	goToRoute = (path) => {
		this.setState({ activePath: path });
	};

	handleMouseEnter = (index) => {
		this.setState({ hoveredIndex: index });
	};

	handleMouseLeave = () => {
		this.setState({ hoveredIndex: -1 });
	};

	render() {
		const { isOpened, activePath, hoveredIndex } = this.state;
		const containerClassnames = classnames('sidebar', { opened: isOpened ? '' : 'opened' });

		return (
			<motion.div className={containerClassnames} initial={{ width: isOpened ? '200px' : '36px' }} animate={{ width: isOpened ? '200px' : '36px' }} transition={{ duration: 3, delay: 0.01 }}>
				<div className='wrapTop'>
					<img className='logo' src={logo} alt='TensorFlow logo' />
					<motion.span className={isOpened ? 'logoName' : 'opacity'} initial={{ x: isOpened ? 0 : 50, opacity: isOpened ? 1 : 0 }} animate={{ x: isOpened ? 0 : -50, opacity: isOpened ? 1 : 0 }} transition={{ duration: 3 }}>
						TensorFlow
					</motion.span>
					<button className='button' onClick={this.toggleSidebar}>
						<FontAwesomeIcon icon={isOpened ? 'angle-left' : 'angle-right'} />
					</button>
				</div>

				<div className='wrapMain'>
					{routes.map((route, index) => (
						<div className={classnames('wrap', { active: route.path === activePath, hover: hoveredIndex === index })} key={route.title} onClick={() => this.goToRoute(route.path)} onMouseEnter={() => this.handleMouseEnter(index)} onMouseLeave={this.handleMouseLeave}>
							<FontAwesomeIcon icon={route.icon} />
							<motion.span className={isOpened ? '' : 'opacity'} initial={{ x: isOpened ? 0 : 50, opacity: isOpened ? 1 : 0 }} animate={{ x: isOpened ? 0 : -50, opacity: isOpened ? 1 : 0 }} transition={{ duration: 3 }}>
								{route.title}
							</motion.span>
						</div>
					))}
				</div>

				<div className='wrapMain'>
					{bottomRoutes.map((route, index) => (
						<div
							className={classnames('wrap', { active: route.path === activePath, hover: hoveredIndex === index + routes.length })}
							key={route.title}
							onClick={() => this.goToRoute(route.path)}
							onMouseEnter={() => this.handleMouseEnter(index + routes.length)}
							onMouseLeave={this.handleMouseLeave}>
							<FontAwesomeIcon icon={route.icon} />
							<motion.span className={isOpened ? '' : 'opacity'} initial={{ x: isOpened ? 0 : 50, opacity: isOpened ? 1 : 0 }} animate={{ x: isOpened ? 0 : -50, opacity: isOpened ? 1 : 0 }} transition={{ duration: 3 }}>
								{route.title}
							</motion.span>
						</div>
					))}
				</div>
			</motion.div>
		);
	}
}
