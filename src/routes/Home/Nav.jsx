import React from 'react';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';
import {Menu} from 'antd';
import logo from '../../res/logo.svg';
import {NavLink} from 'react-router-dom';

const Item = Menu.Item;

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneOpen: false,
        };
    }

    phoneClick = () => {
        this.setState({
            phoneOpen: !this.state.phoneOpen,
        });
    };


    render() {
        const props = {...this.props};
        const isMode = props.isMode;
        delete props.isMode;
        const navData = {
            menu1: {text: 'INDEX', url: "/index"},
            menu2: {text: 'BLOG', url: "/blog"},
            menu3: {text: 'TIME', url: "/time"},
            menu4: {text: 'ABOUT ME', url: "/index"}
        };
        const navChildren = Object.keys(navData)
            .map((key, i) => (<Item key={i}><NavLink to={navData[key]["url"]} style={{color:"#ffffff"}} activeStyle={{color:"#1DA57A"}}> {navData[key]["text"]}</NavLink></Item>));
        return (
            <TweenOne
                component="header"
                animation={{opacity: 0, type: 'from'}}
                {...props}
            >
                <TweenOne
                    className={`${this.props.className}-logo`}
                    animation={{x: -30, tylspe: 'from', ease: 'easeOutQuad'}}
                    id={`${this.props.id}-logo`}
                >
                    <img width="100%" src={logo}/>
                </TweenOne>
                {isMode ?
                    (<div
                        className={`${this.props.className}-phone-nav${this.state.phoneOpen ? ' open' : ''}`}
                        id={`${this.props.id}-menu`}>
                        <div className={`${this.props.className}-phone-nav-bar`}
                             onClick={() => {
                                 this.phoneClick();
                             }}>
                            <em/>
                            <em/>
                            <em/>
                        </div>
                        <div className={`${this.props.className}-phone-nav-text`}>
                            <Menu
                                defaultSelectedKeys={['0']}
                                mode="inline"
                                theme="dark"
                            >
                                {navChildren}
                            </Menu>
                        </div>
                    </div>) :
                    (<TweenOne
                        className={`${this.props.className}-nav`}
                        animation={{x: 30, type: 'from', ease: 'easeOutQuad'}}>
                        <Menu
                            mode="horizontal" defaultSelectedKeys={['0']}
                            id={`${this.props.id}-menu`}
                        >
                            {navChildren}
                        </Menu>
                    </TweenOne>)}
            </TweenOne>);
    }
}

Header.propTypes = {
    className: PropTypes.string,
    dataSource: PropTypes.object,
    id: PropTypes.string,
};

Header.defaultProps = {
    className: 'header0',
};

export default Header;
