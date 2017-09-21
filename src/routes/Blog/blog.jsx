import React from 'react';
import QueueAnim from 'rc-queue-anim';
import './less/blog.less';
import {Layout, Menu, Icon} from 'antd';
import './less/swiper.less';
import {HOST} from "../../extra/constants";
import NProgress from 'nprogress'
const {SubMenu} = Menu;
const {Content, Sider} = Layout;


export default class Blog extends React.Component {


    constructor(message){
        super(message)
        NProgress.start();
        this.state = {
            message: null
        };

        fetch(HOST + 'article', {
            method: "GET",
            mode: "cors",})
            .then((response)=>{
                if(response.ok)
                    return response.json();
            })
            .then((resp)=>{
                NProgress.done();
                // console.log(resp);
                this.setState({message: resp});
            });
    }

    render() {
        return (
            <Layout key="layoutContent">
                <Sider key="leftSider" width={200} style={{background: '#fff', minHeight: '800px'}}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{height: '100%', borderRight: 0}}>
                        <SubMenu key="sub1" title={<span><Icon/>Android</span>}>
                            <Menu.Item key="1">option1</Menu.Item>
                            <Menu.Item key="2">option2</Menu.Item>
                            <Menu.Item key="3">option3</Menu.Item>
                            <Menu.Item key="4">option4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon/>前端</span>}>
                            <Menu.Item key="5">option5</Menu.Item>
                            <Menu.Item key="6">option6</Menu.Item>
                            <Menu.Item key="7">option7</Menu.Item>
                            <Menu.Item key="8">option8</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon/>Python</span>}>
                            <Menu.Item key="9">option9</Menu.Item>
                            <Menu.Item key="10">option10</Menu.Item>
                            <Menu.Item key="11">option11</Menu.Item>
                            <Menu.Item key="12">option12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout key="content" style={{padding: '0 24px 24px'}}>
                    <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280,}}>
                        <QueueAnim style={{display:'flex',flexDirection:'row',flexWrap:'wrap',backgroundColor:'#fff'}}　type={['right', 'left']} duration={1000}>
                            {this.renderContentItem()}
                        </QueueAnim>
                    </Content>
                </Layout>
            </Layout>
        );
    }


    /**
     * 渲染
     */
    renderContentItem() {
        if(this.state.message) {
            let itemStyle = {
                width: '33.3%',
                height: '100%',
                padding: '10px 20px',
            };

            let set = [];
            for(let i in this.state.message.data.items){
                let itemData = this.state.message.data.items[i];
                console.log(itemData.id);
                set.push(
                    <div style={itemStyle} key={itemData.id}>
                        <img width={"100%"} height={"100%"} src={itemData.article_image}/>
                        <h3>{itemData.title}</h3>
                        <span>{itemData.publish_date}</span>
                    </div>);
            }
            return set;
        }
    }
}