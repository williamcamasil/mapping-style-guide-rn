import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';
import { createNavigationMock } from 'mapping-context-rn';
import renderer from 'react-test-renderer';

import NavigationBar from '.';
import { Icons } from '../../assets';
import { DefaultTheme } from '../../theme';
import Text from '../Text';

describe('NavigationBar events', () => {
  it('Should not render the title in component', () => {
    const result = render(<NavigationBar />);

    const titleComponent = result.getByTestId('navigation-bar-title');

    expect(titleComponent.props.children).toBeUndefined();
  });

  it('Should show the title in component', () => {
    const result = render(<NavigationBar title="Teste de título" />);

    const titleComponent = result.getByTestId('navigation-bar-title');

    expect(titleComponent.props.children).toBe('Teste de título');
  });

  it('Should render only the icon back in the left', () => {
    const result = render(<NavigationBar />);

    const buttonBack = result.getByTestId('go-back-action');

    expect(buttonBack).toBeDefined();
  });

  it('Should to render component in right', () => {
    const result = render(<NavigationBar
      title="Teste de título"
      rightContent={(
        <NavigationBar.Action
          testID="question-svg"
          Icon={Icons.Thin.Help}
        />
      )}
    />);

    const component = result.getByTestId('question-svg');

    expect(component).toBeDefined();
  });

  it('Should to render component in right with a text', () => {
    const result = render(<NavigationBar
      title="Teste de título"
      rightContent={(
        <NavigationBar.Action
          testID="question-svg"
          text="Ajuda"
          color="neutralGray600"
          Icon={Icons.Thin.Help}
        />
      )}
    />);

    const component = result.getByTestId('text-right');

    expect(component).toBeDefined();
  });

  it('Should to render component in right with a text color default', () => {
    const result = render(<NavigationBar
      title="Teste de título"
      rightContent={(
        <NavigationBar.Action
          testID="question-svg"
          text="Ajuda"
          Icon={Icons.Thin.Help}
        />
      )}
    />);

    const component = result.getByTestId('text-right');

    expect(component).toBeDefined();
  });

  it('Should to render component with light content', () => {
    const result = render(<NavigationBar
      title="Teste de título"
      variant="light-content"
    />);

    const componentText = result.getByTestId('navigation-bar-title');

    expect(componentText.props.style.color).toBe(DefaultTheme.colors.neutralWhite);
  });

  it('Should call event onBackPress in click of button call the navigation', () => {
    const navigation = createNavigationMock();

    const result = render(<NavigationBar title="Teste de título" />);

    const button = result.getByTestId('go-back-action');

    fireEvent.press(button);

    expect(navigation.goBack).toBeCalled();
  });

  it('Should call event onBackPress in click of button with personal function', () => {
    const backPress = jest.fn();

    const result = render(<NavigationBar title="Teste de título" onBackPress={backPress} />);

    const button = result.getByTestId('go-back-action');

    fireEvent.press(button);

    expect(backPress).toHaveBeenCalled();
  });
});

describe('NavigationBar snapshots', () => {
  it('should match snapshot default', () => {
    const tree = renderer.create(<NavigationBar title="Teste de título" />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with close icon', () => {
    const tree = renderer.create(<NavigationBar title="Teste de título" closeIcon />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with children', () => {
    const tree = renderer.create(
      <NavigationBar>
        <Text>
          Qualquer conteúdo
        </Text>
      </NavigationBar>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with light-content', () => {
    const tree = renderer.create(<NavigationBar title="Teste de título" variant="light-content" />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with custom status bar', () => {
    const tree = renderer
      .create(<NavigationBar
        title="Teste de título"
        statusBarTranslucent={false}
        statusBarBackgroundColor="#ff0000"
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('should match snapshot with divider', () => {
    const tree = renderer
      .create(<NavigationBar
        title="Teste de título"
        statusBarTranslucent={false}
        addDivider
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
