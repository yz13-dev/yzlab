import { DomainLink } from "@yzlab/api/types/domains";




export const makeLink = (link: DomainLink) => {

  const pathname = link.pathname;
  const domain = link.domain;

  return `/${domain}?path=${pathname}`
}
