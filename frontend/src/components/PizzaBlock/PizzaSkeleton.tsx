import React from "react"
import ContentLoader from "react-content-loader"



const PizzaSkeleton: React.FC<Object> = (props) => (
    <ContentLoader 
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="256" rx="10" ry="10" width="280" height="20" /> 
    <rect x="0" y="400" rx="8" ry="8" width="99" height="28" /> 
    <rect x="163" y="534" rx="8" ry="8" width="110" height="42" /> 
    <circle cx="140" cy="120" r="120" /> 
    <rect x="0" y="290" rx="10" ry="10" width="280" height="90" /> 
    <rect x="123" y="394" rx="19" ry="19" width="155" height="41" />
  </ContentLoader>
)

export default PizzaSkeleton;