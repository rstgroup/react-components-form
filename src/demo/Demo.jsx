import React from 'react';
import Example1 from './example1/Form';
import Example2 from './example2/Form';
import { row, column, form } from './demo.css';

const Demo = () => (
    <div>
        <div className={row}>
            <div className={column}>
                <Example1 className={form} />
            </div>
            <div className={column}>
                <Example2 className={form} />
            </div>
        </div>
    </div>
);

export default Demo;
