import React from 'react';

const DetailsProps = ({ children }) => (
    <div>
        <label>Avaible props:</label>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Prop name</th>
                    <th>Type</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {children}
                <tr>
                    <td>name</td>
                    <td>String</td>
                    <td>name of field and key of submit model</td>
                </tr>
                <tr>
                    <td>wrapperClassName</td>
                    <td>String</td>
                    <td>class of main div container</td>
                </tr>
                <tr>
                    <td>errorStyles</td>
                    <td>Object</td>
                    <td>error styles</td>
                </tr>
                <tr>
                    <td>errorStyles.className</td>
                    <td>String</td>
                    <td>class of main container of error component</td>
                </tr>
                <tr>
                    <td>errorStyles.itemClassName</td>
                    <td>String</td>
                    <td>class of each error message in error component</td>
                </tr>
                <tr>
                    <td>errorStyles.fieldClassName</td>
                    <td>String</td>
                    <td>class of field main container when field has error</td>
                </tr>
                <tr>
                    <td>errorStyles.ErrorComponent</td>
                    <td>React.Component</td>
                    <td>custom error component that will be displayed on error</td>
                </tr>
                <tr>
                    <td>onChangeModel</td>
                    <td>Function</td>
                    <td>method that will be called on model change</td>
                </tr>
                <tr>
                    <td>onEmitEvents</td>
                    <td>Function</td>
                    <td>methods that will be called on emit events</td>
                </tr>
            </tbody>
        </table>
    </div>
);

export default DetailsProps;