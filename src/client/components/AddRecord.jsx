
import React from 'react'
import { connect } from 'react-redux'
import { Switch, Button, List, InputItem, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import { login } from '../redux/action/user.action';

@connect(
    null,
    {
        login,
    }
)

class AddRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: ''
        }
        this.titleChange = this.titleChange.bind(this)
        this.contentChange = this.contentChange.bind(this)
        this.submit = this.submit.bind(this)
    }
    titleChange(val) {
        this.setState({ title: val })
    }
    contentChange(val) {
        this.setState({ content: val })
    }
    submit() {
        console.log(this.state)
        this.props.onChange()
    }
    render() {
        const { getFieldProps } = this.props.form;
        const { title, content } = this.state;
        return (
            <List>
                <WhiteSpace/>
                <InputItem
                    {...getFieldProps('title')}
                    type="text"
                    // clear={true}
                    value={title}
                    onChange={this.titleChange}
                >标题</InputItem>
                <WhiteSpace />
                <InputItem
                    {...getFieldProps('content')}
                    type="text"
                    // clear={true}
                    value={content}
                    onChange={this.contentChange}
                >内容</InputItem>
                <WhiteSpace />
                <Button
                    type="primary"
                    onClick={this.submit}
                >发表</Button>

            </List>
        );
    }
}

export default createForm()(AddRecord);
