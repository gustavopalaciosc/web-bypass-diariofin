import './Button.css'

const Button = (props) => {
    return (
        <button>
            {props.text}
        </button>
    );
};

export { Button }