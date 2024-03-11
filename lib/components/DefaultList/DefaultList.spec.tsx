import React from 'react';
import { RefreshControl, SectionListData } from 'react-native';

import { render, fireEvent } from '@testing-library/react-native';

import DefaultList from '.';
import Text from '../Text';

type PersonType = {
  name: string;
  age: number;
};

type PersonSectionType = SectionListData<PersonType, { title: string }>;

const PERSONS_LIST: PersonType[] = [
  {
    name: 'Douglas',
    age: 33,
  },
  {
    name: 'Bruna',
    age: 34,
  },
  {
    name: 'Arthur',
    age: 2,
  },
];

const PERSONS_SECTIONS: PersonSectionType[] = [
  {
    title: 'Homens',
    data: [
      {
        name: 'Douglas',
        age: 33,
      },

      {
        name: 'Arthur',
        age: 2,
      },
    ],
  },
  {
    title: 'Mulheres',
    data: [
      {
        name: 'Bruna',
        age: 34,
      },
    ],
  },
];

describe('DefaultList snapshot', () => {
  it('flat', () => {
    const tree = render(
      <DefaultList<PersonType>
        data={PERSONS_LIST}
        renderItem={({ item }) => (
          <Text>
            {item.name}
            {' - '}
            {item.age}
          </Text>
        )}
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('sections', () => {
    const tree = render(
      <DefaultList<PersonType, PersonSectionType>
        variant="section"
        sections={PERSONS_SECTIONS}
        renderSectionHeader={({ section }) => (
          <Text>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <Text>
            {item.name}
            {' - '}
            {item.age}
          </Text>
        )}
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('ListFooterComponent', () => {
    const tree = render(
      <DefaultList<PersonType, PersonSectionType>
        data={PERSONS_LIST}
        renderItem={({ item }) => (
          <Text>
            {item.name}
            {' - '}
            {item.age}
          </Text>
        )}
        ListFooterComponent={(
          <Text>Footer</Text>
        )}
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('endListMessage', () => {
    const tree = render(
      <DefaultList<PersonType, PersonSectionType>
        data={PERSONS_LIST}
        renderItem={({ item }) => (
          <Text>
            {item.name}
            {' - '}
            {item.age}
          </Text>
        )}
        endListMessage="Fim da lista"
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('DefaultList events', () => {
  const handleRefresh = jest.fn();

  const tree = render(
    <DefaultList<PersonType, PersonSectionType>
      sections={PERSONS_SECTIONS}
      renderItem={({ item }) => (
        <Text>
          {item.name}
          {' - '}
          {item.age}
        </Text>
      )}
      onRefresh={handleRefresh}
    />,
  );

  const flatList = tree.UNSAFE_getByType(RefreshControl);
  fireEvent(flatList, 'refresh');

  expect(handleRefresh).toBeCalled();
});
