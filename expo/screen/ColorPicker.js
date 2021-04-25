import React from "react";
import styled from "styled-components";

const ColorCircle = styled.div`
  box-sizing: border-box;
  width: 35px;
  height: 35px;
  flex-shrink: 0;
  max-width: 100%;
  border-radius: 50%;
  cursor: pointer;
  ${p => p.color && `background: ${p.color};`};
  ${p =>
    p.selected &&
    `border: 5px solid ${
      p.color
    }; background: white; transition: all .2s ease-in-out; transform: scale(1.5)`};
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${ColorCircle} {
    margin: 10px 20px 0px 0px;
  }
`;

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedColor: this.props.selColor
    };
  }

  setColor = color => {
    this.setState({ selectedColor: color });
    this.props.onChange(color);
  };

  render() {
    const { colors } = this.props;
    const { selectedColor } = this.state;

    return (
      <Wrapper>
        {colors.map(color => {
          return (
            <ColorCircle
              color={color}
              selected={color === selectedColor}
              onClick={() => this.setColor(color)}
            />
          );
        })}
      </Wrapper>
    );
  }
}

export default ColorPicker;


