export default function Button({ children, variant = 'primary', type = 'button', ...props }) {
    const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors';
    const variants = {
        primary: 'bg-primary-600 text-white hover:bg-primary-700',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        danger: 'bg-red-600 text-white hover:bg-red-700'
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant]}`}
            {...props}
        >
            {children}
        </button>
    );
}