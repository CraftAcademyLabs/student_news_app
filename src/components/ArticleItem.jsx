import React from "react";
import { Link } from "react-router-dom";
import { Segment, Grid } from "semantic-ui-react";

const ArticleItem = ({ articleItem }) => {
  const milliseconds = Date.parse(articleItem.updated_at)
  const date = new Date(milliseconds).toLocaleDateString()

  return (
    <Grid.Column data-cy="minor-news-section">
      <Segment
        data-cy={`article-${articleItem.id}`}
        as={Link}
        to={{ pathname: `/articles/${articleItem.id}` }}
        basic
      >
        <h3 data-cy="title"> {articleItem.title}</h3>
        <div data-cy="lede">{articleItem.lede}</div>
        <h5 data-cy="authors">{articleItem.authors[0].name}</h5>
        <div data-cy="updated_at">{date}</div>
      </Segment>
    </Grid.Column>
  );
};

export default ArticleItem;
