import { fireEvent, within } from '@testing-library/dom';
import { assert, TestSuite } from '../../../../utils/tester/BrowserTester';

export const suite: TestSuite = {
  'req-1': async (container) => {
    const btn = within(container).getByText(/Show Toast/i);
    fireEvent.click(btn);
    
    // Check if portal-root inside the container contains the toast
    const portalRoot = container.querySelector('#portal-root') as HTMLElement;
    assert.ok(portalRoot, 'portal-root div should exist in component');
    
    const toast = within(portalRoot).getByText(/Toast at/i);
    assert.ok(toast, 'Toast should be rendered inside portal-root');
  },
  
  'req-2': async (container) => {
    const portalRoot = container.querySelector('#portal-root') as HTMLElement;
    assert.ok(portalRoot, 'portal-root div should exist');
    
    const style = window.getComputedStyle(portalRoot);
    assert.equal(style.position, 'fixed', 'portal-root should have fixed position');
    assert.equal(style.bottom, '10px', 'portal-root should be at the bottom');
    assert.equal(style.right, '10px', 'portal-root should be at the right');
  },

  'req-7': async (container) => {
    const inputs = container.querySelectorAll('input');
    assert.ok(inputs.length >= 1, 'Should render at least one TextInput');
  },

  'req-8': async (container) => {
    const labels = container.querySelectorAll('label');
    const inputs = container.querySelectorAll('input');
    
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      const id = input.getAttribute('id');
      assert.ok(id, `Input ${i} should have an id`);
      
      const label = container.querySelector(`label[for="${id}"]`);
      assert.ok(label, `Input with id "${id}" should have a corresponding label with matching htmlFor`);
    }
  },

  'req-9': async (container) => {
    const inputs = container.querySelectorAll('input');
    const ids = Array.from(inputs).map(i => i.getAttribute('id'));
    
    // Check if IDs are unique
    const uniqueIds = new Set(ids);
    assert.equal(uniqueIds.size, ids.length, 'All inputs should have unique IDs');
    
    // Simple check if it looks like a useId (usually starts with :r)
    ids.forEach(id => {
      assert.ok(id?.includes(':r'), 'IDs should be generated via useId()');
    });
  }
};
