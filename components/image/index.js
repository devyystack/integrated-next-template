import { useState } from 'react';
import NextImage from 'next/image';

export default function Image(props) {
  const { src, height, width, layout } = props;
  const [ready, setReady] = useState(false);

  const handleLoad = (event) => {
    event.persist();
    if (event.target.srcset) {
      setReady(true);
    }
  };

  if (!src) {
    return null;
  }

  return (
    <div
      style={{
        opacity: ready ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
      }}
    >
      <NextImage
        src={src}
        height={height}
        width={width}
        layout={layout}
        onLoad={handleLoad}
        {...props}
      />
    </div>
  );
}
