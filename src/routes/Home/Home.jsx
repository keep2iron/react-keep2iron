import React from 'react';
import Content0 from './Content0';
import Content1 from './Content1';
import Content2 from './Content2';
import NProgress from 'nprogress'


export default class HomeContent extends React.Component {

    constructor(props) {
        NProgress.start();
        super(props);
        this.state = {
            isMode: false
        };
    }

    render() {
        NProgress.done();
        return (
            <div>
                <Content0 id="content_1_0" key="content_1_0" isMode={this.state.isMode}/>
                <Content1 id="content_2_0" key="content_2_0" isMode={this.state.isMode}/>
                <Content2 id="content_3_0" key="content_3_0" isMode={this.state.isMode}/>
            </div>
        )
    };
}