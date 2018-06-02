
import React from 'react'
import { connect } from 'react-redux'
import { Switch, Button, List, InputItem, WhiteSpace, TextareaItem } from 'antd-mobile';
import { changeMyListVisible, addRecord, recordingArticle } from '../redux/action/record.action'

@connect(
    state => ({
        storedArticle: state.recordReducer.get('storedArticle'),
    }),
    {
        changeMyListVisible,
        addRecord,
        recordingArticle,
    }
)

class AddRecord extends React.Component {
    constructor(props) {
        super(props);
        this.storeTitle = this.storeTitle.bind(this)
        this.storeContent = this.storeContent.bind(this)
        this.submit = this.submit.bind(this)
    }
    storeTitle(val) {
        this.props.recordingArticle({ title: val })
    }
    storeContent(val) {
        this.props.recordingArticle({ content: val })
    }
    submit() {
        const { title = '', content = '' } = this.props.storedArticle.toJS()
        this.props.addRecord({ title, content })
            .then(res => {
                this.props.recordingArticle({ title:'', content: '' })
                this.props.changeMyListVisible(true)
            })
            .catch(err => console.log(err))
    }
    render() {
        const { title = '', content = '' } = this.props.storedArticle.toJS()
        return (
            <div>
                <List renderHeader={() => '标题'}>
                    <InputItem
                        value={title}
                        onChange={this.storeTitle}
                        type="text"
                        clear={true}
                    ></InputItem>
                </List>

                <List renderHeader={() => '内容'}>
                    <TextareaItem
                        value={content}
                        onChange={this.storeContent}
                        rows={10}
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

export default AddRecord;
