import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';

import { SelectableItemType } from './index';

import { Selectable } from '..';

type Item = {
  id: number;
  name: string;
};

const items: SelectableItemType<Item>[] = [
  {
    key: 1,
    label: 'Conta corrente / Movimentação',
    item: { id: 1, name: 'Conta corrente / Movimentação' },
  },
  {
    key: 2,
    label: 'Investimento',
    item: { id: 2, name: 'Investimento' },
  },
  {
    key: 3,
    label: 'Operação de Crédito',
    item: { id: 3, name: 'Operação de Crédito' },
  },
  {
    key: 4,
    label: 'Produtos / Serviços',
    item: { id: 4, name: 'Produtos / Serviços' },
  },
  {
    key: 5,
    label: 'Outros',
    item: { id: 5, name: 'Outros' },
  },
];

describe('Selectable', () => {
  it('Should render all items, with none selected', () => {
    const jsonScreen = render(<Selectable options={items} onChange={jest.fn()} value={[]} />).toJSON();
    expect(jsonScreen).toMatchSnapshot();
  });

  it('Should render all items, with the first two selected', () => {
    const jsonScreen = render(<Selectable
      options={items}
      onChange={jest.fn()}
      value={[
        {
          key: 1,
          label: 'Conta corrente / Movimentação',
          item: { id: 1, name: 'Conta corrente / Movimentação' },
        },
        {
          key: 2,
          label: 'Investimento',
          item: { id: 2, name: 'Investimento' },
        },
      ]}
    />).toJSON();
    expect(jsonScreen).toMatchSnapshot();
  });

  it('Should call onChange when one of the items is selected', async () => {
    const onChange = jest.fn();
    const screen = render(<Selectable options={items} onChange={onChange} value={[]} />);
    onChange.mockClear();
    const button = await screen.findByTestId('selectable-button-item-3');
    fireEvent.press(button);

    expect(onChange).toHaveBeenCalledWith([
      {
        key: 4,
        label: 'Produtos / Serviços',
        item: { id: 4, name: 'Produtos / Serviços' },
      },
    ]);
  });

  it('Should deselect the item when clicked after it is already selected', async () => {
    const onChange = jest.fn();
    const screen = render(
      <Selectable
        options={items}
        onChange={onChange}
        value={[
          {
            key: 1,
            label: 'Conta corrente / Movimentação',
            item: { id: 1, name: 'Conta corrente / Movimentação' },
          },
          {
            key: 2,
            label: 'Investimento',
            item: { id: 2, name: 'Investimento' },
          },
        ]}
      />,
    );
    const button = await screen.findByTestId('selectable-button-item-0');
    fireEvent.press(button);

    expect(onChange).toHaveBeenLastCalledWith([
      {
        key: 2,
        label: 'Investimento',
        item: { id: 2, name: 'Investimento' },
      },
    ]);
  });
});
