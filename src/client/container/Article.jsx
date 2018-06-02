import React from 'react'
import { connect } from "react-redux"
import { getArticles } from '../redux/action/article.action'

@connect(
  state => ({
    $$articles: state.articleReducer.get('articles')
  }),
  {
    getArticles,
  }
)
class Article extends React.Component {
  componentDidMount() {
    console.log("componentDidMount");
    this.props.getArticles()
  }
  render() {
    const articles = this.props.$$articles.toJS()
    return (
      <div>
        {
          articles.map(art => (
            <div key={art._id}>
              <p>{art.name}</p>
              <p>{art.title}</p>
              <p>{art.content}</p>
            </div>
          ))

        }
      </div>
    )
  }
}

export default Article