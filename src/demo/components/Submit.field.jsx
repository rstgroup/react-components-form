import PropTypes from 'prop-types';
import FieldConnect from '../../FieldConnect';

const Submit = ({
    wrapperClassName = '',
    className = '',
    submit,
    value = 'Submit',
    fieldAttributes = {},
}) => (
    <div className={wrapperClassName}>
        <button
            onClick={submit}
            className={className}
            {...fieldAttributes}
        >
            {value}
        </button>
    </div>
);

Submit.propTypes = {
    wrapperClassName: PropTypes.string,
    className: PropTypes.string,
    submit: PropTypes.func.isRequired,
    value: PropTypes.string,
    fieldAttributes: PropTypes.shape({}),
};

export const SubmitField = FieldConnect(Submit);
