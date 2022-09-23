import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getUserList = async () => {
  const userList = await notion.users.list({});
  return userList;
};

export const getDatabase = async (database_id: string) => {
  const database = await notion.databases.query({
    database_id,
  });
  return database;
};

export const getPage = async (page_id: string) => {
  const pageInfo = await notion.pages.retrieve({
    page_id,
  });
  return pageInfo;
};
