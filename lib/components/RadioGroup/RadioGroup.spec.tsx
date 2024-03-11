import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';
import { createForm } from 'final-form';

import RadioGroup, { RadioGroupItemType } from '.';
import Form from '../Form';

const options: RadioGroupItemType<any>[] = [
  {
    key: 1,
    label: 'Brasil',
    disabled: true,
    item: {
      id: 1,
      name: 'Brasil',
    },
  },
  {
    key: 2,
    label: 'Outro',
    disabled: false,
    item: {
      id: 2,
      name: 'Outro',
    },
  },
  {
    key: 3,
    label: 'Outros',
    disabled: false,
    item: {
      id: 3,
      name: 'Outros',
    },
  },
];

describe('RadioGroup', () => {
  describe('default state with selected item', () => {
    it('Should render the primaryDefault variant', () => {
      const jsonScreen = render(
        <RadioGroup options={options} value={options[1]} />,
      ).toJSON();
      expect(jsonScreen).toMatchSnapshot();
    });

    it('Should render the shapedPrimary variant', () => {
      const jsonScreen = render(
        <RadioGroup options={options} variant="shapedPrimary" value={options[1]} />,
      ).toJSON();
      expect(jsonScreen).toMatchSnapshot();
    });

    it('Should render the defaultSecondary variant', () => {
      const jsonScreen = render(
        <RadioGroup options={options} variant="defaultSecondary" value={options[1]} />,
      ).toJSON();
      expect(jsonScreen).toMatchSnapshot();
    });
  });
  describe('error state with selected item', () => {
    it('Should render the primaryDefault variant', () => {
      const jsonScreen = render(
        <RadioGroup options={options} value={options[1]} error />,
      ).toJSON();
      expect(jsonScreen).toMatchSnapshot();
    });

    it('Should render the shapedPrimary variant', () => {
      const jsonScreen = render(
        <RadioGroup options={options} variant="shapedPrimary" value={options[1]} error />,
      ).toJSON();
      expect(jsonScreen).toMatchSnapshot();
    });

    it('Should render the defaultSecondary variant', () => {
      const jsonScreen = render(
        <RadioGroup options={options} variant="defaultSecondary" value={options[1]} error />,
      ).toJSON();
      expect(jsonScreen).toMatchSnapshot();
    });
  });
  describe('disabled state with selected item', () => {
    it('Should render the primaryDefault variant', () => {
      const jsonScreen = render(
        <RadioGroup options={options} value={options[1]} disabled />,
      ).toJSON();
      expect(jsonScreen).toMatchSnapshot();
    });

    it('Should render the shapedPrimary variant', () => {
      const jsonScreen = render(
        <RadioGroup options={options} variant="shapedPrimary" value={options[1]} disabled />,
      ).toJSON();
      expect(jsonScreen).toMatchSnapshot();
    });

    it('Should render the defaultSecondary variant', () => {
      const jsonScreen = render(
        <RadioGroup options={options} variant="defaultSecondary" value={options[1]} disabled />,
      ).toJSON();
      expect(jsonScreen).toMatchSnapshot();
    });
  });

  describe('disabled and error state with selected item', () => {
    it('Should render the primaryDefault variant', () => {
      const jsonScreen = render(
        <RadioGroup options={options} value={options[1]} disabled error />,
      ).toJSON();
      expect(jsonScreen).toMatchSnapshot();
    });

    it('Should render the shapedPrimary variant', () => {
      const jsonScreen = render(
        <RadioGroup options={options} variant="shapedPrimary" value={options[1]} disabled error />,
      ).toJSON();
      expect(jsonScreen).toMatchSnapshot();
    });

    it('Should render the defaultSecondary variant', () => {
      const jsonScreen = render(
        <RadioGroup options={options} variant="defaultSecondary" value={options[1]} disabled error />,
      ).toJSON();
      expect(jsonScreen).toMatchSnapshot();
    });
  });

  describe('stacked mode', () => {
    it('Should render the primaryDefault variant', () => {
      const jsonScreen = render(
        <RadioGroup options={options} value={options[1]} stacked />,
      ).toJSON();
      expect(jsonScreen).toMatchSnapshot();
    });

    it('Should render the shapedPrimary variant', () => {
      const jsonScreen = render(
        <RadioGroup options={options} variant="shapedPrimary" value={options[1]} stacked />,
      ).toJSON();
      expect(jsonScreen).toMatchSnapshot();
    });

    it('Should render the defaultSecondary variant', () => {
      const jsonScreen = render(
        <RadioGroup options={options} variant="defaultSecondary" value={options[1]} stacked />,
      ).toJSON();
      expect(jsonScreen).toMatchSnapshot();
    });
  });

  describe('RadioGroup.Field', () => {
    it('Should have an invalid form', () => {
      const form = createForm({
        onSubmit: jest.fn(),
      });

      render(
        <Form
          onSubmit={jest.fn()}
          form={form}
        >
          {() => (
            <RadioGroup.Field
              name="radio"
              options={options}
              required
              validate={item => (item ? undefined : 'Erro')}
            />
          )}
        </Form>,
      );

      expect(form.getState().invalid).toBeTruthy();
    });
    it('Should have a valid form', () => {
      const form = createForm({
        onSubmit: jest.fn(),
      });

      const result = render(
        <Form
          onSubmit={jest.fn()}
          form={form}
        >
          {() => (
            <RadioGroup.Field
              name="radio"
              options={options}
              required
              validate={item => (item ? undefined : 'Erro')}
            />
          )}
        </Form>,
      );

      const radio = result.getByTestId('radio-item-1');

      fireEvent.press(radio);

      expect(form.getState().valid).toBeTruthy();
    });
  });
});
