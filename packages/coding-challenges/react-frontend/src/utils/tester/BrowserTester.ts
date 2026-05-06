import { cleanup, render } from '@testing-library/react';
import React from 'react';

export interface TestResult {
  passed: boolean;
  error?: string;
}

export type TestSuite = Record<string, (container: HTMLElement) => Promise<void> | void>;

export class BrowserTester {
  private sandboxId = 'test-sandbox';

  private getSandbox(): HTMLElement {
    let sandbox = document.getElementById(this.sandboxId);
    if (!sandbox) {
      sandbox = document.createElement('div');
      sandbox.id = this.sandboxId;
      sandbox.style.position = 'absolute';
      sandbox.style.left = '-9999px';
      sandbox.style.top = '-9999px';
      sandbox.style.width = '1000px';
      sandbox.style.height = '1000px';
      sandbox.style.overflow = 'hidden';
      document.body.appendChild(sandbox);
    }
    return sandbox;
  }

  async runChallengeTests(
    ChallengeComponent: React.ComponentType,
    suite: TestSuite
  ): Promise<Record<string, TestResult>> {
    const results: Record<string, TestResult> = {};
    const sandbox = this.getSandbox();

    for (const [reqId, testFn] of Object.entries(suite)) {
      try {
        // Clean up previous renders
        cleanup();
        sandbox.innerHTML = '';
        
        // Render fresh instance into sandbox
        const { container } = render(React.createElement(ChallengeComponent), {
          container: sandbox
        });

        // Run the specific requirement test
        await testFn(container);
        
        results[reqId] = { passed: true };
      } catch (err: any) {
        results[reqId] = { 
          passed: false, 
          error: err.message || 'Unknown error' 
        };
      }
    }

    cleanup();
    return results;
  }
}

/**
 * Simple browser-friendly assertion helper
 */
export const assert = {
  ok: (val: any, msg?: string) => {
    if (!val) throw new Error(msg || `Expected ${val} to be truthy`);
  },
  equal: (actual: any, expected: any, msg?: string) => {
    if (actual != expected) throw new Error(msg || `Expected ${actual} to equal ${expected}`);
  },
  exists: (el: Element | null | undefined, name: string) => {
    if (!el) throw new Error(`Could not find ${name}`);
  },
  contains: (text: string, substring: string) => {
    if (!text.includes(substring)) throw new Error(`Expected "${text}" to contain "${substring}"`);
  }
};

export const tester = new BrowserTester();
