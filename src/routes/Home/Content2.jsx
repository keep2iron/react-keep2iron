import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import bezierIndicator from '../../res/bezier_indicator.gif';

class Content extends React.Component {

    static defaultProps = {
        className: 'content1',
    };

    render() {
        const props = {...this.props};
        const isMode = props.isMode;
        delete props.isMode;
        const animType = {
            queue: isMode ? 'bottom' : 'left',
            one: isMode ? {y: '+=30', opacity: 0, type: 'from'}
                : {x: '+=30', opacity: 0, type: 'from'},
        };
        return (
            <div
                {...props}
                className={`content-template-wrapper content-half-wrapper ${props.className}-wrapper`}
            >
                <OverPack
                    className={`content-template ${props.className}`}
                    location={props.id}
                >
                    <QueueAnim
                        type={animType.queue}
                        className={`${props.className}-text`}
                        key="text"
                        leaveReverse
                        ease={['easeOutCubic', 'easeInCubic']}
                        id={`${props.id}-textWrapper`}
                    >
                        <h1 key="h1" id={`${props.id}-title`}>
                            难死程序员系列-BezierIndicator
                        </h1>
                        <p key="p" id={`${props.id}-content`}>
                            这个项目是因为之前看到了一个项目，然后正是由于扔物线的博客，开启了我自定义控件的一个大门，
                            效果图如图所示，项目托管在了<a href="https://github.com/keep2iron/BezierIndicator">Github</a>上面.
                        </p>
                    </QueueAnim>
                    <TweenOne
                        key="img"
                        animation={animType.one}
                        className={`${props.className}-img`}
                        id={`${props.id}-imgWrapper`}
                        resetStyleBool
                    >
            <span id={`${props.id}-img`}>
              <img width="100%" src={bezierIndicator}/>
            </span>
                    </TweenOne>
                </OverPack>
            </div>
        );
    }
}

export default Content;
