import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import fast4android from '../../res/fast4android.png';

class Content extends React.Component {
    static defaultProps = {
        className: 'content0',
    };

    render() {
        const props = {...this.props};
        const isMode = props.isMode;
        delete props.isMode;
        const animType = {
            queue: isMode ? 'bottom' : 'right',
            one: isMode ? {y: '+=30', opacity: 0, type: 'from'}
                : {x: '-=30', opacity: 0, type: 'from'},
        }
        return (
            <div
                {...props}
                className={`content-template-wrapper content-half-wrapper ${props.className}-wrapper`}
            >
                <OverPack
                    className={`content-template ${props.className}`}
                    location={props.id}
                >
                    <TweenOne
                        key="img"
                        animation={animType.one}
                        className={`${props.className}-img`}
                        id={`${props.id}-imgWrapper`}
                        resetStyleBool
                    >
            <span id={`${props.id}-img`}>
              <img width="100%" src={fast4android}/>
            </span>
                    </TweenOne>
                    <QueueAnim
                        className={`${props.className}-text`}
                        type={animType.queue}
                        key="text"
                        leaveReverse
                        ease={['easeOutCubic', 'easeInCubic']}
                        id={`${props.id}-textWrapper`}
                    >
                        <h1 key="h1" id={`${props.id}-title`}>
                            快速开发框架
                        </h1>
                        <p key="p" id={`${props.id}-content`}>
                            Dagger 2 + mvp + retrofit2.0 + rxjava2.0一个快速开发的android框架，复用了很多控件，以模块化开发的思想来进行开发，适合多人项目，可以作为开发新项目的一个基础框架。
                        </p>
                    </QueueAnim>
                </OverPack>
            </div>
        );
    }
}


export default Content;
