
import React from 'react'
import { connect } from 'react-redux'
import { Switch, Button, List, InputItem, WhiteSpace, TextareaItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import { changeMyListVisible } from '../redux/action/record.action'

@connect(
    null,
    {
        changeMyListVisible,
    }
)

class AddRecord extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this)
    }
    submit() {
        console.log(this.props.form.getFieldsValue())
        this.props.changeMyListVisible(true)
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div>
                <List renderHeader={() => '标题'}>
                    <InputItem
                        {...getFieldProps('title')}
                        type="text"
                        clear={true}
                    ></InputItem>
                </List>

                <List renderHeader={() => '内容'}>
                    <TextareaItem
                        {...getFieldProps('content', {
                            initialValue: '',
                        })}
                        rows={14}
                    // count={10000}
                    />
                </List>
                <Button
                    type="primary"
                    onClick={this.submit}
                >发表</Button>
            </div>

        );
    }
}

export default createForm()(AddRecord);
