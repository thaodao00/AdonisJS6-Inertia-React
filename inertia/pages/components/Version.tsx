
type VersionProps = {
  version: number
}
function Version({version}: VersionProps) {
  return (
    <>
    <span className="text-red-500">{version}</span>
   
    </>
  )
}

export default Version