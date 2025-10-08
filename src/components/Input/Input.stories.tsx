import type { Meta, StoryObj } from '@storybook/react-vite';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: 'Enter text...',
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Text: Story = {
  args: { label: 'Text Input', clearable: true },
};

export const Password: Story = {
  args: { label: 'Password', type: 'password', clearable: true },
};

export const Number: Story = {
  args: { label: 'Number', type: 'number' },
};

export const WithError: Story = {
  args: { label: 'With error', error: 'Something went wrong' },
};
