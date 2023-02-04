import { CSSProperties } from "react"
import { ShippingInfo } from "./ShippingInfo"

interface Props {
  shippingInfos: ShippingInfo[],
}
export const ResultsComponent: React.FC<Props> = (props: Props) => {  
  return (<>
    <div>
      {
        props.shippingInfos.map((shippingInfo: ShippingInfo, i) => {
          return <div style={resultStyle}>
            <span style={labelStyle}>
              label: {shippingInfo.label_id}
            </span>
            <span style={labelStyle}>
              tracking code: {shippingInfo.shipping_tracking_code}
            </span>
          </div>
        })
      }
    </div>
  </>)
}

const resultStyle: CSSProperties = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  width: "100%",
  color: "white",
  padding: "5px 0 5px 25px",
  marginBottom: "25px",
  // borderBottomStyle: "solid",
  // borderBottomColor: "grey",
}

const labelStyle: CSSProperties = {
  alignItems: "left",
  justifyContent: "left",
  textAlign: "left",
  paddingTop: "5px",

}