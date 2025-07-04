declare module "*.md" {
  const attributes: Record<string, string>;
  const markdown: string;
  export {attributes, markdown};
}
