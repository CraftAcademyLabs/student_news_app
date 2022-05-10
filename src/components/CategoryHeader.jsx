import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const CategoryHeader = () => {
  const { categories } = useSelector((state) => state);
  const [activeItem, setActiveItem] = useState("business");

  let categoriesList = categories.map((category, index) => {
    
    return (
      <Menu.Item
        data-cy={`${category}-category`}
        name={category}
        as={Link}
        to={{ pathname: `/category/${category}` }}
        key={index}
        active={activeItem === category}
        onClick={() => setActiveItem(category)}
      >
        {category}
      </Menu.Item>
    );
  });

  return (
    <Menu pointing secondary data-cy="category-list">
      {categoriesList}
    </Menu>
  );
};

export default CategoryHeader;
