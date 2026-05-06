import { fireEvent, within } from '@testing-library/dom';
import { assert, TestSuite } from '../../../../utils/tester/BrowserTester';

export const suite: TestSuite = {
  'req-1': async (container) => {
    const view = within(container);
    assert.ok(view.getByLabelText(/Name/i), 'Missing Name field');
    assert.ok(view.getByLabelText(/Email/i), 'Missing Email field');
    assert.ok(view.getByLabelText(/Password/i), 'Missing Password field');
    assert.ok(view.getByLabelText(/Confirm Password/i), 'Missing Confirm Password field');
  },
  
  'req-2': async (container) => {
    const view = within(container);
    const nameInput = view.getByLabelText(/Name/i);
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    
    // Check for "9 / 50" or similar text
    const countText = container.textContent;
    assert.ok(countText?.includes('9 / 50'), 'Character count not displaying correctly (expected "9 / 50")');
  },

  'req-3': async (container) => {
    const view = within(container);
    const passwordInput = view.getByLabelText(/Password/i);
    
    fireEvent.change(passwordInput, { target: { value: '123' } });
    assert.ok(container.textContent?.toLowerCase().includes('weak'), 'Password "123" should be "weak"');
    
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    assert.ok(container.textContent?.toLowerCase().includes('medium'), 'Password "1234567" should be "medium"');
    
    fireEvent.change(passwordInput, { target: { value: '12345678911' } });
    assert.ok(container.textContent?.toLowerCase().includes('strong'), 'Password "12345678911" should be "strong"');
  },

  'req-4': async (container) => {
    const view = within(container);
    const passwordInput = view.getByLabelText(/Password/i);
    const confirmInput = view.getByLabelText(/Confirm Password/i);
    const submitBtn = view.getByRole('button', { name: /Register/i }) as HTMLButtonElement;
    
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmInput, { target: { value: 'passwordXXX' } });
    
    assert.ok(submitBtn.disabled, 'Submit button should be disabled when passwords do not match');
    
    fireEvent.change(confirmInput, { target: { value: 'password123' } });
    // Note: depends on other fields being filled if implemented strictly
  }
};
