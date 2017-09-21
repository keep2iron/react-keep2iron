import React, {PropTypes} from 'react';
import {Button, Icon} from 'antd';
import QueueAnim from 'rc-queue-anim';
import TweenOne, {TweenOneGroup} from 'rc-tween-one';
import BannerAnim, {Element} from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import logoImage from '../../res/logo_image.png';
import indexBackground from '../../res/index_background.png';

const BgElement = Element.BgElement;

class Banner extends React.Component {
    render() {
        const props = {...this.props};
        delete props.isMode;
        const childrenData = [
            {
                title: '<img width="100%" src="' + logoImage + '" />',
                content: '',
                button: 'Let\'s go!',
            }
        ];
        const childrenToRender = childrenData.map((item, i) => {
            const title = item.title;
            const content = item.content;
            const button = item.button;
            return (
                <Element
                    key={i}
                    prefixCls="banner-user-elem">

                    <BgElement
                        className={`bg`}
                        style={{background: `url(${indexBackground})`}}
                        key="bg"
                    />

                    <QueueAnim
                        type={['bottom', 'top']} delay={200}
                        className={`${props.className}-title`}
                        key="text"
                        >
                      <span
                          className="logo"
                          key="logo"
                          id={`${props.id}-titleBlock${i}`}
                          dangerouslySetInnerHTML={{
                              __html: title,
                          }}/>
                        <p key="content" id={`${props.id}-contentBlock${i}`}>{content}</p>
                        <Button
                            type="ghost"
                            key="button"
                            id={`${props.id}-buttonBlock${i}`}
                        >
                            {button}
                        </Button>
                    </QueueAnim>

                    <QueueAnim
                        id="bottomText"
                        key="bottomText"
                        className="indexBottom"
                        type={['bottom', 'top']} delay={0}>
                        <span key="web">Web</span>
                        <span key="android">Android</span>
                        <span key="python">Python</span>
                    </QueueAnim>
                </Element>);
        });
        return (
            <OverPack
                {...props}
            >
                <TweenOneGroup
                    key="banner"
                    enter={{opacity: 0, type: 'from'}}
                    leave={{opacity: 0}}
                    component=""
                >
                    <div className={`${props.className}-wrapper`}>
                        <BannerAnim
                            key="banner"
                        >
                            {childrenToRender}
                        </BannerAnim>
                    </div>
                </TweenOneGroup>
                <TweenOne
                    animation={{y: '-=20', yoyo: true, repeat: -1, duration: 1000}}
                    className={`${props.className}-icon`}
                    style={{bottom: 40}}
                    key="icon"
                >
                    <Icon type="down"/>
                </TweenOne>
            </OverPack>
        );
    }
}

Banner.defaultProps = {
    className: 'banner1',
};

export default Banner;

