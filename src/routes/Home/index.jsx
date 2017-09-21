import React from 'react';
import enquire from 'enquire.js';
import {scrollScreen} from 'rc-scroll-anim';
import Nav from './Nav';
import Footer from './Footer';
import './less/antMotion_style.less';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Blog from "../Blog/blog";
import HomeContent from "./Home";
import NProgress from 'nprogress'
import './less/ngprogress.css'
import {WrappedRegistrationForm} from "../Time/time";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isMode: false
        };
        NProgress.configure({
            easing: 'ease',
            speed: 500,
            template: "<div style=\"background:#1DA57A;\" class=\"bar\" role=\"bar\"><div class=\"peg\"></div></div><div class=\"spinner\" role=\"spinner\"><div class=\"spinner-icon\"></div></div>"
        });
        // NProgress.set(0.4);
    }

    componentDidMount() {
        // 适配手机屏幕;
        this.enquireScreen((isMode) => {
            this.setState({isMode});
        });
    }


    enquireScreen = (cb) => {
        /* eslint-disable no-unused-expressions */
        enquire.register('only screen and (min-width: 320px) and (max-width: 767px)', {
            match: () => {
                cb && cb(true);
            },
            unmatch: () => {
                cb && cb();
            },
        });
        /* eslint-enable no-unused-expressions */
    };

    render() {
        return (
            <BrowserRouter>
                <div className="templates-wrapper">
                    <Nav id="nav_0_0" key="nav_0_0" isMode={this.state.isMode}/>
                    <Route exact path="/index" component={HomeContent}/>
                    <Route path="/blog" component={Blog}/>
                    <Route path="/time" component={WrappedRegistrationForm}/>
                    <Footer id="footer_0_0" key="footer_0_0" isMode={this.state.isMode}/>
                </div>
            </BrowserRouter>
        );
    }
}
