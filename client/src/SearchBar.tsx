import React, { CSSProperties, FC, useState } from "react";
import axios from 'axios';

interface Props {
  getSearch: (query: string) => Promise<void>,
}
export const SearchBar: FC<Props> = (props: Props) => {
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
    props.getSearch(suggestions[i]);
  }

  const onSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSuggestions([]);
    props.getSearch(query);
  }

  return (<>
    <form onSubmit={onSubmitSearch} style={{ position: 'relative' }}>
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
    </form>
  </>)
}

const suggestionBoxStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  flexDirection: "column",
  borderTopStyle: "solid",
  borderTopColor: "black",
  backgroundColor: "white",
  zIndex: "2",
  fontSize: "15px",
  padding: "0.5rem",
  margin: "auto",
  width: "50vw",
}

const suggestionStyle: CSSProperties = {
  listStyle: "none",
  zIndex: "100",
  flexDirection: "row",
  alignItems: "center",
  height: "20px",
  backgroundColor: "white",
  padding: "0.5rem 0",
}

const emptySearchBarStyle: CSSProperties = {
  width: "50vw",
  marginBottom: "0",
  height: "34px",
  fontSize: "16px",
  borderRadius: "5px 5px 5px 5px",
  borderStyle: "none",
  padding: "0.5rem",
  outline: "none",
}

const searchBarStyle: CSSProperties = {
  width: "50vw",
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