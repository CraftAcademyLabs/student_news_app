import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { Article } from "../modules/article";
import { Grid, Container } from "semantic-ui-react";
import ArticleItem from "./ArticleItem";

const Category = () => {
  const { category } = useParams();
  const { articles } = useSelector((state) => state);

  useEffect(() => {
    Article.index(category);
  }, [category]);

  let articleList = articles.map((articleItem) => {
    return <ArticleItem articleItem={articleItem} key={articleItem.id} />;
  });

  return (
    <>
      <Container>
        <Grid padded column="equal" centered stackable columns="3">
          <Grid.Row>{articleList}</Grid.Row>
        </Grid>
      </Container>
    </>
  );
};

export default Category;
