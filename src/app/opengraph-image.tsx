import { ImageResponse } from 'next/og'

export const alt = 'David Gómez — Senior Full-Stack Engineer & AI Systems'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0E0F0E',
          color: '#F5F3EE',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '72px',
        }}>
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#FF7043',
          }}>
          Senior Full-Stack Engineer / AI Systems
        </div>
        <div style={{ display: 'flex', fontSize: 132, fontWeight: 700, marginTop: 24 }}>
          David Gómez
        </div>
        <div
          style={{
            display: 'flex',
            height: 1,
            background: 'rgba(245,243,238,0.16)',
            margin: '36px 0',
          }}
        />
        <div style={{ display: 'flex', fontSize: 32, color: 'rgba(245,243,238,0.82)' }}>
          Backend services and AI agents for a cloud-native insurance platform
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
