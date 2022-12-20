declare global {
  declare const timeTest = async (func: (...args: any) => any) => {
    await console.time("test");
    await func();
    await console.timeEnd("test");
  };
  type User = {};
  type Page = {
    object: string;
    id: string;
    cover: object | null;
    icon: {
      type: "emoji";
      emoji: string;
    };
    created_time: string;
    created_by: {
      object: "user" | string;
      id: string;
    };
    last_edited_by: {
      object: "user" | string;
      id: string;
    };
    last_edited_time: string;
    title: {
      type: string;
      text: {
        content: string;
        link: sting | null;
      };
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: "default" | string;
      };
      plain_text: string;
      href: string | null;
    }[];
    description: any[];
    is_inline: boolean;
    properties: {
      [x: string]: any;
    };
    parent: {
      type: "page_id" | "database_id";
      page_id: string;
      database_id: string;
    };
    url: string;
    archived: boolean;
  };
}

export {};
