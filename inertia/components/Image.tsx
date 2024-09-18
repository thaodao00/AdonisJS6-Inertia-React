type ImageProps = {
  src: string
  alt: string
  className?: string
  width?: string
  height?: string
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
}
function ImageComponent({
  src,
  alt,
  className = '',
  width = 'w-full',
  height = 'h-full',
  objectFit = 'cover',
}: ImageProps) {
  return (
    <img src={src} alt={alt} className={`${width} ${height} object-${objectFit} ${className}`} />
  )
}

export default ImageComponent
