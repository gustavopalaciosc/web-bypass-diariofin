import './Button.css'

const Button = (props) => {
    return (
        <button type="submit" className='submit-button'>
            {props.text}
        </button>
    );
};

export { Button }