import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();

const notionAPI = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const searchDatabases = async (query?: string) => {
  const databases = await notionAPI.search({
    query,
    filter: { property: "object", value: "database" },
  });
  return databases;
};

export const getUserList = async () => {
  const args = {};
  const userList = await notionAPI.users.list(args);
  return userList;
};

interface DatabaseQueryFilter {
  or?: { [key: string]: any }[];
  sorts?: { property: string; direction: "ascending" | "descending" }[];
}

export const getDatabase = async (
  database_id: string,
  filter?: DatabaseQueryFilter
) => {
  const database = await notionAPI.databases.query({
    database_id,
    filter: filter as any,
  });
  return database;
};

export const getPage = async (page_id: string) => {
  const pageInfo = await notionAPI.pages.retrieve({
    page_id,
  });
  return pageInfo;
};

export default notionAPI;
