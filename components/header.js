import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Title, Subtitle } from 'native-base';

export default class HeaderTitleSubtitleExample extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Punch Speed</Title>
            <Subtitle>Measure punch velocity</Subtitle>
          </Body>
          <Right />
        </Header>
      </Container>
    );
  }
}