import { useStoreState } from '@/utils/context/store';

const CartIcon = ({ theme, height = 30, width = 31 }) => {
  const { state } = useStoreState();
  const { checkout } = state;
  const count = checkout?.lineItems.length ?? 0;
  const color = theme === 'white' ? '#1a1d21' : '#ffffff';

  return (
    <svg width={width} height={height} viewBox={`0 0 30 31`}>
      <g
        id="Group_219"
        data-name="Group 219"
        transform="translate(-1536.347 -21)"
      >
        <g id="Icon_feather-shopping-bag" transform="translate(1537.347 28)">
          <path
            id="Path_3"
            d="M7.442,3,4.5,6.923v13.73a1.961,1.961,0,0,0,1.961,1.961h13.73a1.961,1.961,0,0,0,1.961-1.961V6.923L19.211,3Z"
            transform="translate(-4.5 -3)"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            id="Path_4"
            d="M4.5,9H22.153"
            transform="translate(-4.5 -5.077)"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            id="Path_5"
            d="M19.846,15A3.923,3.923,0,0,1,12,15"
            transform="translate(-7.096 -7.154)"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </g>
        {count >= 1 && (
          <g id="Group_80" data-name="Group 80" transform="translate(1549 21)">
            <g id="Group_81" data-name="Group 81">
              <g
                id="Ellipse_8"
                transform="translate(-0.126)"
                fill={color}
                stroke="#fff"
                strokeWidth="1"
              >
                <circle cx="7" cy="7" r="7" stroke="none" />
                <circle cx="7" cy="7" r="6.5" fill="none" />
              </g>
              <text
                id="_1"
                transform="translate(4 10)"
                fill={theme === 'white' ? '#ffffff' : '#000000'}
                fontSize="9"
                fontFamily="Helvetica"
                letterSpacing="0.03em"
              >
                <tspan x="0" y="0">
                  {count > 9 ? '+' : count}
                </tspan>
              </text>
            </g>
          </g>
        )}
      </g>
    </svg>
  );
};

export default CartIcon;
