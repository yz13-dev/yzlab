import { SitesItem } from "@yzlab/api/types";




export const makeLink = (link: SitesItem) => {

  const pathname = link.pathname;
  const domain = link.domain;

  return `/${domain}?path=${pathname}`
}
