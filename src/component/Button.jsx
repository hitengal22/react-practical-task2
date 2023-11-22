const Button = ({ title, onClick = undefined, className = null }) => {
  return (
    <button className={`py-2 px-3 rounded-lg bg-blue-600 text-white ${className}`} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;