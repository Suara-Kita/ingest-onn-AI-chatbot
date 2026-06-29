// components/AIAvatar.tsx
import Image from 'next/image'
import type { CSSProperties } from 'react'

export default function AIAvatar({ style }: { style?: CSSProperties } = {}) {
  return (
    <div
      style={{
        width: '58px',
        height: '58px',
        borderRadius: '8px',
        overflow: 'hidden',
        flexShrink: 0,
        ...style,
      }}
    >
      <Image src="/onn.jpg" alt="Onn AI" width={36} height={36} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
    </div>
  )
}
