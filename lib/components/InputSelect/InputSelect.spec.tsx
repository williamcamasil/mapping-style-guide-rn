import React from 'react';
import { TextInput, TouchableWithoutFeedback, View } from 'react-native';

import {
  render, fireEvent, within, waitFor, waitForElementToBeRemoved,
} from '@testing-library/react-native';
import { createForm } from 'final-form';

import InputSelect from '.';
import { Icons } from '../../assets';
import DefaultList from '../DefaultList';
import Form from '../Form';
import ModalProvider from '../Modal/ModalProvider';
import Text from '../Text';
import { InputSelectResponseType, InputSelectValueType } from './utils';

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

describe('InputSelect snapshot', () => {
  it('Should render component as default', () => {
    const requestRecords = jest.fn();
    const handleChange = jest.fn();

    const tree = render(
      <InputSelect
        label="label de testes"
        value={null}
        disabled={false}
        error={false}
        requestRecords={requestRecords}
        mapRecord={mapRecord}
        onChange={handleChange}
        searchLabel="Buscar por nome"
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render component with value', () => {
    const requestRecords = jest.fn();

    const tree = render(
      <InputSelect
        label="label de testes"
        value={{
          item: { id: 1, title: 'My todo' },
          key: '1',
          label: 'My todo',
        }}
        requestRecords={requestRecords}
        mapRecord={mapRecord}
        searchLabel="Buscar por nome"
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render component as disabled', () => {
    const requestRecords = jest.fn();

    const tree = render(
      <InputSelect
        label="label de testes"
        requestRecords={requestRecords}
        mapRecord={mapRecord}
        searchLabel="Buscar por nome"
        disabled
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render component with error', () => {
    const requestRecords = jest.fn();

    const tree = render(
      <InputSelect
        label="label de testes"
        requestRecords={requestRecords}
        mapRecord={mapRecord}
        searchLabel="Buscar por nome"
        error
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render component with allowClear', () => {
    const requestRecords = jest.fn();

    const tree = render(
      <InputSelect
        label="label de testes"
        requestRecords={requestRecords}
        mapRecord={mapRecord}
        searchLabel="Buscar por nome"
        value={{
          item: { id: 1, title: 'My todo' },
          key: '1',
          label: 'My todo',
        }}
        allowClear
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render the help text', () => {
    const requestRecords = jest.fn();

    const tree = render(
      <InputSelect
        label="label de testes"
        requestRecords={requestRecords}
        mapRecord={mapRecord}
        searchLabel="Buscar por nome"
        help="Help message"
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render component in a form', () => {
    const requestRecords = jest.fn();

    const result = render(
      <Form
        onSubmit={jest.fn()}
      >
        {() => (
          <InputSelect.Field
            name="checkboxName"
            label="Select label"
            mapRecord={mapRecord}
            requestRecords={requestRecords}
            searchLabel="Search label"
          />
        )}
      </Form>,
    );

    const tree = result.toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('InputSelect events', () => {
  it('should verify input with property pointerEvents equals to none', async () => {
    const requestRecords = jest.fn();
    const mapRecordjest = jest.fn();
    const handleChange = jest.fn();

    const component = render(
      <InputSelect
        label="label de testes"
        value={null}
        disabled={false}
        error={false}
        requestRecords={requestRecords}
        mapRecord={mapRecordjest}
        onChange={handleChange}
        searchLabel="Buscar por nome"
      />,
    );

    const inputSelect = component.getByTestId('input-select-button');
    const inputText = within(inputSelect).UNSAFE_getByType(TextInput);

    expect(inputText.props).toHaveProperty('pointerEvents', 'none');
  });

  it('should verify if icon down is visible in right input', () => {
    const requestRecords = jest.fn();
    const mapRecordjest = jest.fn();
    const handleChange = jest.fn();

    const component = render(
      <InputSelect
        label="label de testes"
        value={null}
        disabled={false}
        error={false}
        requestRecords={requestRecords}
        mapRecord={mapRecordjest}
        onChange={handleChange}
        searchLabel="Buscar por nome"
      />,
    );

    const inputSelect = component.getByTestId('input-select-button');

    const iconDown = within(inputSelect).UNSAFE_getByType(Icons.Small.Down);

    expect(iconDown).toBeTruthy();
  });

  it('should render the emptyData message with the search string', async () => {
    const requestRecords = jest.fn(async () => ({
      canLoadMore: false,
      result: [],
    }));

    const component = render(
      <ModalProvider>
        <InputSelect
          label="label de testes"
          requestRecords={requestRecords}
          mapRecord={mapRecord}
          searchLabel="Buscar por nome"
        />
      </ModalProvider>,
    );

    const inputSelect = component.getByTestId('input-select-button');
    fireEvent.press(inputSelect);

    await component.findByTestId('modal-combobox-input-select');

    requestRecords.mockClear();
    const inputSearch = await component.findByTestId('input-search');
    fireEvent(inputSearch, 'changeText', 'test');

    await waitFor(() => expect(requestRecords).toHaveBeenCalled());

    await component.findByText('Nenhum resultado encontrado para "test".');
  });

  it('should render the emptyData message without search, showSearch is false', async () => {
    const requestRecords = async () => ({
      canLoadMore: false,
      result: [],
    });

    const component = render(
      <ModalProvider>
        <InputSelect
          label="label de testes"
          requestRecords={requestRecords}
          mapRecord={mapRecord}
          searchLabel="Buscar por nome"
          showSearch={false}
        />
      </ModalProvider>,
    );

    const inputSelect = component.getByTestId('input-select-button');
    fireEvent.press(inputSelect);

    await component.findByTestId('modal-combobox-input-select');

    const emptyResult = component.getByTestId('empty-result');

    await within(emptyResult).findByText('Nenhum resultado encontrado.');
  });

  it('should render the emptyData message without search, searchText is empty', async () => {
    const requestRecords = async () => ({
      canLoadMore: false,
      result: [],
    });

    const component = render(
      <ModalProvider>
        <InputSelect
          label="label de testes"
          requestRecords={requestRecords}
          mapRecord={mapRecord}
          searchLabel="Buscar por nome"
          showSearch
        />
      </ModalProvider>,
    );

    const inputSelect = component.getByTestId('input-select-button');
    fireEvent.press(inputSelect);

    await component.findByTestId('modal-combobox-input-select');

    const emptyResult = component.getByTestId('empty-result');

    await within(emptyResult).findByText('Nenhum resultado encontrado.');
  });

  it('should verify if combobox is opened after clicking on input element with data load', async () => {
    const handleChange = jest.fn();

    const component = render(
      <ModalProvider>
        <InputSelect
          label="label de testes"
          value={null}
          disabled={false}
          error={false}
          requestRecords={requestRecordsSuccess}
          mapRecord={mapRecord}
          onChange={handleChange}
          searchLabel="Buscar por nome"
        />
      </ModalProvider>,
    );

    const inputSelect = component.getByTestId('input-select-button');
    fireEvent.press(inputSelect);

    await component.findByTestId('modal-combobox-input-select');

    await waitFor(async () => {
      const items = component.getAllByTestId('item-touchable-render');

      expect(items.length).toBe((await requestRecordsSuccess()).result.length);
    });
  });

  it('should not open the modal when disabled input is clicked', async () => {
    const handleChange = jest.fn();

    const component = render(
      <ModalProvider>
        <InputSelect
          label="label de testes"
          value={null}
          disabled
          error={false}
          requestRecords={requestRecordsSuccess}
          mapRecord={mapRecord}
          onChange={handleChange}
          searchLabel="Buscar por nome"
        />
      </ModalProvider>,
    );

    const inputSelect = component.getByTestId('input-select-button');
    fireEvent.press(inputSelect);

    const modalCombobox = component.queryByTestId('modal-combobox-input-select');

    expect(modalCombobox).toBeNull();
  });

  it('should call handleChange when an item is selected', async () => {
    const handleChange = jest.fn();

    const component = render(
      <ModalProvider>
        <InputSelect
          label="label de testes"
          value={null}
          disabled={false}
          error={false}
          requestRecords={requestRecordsSuccess}
          mapRecord={mapRecord}
          onChange={handleChange}
          searchLabel="Buscar por nome"
        />
      </ModalProvider>,
    );

    const inputSelect = component.getByTestId('input-select-button');
    fireEvent.press(inputSelect);

    await component.findByTestId('modal-combobox-input-select');

    const touchables = await waitFor(() => {
      const items = component.queryAllByTestId('item-touchable-render');
      expect(items.length).toBe(5);
      return items;
    });

    fireEvent.press(touchables[1]);

    expect(handleChange).toHaveBeenCalledWith({
      key: '2',
      label: '2 - teste 2',
      item: {
        id: 2,
        title: 'teste 2',
      },
    });

    await waitForElementToBeRemoved(() => component.queryByTestId('modal-combobox-input-select'));
  });

  it('should render custom items', async () => {
    const handleChange = jest.fn();

    const component = render(
      <ModalProvider>
        <InputSelect
          label="label de testes"
          requestRecords={requestRecordsSuccess}
          mapRecord={mapRecord}
          onChange={handleChange}
          searchLabel="Buscar por nome"
          renderItem={({ item }) => (
            <View>
              <Text>Custom item</Text>
              <Text>
                {item.id}
                {' '}
                -
                {' '}
                {item.title}
              </Text>
            </View>
          )}
        />
      </ModalProvider>,
    );

    const inputSelect = component.getByTestId('input-select-button');
    fireEvent.press(inputSelect);

    await component.findByTestId('modal-combobox-input-select');

    await waitFor(() => {
      const items = component.queryAllByText('Custom item');
      expect(items.length).toBe(5);
    });
    component.getByText('1 - teste 1');
    component.getByText('2 - teste 2');
  });

  it('should verify if the clean icon is visible in the input when a value is selected', async () => {
    const handleChange = jest.fn();

    const component = render(
      <ModalProvider>
        <InputSelect
          label="label de testes"
          value={{
            key: '2',
            label: '2 - label',
            item: {
              id: 2,
              title: '2 - label',
            },
          }}
          requestRecords={requestRecordsSuccess}
          mapRecord={mapRecord}
          onChange={handleChange}
          searchLabel="Buscar por nome"
          allowClear
        />
      </ModalProvider>,
    );

    await component.findByTestId('input-text-action-clear');
  });

  it('should click on button close and call handleChange cleaning this value', async () => {
    const handleChange = jest.fn();

    const component = render(
      <ModalProvider>
        <InputSelect
          label="label de testes"
          value={{
            key: '2',
            label: '2 - label',
            item: {
              id: 2,
              title: '2 - label',
            },
          }}
          requestRecords={requestRecordsSuccess}
          mapRecord={mapRecord}
          onChange={handleChange}
          searchLabel="Buscar por nome"
          allowClear
        />
      </ModalProvider>,
    );

    const clearButton = await component.findByTestId('input-text-action-clear');

    fireEvent.press(clearButton);

    expect(handleChange).toBeCalledWith(null);
  });

  it('should call requestRecords when the input is filled', async () => {
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
          parameters={{
            foo: 'bar',
          }}
        />
      </ModalProvider>,
    );

    const inputSelect = component.getByTestId('input-select-button');
    fireEvent.press(inputSelect);

    const inputSearch = await component.findByTestId('input-search');
    fireEvent(inputSearch, 'changeText', 'teste 2');

    await waitFor(() => {
      const paramsObject = {
        pagination: {
          limit: 20,
          page: 1,
        },
        parameters: {
          foo: 'bar',
        },
        search: 'teste 2',
      };

      expect(requestRecords).toHaveBeenCalledWith(paramsObject);
    });
  });

  it('should close the modal when the back button from navigation bar is clicked', async () => {
    const requestRecords = jest.fn(requestRecordsSuccess);
    const handleChange = jest.fn();

    const component = render(
      <ModalProvider>
        <InputSelect
          label="label de testes"
          showSearch={false}
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

    const goBack = await within(modalSelect).findByTestId('go-back-action');
    fireEvent.press(goBack);

    await waitForElementToBeRemoved(() => component.queryByTestId('modal-combobox-input-select'));
  });

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

  it('should fire error on request', async () => {
    const requestRecords = jest.fn()
      .mockImplementationOnce(() => {
        throw new Error('request failed');
      })
      .mockImplementation(requestRecordsSuccess);
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

    await waitFor(() => {
      const items = component.queryAllByTestId('item-touchable-render');
      expect(items.length).toBe(0);
    });

    const list = within(modalSelect).UNSAFE_getByType(DefaultList as any);
    fireEvent(list, 'refresh');

    await waitFor(() => {
      expect(requestRecords).toHaveBeenNthCalledWith(2, { search: '', pagination: { page: 1, limit: 20 }, parameters: {} });
    });

    await waitFor(() => {
      const items = component.queryAllByTestId('item-touchable-render');
      expect(items.length).toBe(5);
    });
  });

  it('should request multiple pages', async () => {
    const requestRecords = jest.fn()
      .mockReturnValueOnce({
        canLoadMore: true,
        result: [
          { id: 1, title: 'teste 1' },
          { id: 2, title: 'teste 2' },
          { id: 3, title: 'teste 3' },
          { id: 4, title: 'teste 4' },
          { id: 5, title: 'teste 5' },
        ],
      })
      .mockReturnValueOnce({
        canLoadMore: true,
        result: [
          { id: 6, title: 'teste 6' },
          { id: 7, title: 'teste 7' },
          { id: 8, title: 'teste 8' },
          { id: 9, title: 'teste 9' },
          { id: 10, title: 'teste 10' },
        ],
      });
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

    await waitFor(() => {
      const items = component.queryAllByTestId('item-touchable-render');
      expect(items.length).toBe(5);
    });

    const list = within(modalSelect).UNSAFE_getByType(DefaultList as any);
    fireEvent(list, 'endReached');

    await waitFor(() => {
      expect(requestRecords).toHaveBeenNthCalledWith(2, { search: '', pagination: { page: 2, limit: 20 }, parameters: {} });
    });

    await waitFor(() => {
      const items = component.queryAllByTestId('item-touchable-render');
      expect(items.length).toBe(10);
    });
  });

  it('Should select an item through a bottomSheet', async () => {
    const setValue = jest.fn();

    const component = render(
      <ModalProvider>
        <InputSelect
          useBottomSheet
          bottomSheetTitle="Selecione o estado"
          label="Estado de nascimento"
          requestRecords={requestRecordsSuccess}
          mapRecord={mapRecord}
          onChange={setValue}
        />
      </ModalProvider>,
    );

    const inputSelect = component.getByTestId('input-select-button');
    fireEvent.press(inputSelect);

    await component.findByTestId('bottom-sheet-combobox-input-select');
    component.getByText('Selecione o estado');

    const state = await component.findByText('1 - teste 1');
    fireEvent.press(state);

    expect(setValue).toHaveBeenCalledWith({
      item: { id: 1, title: 'teste 1' },
      key: '1',
      label: '1 - teste 1',
    });
  });

  it('Should call onBlur after closing the bottomSheet', async () => {
    const setValue = jest.fn();
    const onBlur = jest.fn();

    const component = render(
      <ModalProvider>
        <InputSelect
          useBottomSheet
          bottomSheetTitle="Selecione o estado"
          label="Estado de nascimento"
          requestRecords={requestRecordsSuccess}
          mapRecord={mapRecord}
          onChange={setValue}
          onBlur={onBlur}
        />
      </ModalProvider>,
    );

    const inputSelect = component.getByTestId('input-select-button');
    fireEvent.press(inputSelect);

    const bottomSheet = await component.findByTestId('bottom-sheet-combobox-input-select');
    const outsideTouchable = within(bottomSheet).UNSAFE_getByType(TouchableWithoutFeedback);
    fireEvent.press(outsideTouchable);

    expect(onBlur).toHaveBeenCalled();
  });
});

describe('InputSelect.Field', () => {
  it('Should have a valid state', async () => {
    const form = createForm({
      onSubmit: jest.fn(),
    });

    const component = render(
      <ModalProvider>
        <Form
          onSubmit={jest.fn()}
          form={form}
        >
          {() => (
            <InputSelect.Field
              name="checkboxName"
              label="Select label"
              mapRecord={mapRecord}
              requestRecords={requestRecordsSuccess}
              searchLabel="Search label"
              required
              validate={value => (value ? undefined : 'Erro')}
            />
          )}
        </Form>
      </ModalProvider>,
    );

    const inputSelect = component.getByTestId('input-select-button');
    fireEvent.press(inputSelect);

    const selectedItem = await waitFor(() => {
      const item = component.getAllByTestId('item-touchable-render')[2];
      expect(item).toBeTruthy();
      return item;
    });

    fireEvent.press(selectedItem);

    expect(form.getState().valid).toBeTruthy();
  });

  it('Should have an invalid state', async () => {
    const form = createForm({
      onSubmit: jest.fn(),
    });

    const component = render(
      <ModalProvider>
        <Form
          onSubmit={jest.fn()}
          form={form}
        >
          {() => (
            <InputSelect.Field
              name="checkboxName"
              label="Select label"
              showSearch={false}
              mapRecord={mapRecord}
              requestRecords={requestRecordsSuccess}
              searchLabel="Search label"
              required
              validate={value => (value ? undefined : 'Erro')}
            />
          )}
        </Form>
      </ModalProvider>,
    );

    const inputSelect = component.getByTestId('input-select-button');
    fireEvent.press(inputSelect);

    const modalSelect = await component.findByTestId('modal-combobox-input-select');

    const goBack = await within(modalSelect).findByTestId('go-back-action');
    fireEvent.press(goBack);

    expect(form.getState().invalid).toBeTruthy();
  });

  it('should render the allow clear icon when required is false', async () => {
    const form = createForm({
      onSubmit: jest.fn(),
    });

    const component = render(
      <ModalProvider>
        <Form
          onSubmit={jest.fn()}
          form={form}
        >
          {() => (
            <InputSelect.Field
              name="checkboxName"
              label="Select label"
              mapRecord={mapRecord}
              requestRecords={requestRecordsSuccess}
              searchLabel="Search label"
              required={false}
              allowClear
              validate={value => (value ? undefined : 'Erro')}
            />
          )}
        </Form>
      </ModalProvider>,
    );

    const inputSelect = component.getByTestId('input-select-button');
    fireEvent.press(inputSelect);

    const selectedItem = await waitFor(() => {
      const item = component.getAllByTestId('item-touchable-render')[2];
      expect(item).toBeTruthy();
      return item;
    });
    fireEvent.press(selectedItem);

    await component.findByTestId('input-text-action-clear');
  });
});
