declare global {
  declare const timeTest = async (func: (...args: any) => any) => {
    await console.time("test");
    await func();
    await console.timeEnd("test");
  };
  type User = {
    object: string;
    id: string;
    name: string;
    person: { email: string };
    avatar_url: string;
  };
  type Category = { id: string; name: string; color: string };
  type Page = {
    object: "page";
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
      [key: string]: any;
    };
    parent: {
      type: "page_id" | "database_id";
      page_id: string;
      database_id: string;
    };
    url: string;
    archived: boolean;
  };

  interface CalendarPage extends Page {}

  type CalendarPagePropType =
    | "title"
    | "date"
    | "people"
    | "multi_select"
    | "create_by"
    | "last_edited_by"
    | "rich_text";

  interface CalendarPageProp<T extends CalendarPagePropType> {
    id: string;
    type: T;
    // [key: T]: T extends T
  }
  interface CalendarPagePropAssign extends CalendarPageProp<"title"> {
    title: { plain_text: string }[];
  }
  interface CalendarPagePropAssign extends CalendarPageProp<"people"> {
    people: {
      object: string;
      id: string;
      name: string;
      person: { email: string };
      avatar_url: string;
    }[];
  }
  interface CalendarPageProp기간 extends CalendarPageProp<"date"> {
    date: {
      end: string | null;
      start: string | null;
      time_zone: string | null;
    };
  }
  interface CalendarPageProp범주 extends CalendarPageProp<"multi_select"> {
    multi_select: Category[];
  }
  interface CalendarPagePropsCreatedBy extends CalendarPageProp<"create_by"> {
    create_by: User;
  }
  interface CalenderPageProps {
    Assign: CalendarPagePropAssign;
    기간: CalendarPageProp기간;
    범주: CalendarPageProp범주;
  }
}

export {};
