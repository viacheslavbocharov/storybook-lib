import type { Meta, StoryObj } from '@storybook/react-vite';
import Toast from './Toast';
import { ToastViewport } from './ToastViewport';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastViewport>
        <Story />
      </ToastViewport>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    open: true,
    type: 'success',
    message: 'Saved successfully!',
    duration: 0,
  },
};

export const Info: Story = {
  args: {
    open: true,
    type: 'info',
    message: 'Information message',
    duration: 0,
  },
};

export const Error: Story = {
  args: {
    open: true,
    type: 'error',
    message: 'Something went wrong',
    duration: 0,
  },
};
