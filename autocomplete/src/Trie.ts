import { ShippingInfo } from "./ShippingInfo"


export class AutoCompleter {
  head: TrieNode;

  constructor() {
    this.head = new TrieNode();
  }

  // 'warms' the object by storing a set of ShippingInfo's into a Trie so that we could perform searches
  // later
  public add = (payload: ShippingInfo[]): void => {
    payload.forEach(info => this.head.add(info, 0));
  };

  public find = (query: string, i: number = 0): string[] => {
    let result: TrieNode | null = this.head.search(query);
    if (result) {   

      // we found an exact match 
      if (result.data) {
        return [result.data.label_id];
      }

      // since there isn't an exact match we recursively collect all potential matches 
      let collect = (node: TrieNode): string[] => {
        if(node.data) {
          return [node.data.label_id];
        }

        let result: string[] = [];
        for(let key in node.children) {      
          result = [ ...result, ...collect(node.children[key])];
        }
        return result;
      }

      return collect(result);
    }

    // return an empty array if there is no reuslt
    return [];
  };
}

// An implementation of a prefix trie so that we can perform autocompletion
class TrieNode {
  data?: ShippingInfo;
  children: { [key: string]: TrieNode };

  constructor(data?: ShippingInfo) {
    this.data = data;

    this.children = {};
  }

  public add = (data: ShippingInfo, i: number): TrieNode => {
    if (i >= data.label_id.length) {
      this.data = data;
      return this;
    }

    let code: string = data.label_id[i];
    if (!this.children[code]) {
      this.children[code] = new TrieNode();
    }

    return this.children[code].add(data, i + 1);
  }

  public search = (query: string, i: number = 0): TrieNode | null => {
    if (i >= query.length) {
      return this;
    }

    let code: string = query[i];
    if (this.children[code]) {
      return this.children[code].search(query, i + 1);
    }

    return null;
  }
}