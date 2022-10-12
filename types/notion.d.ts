type PropertyType =
  | "title"
  | "rich_text"
  | "number"
  | "select"
  | "multi_select"
  | "date"
  | "people"
  | "files"
  | "checkbox"
  | "url"
  | "email"
  | "phone_number"
  | "formula"
  | "relation"
  | "rollup"
  | "created_time"
  | "created_by"
  | "last_edited_time"
  | "last_edited_by"
  | "status";

type Property = {
  id: string;
  type: PropertyType;
  [key: PropertyType]: Array | Object | any[];
};

export interface NotionUser {
  object: "user" | "bot" | string;
  id: string;
}

export interface NotionPage {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: { object: string; id: string };
  last_edited_by: { object: string; id: string };
  cover: string | null;
  icon: string | null;
  parent: {
    type: "database_id" | string;
    database_id: string;
  };
  archived: boolean;
  properties: {
    [key: string]: Property;
  };
  url: string;
}

export interface NotionDatabase {
  object: string;
  id: string;
  next_cursor: NonNullable;
  has_more: boolean;
  type: "page" | string;
  page: object;
  result: NotionPage[];
}
