const DownCarrot = ({ color = 'black' }) => {
  return (
    <svg
      width="18"
      height="10"
      viewBox="0 0 12 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 1L6 6L1 1"
        stroke={color === 'black' ? 'white' : 'black'}
        strokeWidth="0.5"
      />
    </svg>
  );
};

export default DownCarrot;
