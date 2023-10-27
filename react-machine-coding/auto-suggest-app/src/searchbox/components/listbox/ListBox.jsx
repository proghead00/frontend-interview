/* eslint-disable react/prop-types */
import "./listBox.css";

const ListBox = ({ items, activeIndex }) => {
  return (
    <ul className="listBoxContainer">
      {items.map((item, index) => {
        return (
          <li
            className={`listBoxItem ${
              index === activeIndex ? "activeItem" : ""
            }`}
            key={index}
          >
            {item.name}
          </li>
        );
      })}
    </ul>
  );
};

export default ListBox;
