import React from 'react';

import {
  render, fireEvent, within, waitFor,
} from '@testing-library/react-native';

import InputSelect from '.';
import DefaultList from '../DefaultList';
import ModalProvider from '../Modal/ModalProvider';
import { InputSelectResponseType, InputSelectValueType } from './utils';

jest.mock('react-native/Libraries/Utilities/Platform', () => {
  const Platform = jest.requireActual(
    'react-native/Libraries/Utilities/Platform',
  );
  Platform.OS = 'android';
  return Platform;
});

type TodoType = {
  id: number;
  title: string;
};

const mapRecord = (item: TodoType): InputSelectValueType<TodoType> => ({
  label: `${item.id} - ${item.title}`,
  key: String(item.id),
  item,
});

const requestRecordsSuccess = async (): InputSelectResponseType<TodoType> => ({
  canLoadMore: false,
  result: [
    { id: 1, title: 'teste 1' },
    { id: 2, title: 'teste 2' },
    { id: 3, title: 'teste 3' },
    { id: 4, title: 'teste 4' },
    { id: 5, title: 'teste 5' },
  ],
});

describe('InputSelect Android', () => {
  it('should open modal and filter to data and reload list call onReload', async () => {
    const requestRecords = jest.fn(requestRecordsSuccess);
    const handleChange = jest.fn();

    const component = render(
      <ModalProvider>
        <InputSelect
          label="label de testes"
          requestRecords={requestRecords}
          mapRecord={mapRecord}
          onChange={handleChange}
          searchLabel="Buscar por nome"
        />
      </ModalProvider>,
    );

    const inputSelect = component.getByTestId('input-select-button');
    fireEvent.press(inputSelect);

    const modalSelect = await component.findByTestId('modal-combobox-input-select');

    await waitFor(() => {
      expect(requestRecords).toHaveBeenNthCalledWith(1, { search: '', pagination: { page: 1, limit: 20 }, parameters: {} });
    });

    const inputSearch = await component.findByTestId('input-search');
    fireEvent(inputSearch, 'changeText', 'teste 2');

    await waitFor(() => {
      expect(requestRecords).toHaveBeenNthCalledWith(2, { pagination: { limit: 20, page: 1 }, parameters: {}, search: 'teste 2' });
    });

    const list = within(modalSelect).UNSAFE_getByType(DefaultList as any);
    fireEvent(list, 'refresh');

    await waitFor(() => {
      expect(requestRecords).toHaveBeenNthCalledWith(3, { pagination: { limit: 20, page: 1 }, parameters: {}, search: 'teste 2' });
    });
  });

  it('should not call requestRecords after pulling to refresh, allowRefresh is disabled', async () => {
    const requestRecords = jest.fn(requestRecordsSuccess);
    const handleChange = jest.fn();

    const component = render(
      <ModalProvider>
        <InputSelect
          label="label de testes"
          requestRecords={requestRecords}
          mapRecord={mapRecord}
          onChange={handleChange}
          searchLabel="Buscar por nome"
          allowRefresh={false}
        />
      </ModalProvider>,
    );

    const inputSelect = component.getByTestId('input-select-button');
    fireEvent.press(inputSelect);

    const modalSelect = await component.findByTestId('modal-combobox-input-select');

    await waitFor(() => {
      expect(requestRecords).toHaveBeenCalledWith({ search: '', pagination: { page: 1, limit: 20 }, parameters: {} });
    });

    const list = within(modalSelect).UNSAFE_getByType(DefaultList as any);
    fireEvent(list, 'refresh');

    expect(requestRecords).toHaveBeenCalledTimes(1);
  });
});
