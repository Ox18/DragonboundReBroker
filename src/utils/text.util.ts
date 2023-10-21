export const cleanText = (text: string): string => {
  return text
    .replace(/(\r\n|\n|\r)/gm, "")
    .replace(/\s+/g, " ")
    .trim();
};

export const removeHTMLTags = (html: string): string => {
  return html.replace(/(<([^>]+)>)/gi, "");
};
