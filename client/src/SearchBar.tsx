import React, { CSSProperties, FC, useState } from "react";
import axios from 'axios';

interface Props {

}
export const SearchBar: FC<Props> = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let query: string = event.currentTarget.value;

    setQuery(query);
    if (query && query.length > 0) {
      try {
        setSuggestions((await axios.get(`http://localhost:3001/api/autocomplete/${query}`)).data);
      } catch (ex) {
        console.error(ex);
      }
    } else {
      setSuggestions([]);
    }
  }

  const onClickSuggestion = (event: React.MouseEvent<HTMLLIElement>, i: number) => {    
    setQuery(suggestions[i]);
    setSuggestions([]);
  }

  return (<>
    <input
      type="text"
      value={query}
      onChange={onChange}
      placeholder="Search kit id"
      style={suggestions.length > 0 ? searchBarStyle : emptySearchBarStyle}
    />
    {
      suggestions && suggestions.length > 0 ?
        <div style={suggestionBoxStyle}>
          {
            suggestions.map((suggestion, i: number) => {
              return <li key={suggestion} style={suggestionStyle} onClick={(e) => onClickSuggestion(e, i)}>
                {suggestion}
              </li>
            })
          }
        </div>
        :
        <></>
    }
  </>)
}

const suggestionBoxStyle: CSSProperties = {
  borderTopStyle: "solid",
  borderTopColor: "black",
  backgroundColor: "white",
  zIndex: "2",
  fontSize: "15px",
  borderTopWidth: "0",
  listStyle: "none",
  marginTop: "0",
  marginLeft: "0",
  paddingTop: "10px",
  width: "calc(300px + 2rem)",
  borderRadius: "0 0 5px 5px",
  paddingBottom: "10px",
}

const suggestionStyle: CSSProperties = {
  display: "flex",
  alignItems: "left",
  justifyContent: "left",
  height: "20px",
  backgroundColor: "white",
  padding: "0.5rem"
}

const emptySearchBarStyle: CSSProperties = {
  width: "calc(300px + 1rem)",
  marginBottom: "0",
  height: "34px",
  fontSize: "16px",
  borderRadius: "5px 5px 5px 5px",
  borderStyle: "none",
  padding: "0.5rem",
  outline: "none",
}

const searchBarStyle: CSSProperties = {
  width: "calc(300px + 1rem)",
  marginBottom: "0",
  height: "34px",
  fontSize: "16px",
  borderRadius: "5px 5px 0 0",
  borderStyle: "none",
  borderBottomStyle: "solid",
  borderBottomColor: "grey",
  padding: "0.5rem",
  outline: "none",
}