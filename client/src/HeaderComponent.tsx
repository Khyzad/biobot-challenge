import { CSSProperties } from "react"
import { SearchBar } from "./SearchBar"

interface Props {
  getSearch: (query: string) => Promise<void>,
}
export const HeaderComponent: React.FC<Props> = (props: Props) => {
  return (<>
    <div style={searchPanelStyle}>
      <img src="/biobot_logo.svg" width="150px" height="75px" />
      <SearchBar getSearch={props.getSearch} />
    </div>
  </>)
}


const searchPanelStyle: CSSProperties = {
  position: "relative",
  //display: "flex",
  // alignItems: "center",
  // justifyContent: "flex-start",
  // flexDirection: "row",
  zIndex: "1",
  borderColor: "grey",
  borderBottomStyle: "solid",
  minWidth: "50%",
  padding: "20px",
  margin: "20px",
  columnGap: "10px",
  height: "150px",
}