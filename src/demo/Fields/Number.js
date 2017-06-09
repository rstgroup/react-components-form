import React, { Component } from 'react';
import { NumberField } from '../../components/styled/Bootstrap';
import DetailsProps from './DetailsProps';

class Number extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false
        };
        this.toggleDetails = this.toggleDetails.bind(this);
    }

    toggleDetails(e) {
        e.preventDefault();
        this.setState({ showDetails: !this.state.showDetails });
    }

    render() {
        return (
            <div>
                <NumberField name="NumberField" label="NumberField"/>
                <a href="#" onClick={this.toggleDetails}>
                    {this.state.showDetails ? 'Hide' : 'Show'} details
                </a>
                {
                    this.state.showDetails &&
                    <div>
                        <label>Code:</label>
                        <pre>
                            {`<NumberField name="NumberField" label="NumberField"/>`}
                        </pre>
                        <DetailsProps>
                            <tr>
                                <td>type</td>
                                <td>String</td>
                                <td>html type of input field</td>
                            </tr>
                            <tr>
                                <td>value</td>
                                <td>String</td>
                                <td>default value of field</td>
                            </tr>
                            <tr>
                                <td>label</td>
                                <td>String, Node</td>
                                <td>label of field displayed before field</td>
                            </tr>
                            <tr>
                                <td>placeholder</td>
                                <td>String</td>
                                <td>input placeholder</td>
                            </tr>
                            <tr>
                                <td>className</td>
                                <td>String</td>
                                <td>class of input</td>
                            </tr>
                            <tr>
                                <td>trim</td>
                                <td>Boolean</td>
                                <td>Boolean (trims values passed to <code>onChange</code> if set)</td>
                            </tr>
                            <tr>
                                <td>fieldAttributes</td>
                                <td>Object</td>
                                <td>Object with html attributes for input</td>
                            </tr>
                        </DetailsProps>
                    </div>
                }
                <hr/>
            </div>
        );
    }
}

export default Number;