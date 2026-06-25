// components/AIAvatar.tsx
export default function AIAvatar() {
  return (
    <div
      style={{
        width: '28px',
        height: '28px',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #2C6FF7, #5B9BFF)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="2.5" fill="white" />
        <circle cx="6" cy="6" r="5" stroke="white" strokeWidth="0.8" strokeDasharray="2.5 1.5" opacity="0.6" />
      </svg>
    </div>
  )
}
