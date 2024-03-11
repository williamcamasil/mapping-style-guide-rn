import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';

import Chip, { ChipItemType } from '.';
import { Icons } from '../../assets';

type Item = {
  id: number;
  name: string;
};

const items: ChipItemType<Item>[] = [
  {
    key: 1,
    label: 'Conta corrente',
    item: { id: 1, name: 'Conta corrente' },
  },
  {
    key: 2,
    label: 'Conta poupança',
    item: { id: 2, name: 'Conta poupança' },
  },
  {
    key: 3,
    label: 'Mesma titularidade',
    item: { id: 3, name: 'Mesma titularidade' },
  },
  {
    key: 4,
    label: 'Outra titularidade',
    item: { id: 4, name: 'Outra titularidade' },
  },
  {
    key: 5,
    label: 'Outros',
    item: { id: 5, name: 'Outros' },
  },
];

describe('Chip', () => {
  it('Should render all items, with first one selected (default)', () => {
    const jsonScreen = render(
      <Chip
        options={items}
        onChange={jest.fn()}
        value={items[0]}
      />,
    ).toJSON();
    expect(jsonScreen).toMatchSnapshot();
  });

  it('Should render all items, with none selected (single optional)', () => {
    const jsonScreen = render(
      <Chip
        options={items}
        onChange={jest.fn()}
        value={null}
      />,
    ).toJSON();
    expect(jsonScreen).toMatchSnapshot();
  });

  it('Should render inline', () => {
    const jsonScreen = render(
      <Chip
        options={items}
        onChange={jest.fn()}
        value={null}
        inline
      />,
    ).toJSON();
    expect(jsonScreen).toMatchSnapshot();
  });

  it('Should render all items with icons (default)', () => {
    const itemsWithIcons = items.map((item: ChipItemType<Item>) => ({
      ...item,
      Icon: Icons.Default.Bank,
    }));
    const jsonScreen = render(
      <Chip
        options={itemsWithIcons}
        onChange={jest.fn()}
        value={items[0]}
      />,
    ).toJSON();
    expect(jsonScreen).toMatchSnapshot();
  });

  it('Should render all items, with the first two selected (multiple)', () => {
    const jsonScreen = render(<Chip
      options={items}
      onChange={jest.fn()}
      multiple
      value={[
        {
          key: 1,
          label: 'Conta corrente',
          item: { id: 1, name: 'Conta corrente' },
        },
        {
          key: 2,
          label: 'Conta poupança',
          item: { id: 2, name: 'Conta poupança' },
        },
      ]}
    />).toJSON();
    expect(jsonScreen).toMatchSnapshot();
  });

  it('Should render all items, with none selected (multiple)', () => {
    const jsonScreen = render(<Chip
      options={items}
      onChange={jest.fn()}
      multiple
      value={[]}
    />).toJSON();
    expect(jsonScreen).toMatchSnapshot();
  });

  it('Should call onChange when one of the items is selected (multiple)', async () => {
    const onChange = jest.fn();
    const screen = render(
      <Chip
        options={items}
        onChange={onChange}
        multiple
        value={[]}
      />,
    );
    onChange.mockClear();
    const button = await screen.findByTestId('chip-button-item-3');
    fireEvent.press(button);

    expect(onChange).toHaveBeenCalledWith([
      {
        key: 4,
        label: 'Outra titularidade',
        item: { id: 4, name: 'Outra titularidade' },
      },
    ]);
  });

  it('Should deselect the item when clicked after it is already selected (multiple)', async () => {
    const onChange = jest.fn();
    const screen = render(
      <Chip
        options={items}
        onChange={onChange}
        multiple
        value={[
          {
            key: 1,
            label: 'Conta corrente',
            item: { id: 1, name: 'Conta corrente' },
          },
          {
            key: 2,
            label: 'Conta poupança',
            item: { id: 2, name: 'Conta poupança' },
          },
        ]}
      />,
    );
    const button = await screen.findByTestId('chip-button-item-0');
    fireEvent.press(button);

    expect(onChange).toHaveBeenLastCalledWith([
      {
        key: 2,
        label: 'Conta poupança',
        item: { id: 2, name: 'Conta poupança' },
      },
    ]);
  });

  it('Should deselect the item when clicked after it is already selected (single optional)', async () => {
    const onChange = jest.fn();
    const screen = render(
      <Chip
        options={items}
        onChange={onChange}
        optional
        value={{
          key: 2,
          label: 'Conta poupança',
          item: { id: 2, name: 'Conta poupança' },
        }}
      />,
    );
    const button = await screen.findByTestId('chip-button-item-1');
    fireEvent.press(button);

    expect(onChange).toHaveBeenLastCalledWith(null);
  });

  it('Should not deselect the item when clicked after it is already selected (single non optional)', async () => {
    const onChange = jest.fn();
    const screen = render(
      <Chip
        options={items}
        onChange={onChange}
        value={{
          key: 2,
          label: 'Conta poupança',
          item: { id: 2, name: 'Conta poupança' },
        }}
      />,
    );
    onChange.mockClear();
    const button = await screen.findByTestId('chip-button-item-1');
    fireEvent.press(button);

    expect(onChange).toHaveBeenCalledWith({
      key: 2,
      label: 'Conta poupança',
      item: { id: 2, name: 'Conta poupança' },
    });
  });
});
