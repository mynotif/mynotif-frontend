import React from 'react'

interface AvatarCircleProps {
  initials: string
  size: number
  fontSize: number
}

const AvatarCircle: React.FC<AvatarCircleProps> = ({ initials, size, fontSize }) => {
  const style = {
    width: size,
    height: size,
    fontSize: fontSize
  }

  return (
    <div
      className='bg-gray-300 rounded-full flex items-center justify-center'
      style={style}
    >
      <span className='text-white font-semibold'>{initials}</span>
    </div>
  )
}

export default AvatarCircle
