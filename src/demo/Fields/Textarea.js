import React, { Component } from 'react';
import { TextareaField } from '../../components/styled/Bootstrap';
import DetailsProps from './DetailsProps';

class Textarea extends Component {
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
                <TextareaField name="TextareaField" label="TextareaField"/>
                <a href="#" onClick={this.toggleDetails}>
                    {this.state.showDetails ? 'Hide' : 'Show'} details
                </a>
                {
                    this.state.showDetails &&
                    <div>
                        <label>Code:</label>
                        <pre>
                            {`<TextareaField name="TextareaField" label="TextareaField"/>`}
                        </pre>
                        <DetailsProps>
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
                                <td>fieldAttributes</td>
                                <td>Object</td>
                                <td>Object with html attributes for textarea</td>
                            </tr>
                        </DetailsProps>
                    </div>
                }
                <hr/>
            </div>
        );
    }
}

export default Textarea;