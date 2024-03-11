import React from 'react';
import { View } from 'react-native';

import {
  render, fireEvent,
} from '@testing-library/react-native';

import MenuOption from '.';
import { Icons } from '../../assets';
import { DefaultTheme } from '../../theme';
import Text from '../Text';

describe('MenuOption snapshots', () => {
  it('default', () => {
    const result = render(
      <MenuOption
        textColor="neutralGray700"
        description="Lorem Ipsum is simply dummy"
        Icon={Icons.Default.Email}
      >
        Minha conta
      </MenuOption>,
    ).toJSON();

    expect(result).toMatchSnapshot();
  });

  it('custom right component', () => {
    const result = render(
      <MenuOption
        textColor="neutralGray700"
        description="Lorem Ipsum is simply dummy"
        Icon={Icons.Default.Email}
        rightContent={(
          <View>
            <Text>
              Clique aqui
            </Text>
          </View>
        )}
      >
        Minha conta
      </MenuOption>,
    ).toJSON();

    expect(result).toMatchSnapshot();
  });
});

describe('MenuOption Component', () => {
  it('should render button with name title and description', async () => {
    const result = render(
      <MenuOption
        onPress={() => {}}
        textColor="neutralGray700"
        textVariant="subtitle"
        description="Lorem Ipsum is simply dummy"
      >
        Minha conta
      </MenuOption>,
    );

    await result.findByText('Lorem Ipsum is simply dummy');
    await result.findByText('Minha conta');
  });

  it('should have action in button and description', () => {
    const mockFunction = jest.fn();
    const result = render(
      <MenuOption
        onPress={mockFunction}
        textColor="neutralGray700"
        testID="button-action"
      >
        Minha conta
      </MenuOption>,
    );

    const menu = result.getByTestId('button-action');
    fireEvent.press(menu);

    expect(mockFunction).toHaveBeenCalled();
  });

  it('should render default color icon', async () => {
    const result = render(
      <MenuOption
        onPress={() => {}}
        textColor="neutralGray700"
        Icon={Icons.Default.Desktop}
      >
        Minha conta
      </MenuOption>,
    );

    expect(result.getByTestId('icon')).toBeTruthy();
  });

  it('should render description with prop numberOfLines to equal 1', async () => {
    const result = render(
      <MenuOption
        onPress={() => {}}
        textColor="neutralGray700"
        Icon={Icons.Default.Desktop}
        descriptionNumberOfLines={1}
        description="Lorem Ipsum is simply dummy"
      >
        Minha conta
      </MenuOption>,
    );

    const text = result.getByText('Lorem Ipsum is simply dummy');

    expect(text.props.numberOfLines).toBe(1);
  });

  it('should render icon and arrow', async () => {
    const result = render(
      <MenuOption
        onPress={() => {}}
        textColor="neutralGray700"
        Icon={Icons.Default.Desktop}
        iconColor="neutralBlack"
        rightContent={<Icons.Small.Right color={DefaultTheme.colors.neutralGray500} testID="arrow-menu" />}
      >
        Minha conta
      </MenuOption>,
    );

    expect(result.getByTestId('icon')).toBeTruthy();
    expect(result.getByTestId('arrow-menu')).toBeTruthy();
  });
});
