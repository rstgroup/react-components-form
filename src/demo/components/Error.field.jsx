import PropTypes from 'prop-types';
import './error.field.css';

export const ErrorField = ({
    errors,
    ErrorComponent,
}) => {
    const errorsList = Array.isArray(errors) ? errors : [errors];
    if (ErrorComponent) {
        return (
            <ErrorComponent
                errors={errorsList}
            />
        );
    }
    return (
        <div>
            {errorsList.map(error => (
                <div key={error} className="errorWrapper">
                    {error}
                </div>
            ))}
        </div>
    );
};

ErrorField.propTypes = {
    errors: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
        PropTypes.string,
    ]),
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    ErrorComponent: PropTypes.func,
};

ErrorField.defaultProps = {
    errors: [],
    className: '',
    itemClassName: '',
    ErrorComponent: undefined,
};

export default ErrorField;
