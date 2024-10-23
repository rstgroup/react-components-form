import { configure } from '@testing-library/react'
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';

registerRequireContextHook();
function noOp() {}

if (typeof window.URL.createObjectURL === 'undefined') {
    Object.defineProperty(window.URL, 'createObjectURL', { value: noOp });
}

// Setup enzyme's react adapter
// Enzyme.configure({ adapter: new EnzymeAdapter() });

// Setup react-testing-library data-testid element
configure({ testIdAttribute: 'data-ctx' });
