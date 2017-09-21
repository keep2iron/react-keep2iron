import React from 'react';
import QueueAnim from 'rc-queue-anim';
import {Layout, Form, Input, Select, DatePicker, Button,TimePicker,Card, Col, Row,message} from 'antd';
import './less/time.less'
import CountDown from "./CountDown";
import {HOST} from "../../extra/constants";
import {http_get} from "../../extra/network";


const {Content, Sider} = Layout;
const FormItem = Form.Item;
const Option = Select.Option;


class Time extends React.Component{

    constructor(){
        super();
        this.state = {
            message:null
        };
        this.queryBlog();
    }

    queryBlog(){
        http_get(HOST + 'count_down/query',{page:1},(resp)=>{
            console.log(resp);
            this.setState({message:resp});
        });
    }

    addBlog(values){
        let params = {
            name: values.name,
            description: values.description,
            date: values.datePicker.format('YYYY-MM-DD'),
            time: values.timePicker.format('HH:mm:ss'),
            level:values.level
        }

        http_get(HOST + "count_down/add",params,(resp)=>{
            if(resp.code == 200) {
                let mydate = new Date();
                let uuid = "uuid"+mydate.getDay()+ mydate.getHours()+ mydate.getMinutes()+mydate.getSeconds()+mydate.getMilliseconds();
                message.success('添加成功');
                this.state.message.data.items.push({
                    ...params,
                    id:uuid
                });
                this.setState({message:this.state.message});
            }else{
                message.warning("服务器异常");
            }
        },(error)=>{
            message.error('网络原因,添加失败');
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this);
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.addBlog(values);
            }
        });
        return true;
    }


    renderContentItem(){
        let levelArr = ['common-card-head','important-card-head','very-important-card-head']

        if(this.state.message){
            let set = [];
            for(let i in this.state.message.data.items){
                let item = this.state.message.data.items[i];
                set.push(<Col span={8} style={{padding:24}} key={item.id}>
                    <Card className={levelArr[item.level]} title={item.name} bordered={false}　　>
                        <h3>{item.description}</h3>
                        <CountDown style={{lineHeight:'40px'}} date={item.date} time={item.time}/>
                    </Card>
                </Col>);
            }
            return set;
        }
    }


    render(){
        const { formLayout } = {formLayout:'inline'};

        const { getFieldDecorator } = this.props.form;

        const config = {
            rules: [{ type: 'object', required: true, message: '请选择时间!' }],
        };


        return (
            <Layout key="layoutContent">
                <Layout key="content" style={{padding: '0 24px 24px'}}>
                    <Content style={{background: '#fff', padding: 24, margin: 0,}}>
                        <Form method="get" layout={formLayout} onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem
                                label="名称"
                                hasFeedback>
                                {getFieldDecorator('name', {
                                    rules: [{
                                        required: true,message: '名称不能为空!',
                                    },],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem
                                label="简介"
                                hasFeedback>
                                {getFieldDecorator('description', {
                                    rules: [{
                                        required: false,message: '名称不能为空!',
                                    },],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem
                                label="日期"
                            >
                                {getFieldDecorator('datePicker', config)(
                                    <DatePicker />
                                )}
                            </FormItem>
                            <FormItem
                                label="时间"
                            >
                                {getFieldDecorator('timePicker', config)(
                                    <TimePicker />
                                )}
                            </FormItem>
                            <FormItem
                                label="优先级"
                                hasFeedback
                            >

                                {getFieldDecorator('level', {
                                    initialValue: "0",
                                    rules: [
                                        { required: true, message: '请选择一个优先级' },
                                    ],
                                })(
                                    <Select>
                                        <Option value="0" >普通</Option>
                                        <Option value="1">一般</Option>
                                        <Option value="2">重要</Option>

                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                wrapperCol={{
                                    xs: { span: 24, offset: 0 },
                                    sm: { span: 30, offset: 0 },
                                }}
                            >
                                <Button type="primary" htmlType="submit">提交</Button>
                            </FormItem>
                        </Form>
                    </Content>

                    <Content style={{background: '#fff', padding: 24, margin: 0,minHeight:800,marginTop:1}}>
                        <Row gutter={16}>
                            <QueueAnim type={['right', 'left']} duration={1000}>
                                {this.renderContentItem()}
                            </QueueAnim>
                        </Row>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}



export const WrappedRegistrationForm = Form.create()(Time);