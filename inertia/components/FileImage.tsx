import ImageComponent from './Image'

type FileImageProps = {
  imagePath: string
}
function FileImage({ imagePath }: FileImageProps) {
  const appUrl = import.meta.env.VITE_APP_BASE_URL
  const fullUrl = `${appUrl}/storage/${imagePath}`
  return (
    <div>
      <ImageComponent width="w-[50px]" height="h-[60px]" alt="error" src={fullUrl} />
    </div>
  )
}

export default FileImage
