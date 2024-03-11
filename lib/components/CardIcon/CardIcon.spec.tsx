import React from 'react';

import { render } from '@testing-library/react-native';

import CardIcon from '.';
import { Icons } from '../../assets';
import { DefaultTheme } from '../../theme';
import Text from '../Text';
import PhysicalPerson from './sample-top-title.svg';
import { getIconColor } from './utils';

describe('CardIcon snapshot', () => {
  it('default', () => {
    const tree = render(
      <CardIcon
        Icon={(Icons.Default.EyeOn)}
        iconColor={DefaultTheme.colors.primaryMain}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('no Icon', () => {
    const tree = render(
      <CardIcon />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('CardIcon default with title card small', () => {
    const result = render(
      <CardIcon
        Icon={(Icons.Default.EyeOn)}
        iconColor={DefaultTheme.colors.primaryMain}
        size="small"
        bottomTitle="Mock title"
      />,
    );

    const title = result.getByTestId('title');

    expect(title).toBeDefined();
    expect(title.props?.style.fontSize).toEqual(DefaultTheme.typography.sizes.XS);
    expect(result.toJSON()).toMatchSnapshot();
  });

  it('CardIcon default with bottomTtitle and description in card big', () => {
    const result = render(
      <CardIcon
        Icon={(Icons.Default.EyeOn)}
        iconColor={DefaultTheme.colors.primaryMain}
        size="big"
        topTitle={(PhysicalPerson)}
        bottomTitle="Mock title"
        description="Mock description"
      />,
    );

    const title = result.getByTestId('title');
    const description = result.getByTestId('description');

    expect(title).toBeDefined();
    expect(title.props?.style.color).toEqual(DefaultTheme.colors.neutralGray700);
    expect(description).toBeDefined();
    expect(description.props?.style.color).toEqual(DefaultTheme.colors.neutralGray600);
    expect(result.toJSON()).toMatchSnapshot();
  });

  it('CardIcon default with title card big', () => {
    const result = render(
      <CardIcon
        Icon={(Icons.Default.EyeOn)}
        iconColor={DefaultTheme.colors.primaryMain}
        size="big"
        bottomTitle="Mock title"
      />,
    );

    const title = result.getByTestId('title');

    expect(title).toBeDefined();
    expect(title.props?.style.fontSize).toEqual(DefaultTheme.typography.sizes.small);
    expect(result.toJSON()).toMatchSnapshot();
  });

  it('CardIcon with children content', () => {
    const result = render(
      <CardIcon
        Icon={(Icons.Default.EyeOn)}
        iconColor={DefaultTheme.colors.primaryMain}
      >
        <Text>Mock children</Text>
      </CardIcon>,
    );

    const viewContentChildrens = result.getByTestId('card-icon-view-content').children;

    expect((viewContentChildrens[1] as any).props.children).toBe('Mock children');
    expect(result.toJSON()).toMatchSnapshot();
  });

  it('CardIcon with arrow icon', () => {
    const result = render(
      <CardIcon
        Icon={(Icons.Default.EyeOn)}
        iconColor={DefaultTheme.colors.primaryMain}
        size="big"
        topTitle={(PhysicalPerson)}
        bottomTitle="Mock title"
        description="Mock description"
        showArrow
      />,
    );

    expect(result.toJSON()).toMatchSnapshot();
  });

  it('CardIcon with highlighted100', () => {
    const result = render(
      <CardIcon
        Icon={(Icons.Default.EyeOn)}
        iconColor={DefaultTheme.colors.primaryMain}
        variant="highlighted100"
        size="big"
        topTitle={(<PhysicalPerson />)}
        bottomTitle="Mock title"
        description="Mock description"
      />,
    );

    expect(result.getByTestId('title').props?.style.color).toEqual(DefaultTheme.colors.neutralWhite);
    expect(result.getByTestId('description').props?.style.color).toEqual(DefaultTheme.colors.neutralWhite);
  });
});

describe('utils', () => {
  it('getIconColor default', () => {
    const iconColor = getIconColor(DefaultTheme);

    expect(iconColor).toEqual(DefaultTheme.colors.primaryMain);
  });

  it('getIconColor with custom color', () => {
    const iconColor = getIconColor(DefaultTheme, DefaultTheme.colors.primary100, 'highlighted100');

    expect(iconColor).toEqual(DefaultTheme.colors.primary100);
  });

  it('getIconColor with cardType highlighted100', () => {
    const iconColor = getIconColor(DefaultTheme, undefined, 'highlighted100');

    expect(iconColor).toEqual(DefaultTheme.colors.neutralWhite);
  });

  it('getIconColor with cardType highlighted50', () => {
    const iconColor = getIconColor(DefaultTheme, undefined, 'highlighted50');

    expect(iconColor).toEqual(DefaultTheme.colors.primaryMain);
  });
});

describe('CardIcon', () => {
  it('show on loading', async () => {
    const result = render(
      <CardIcon
        Icon={(Icons.Default.EyeOn)}
        iconColor={DefaultTheme.colors.primaryMain}
        loading
      />,
    );

    const touchables = result.queryByTestId('card-touchable');

    const shimmerId = result.getByTestId('shimmer-id');

    expect(shimmerId).toBeTruthy();
    expect(touchables).toBeNull();
  });
});
