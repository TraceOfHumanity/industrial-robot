const iconsModules = import.meta.glob("/src/assets/*.svg", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export const icons = Object.entries(iconsModules).reduce(
  (acc, [path, svgContent]) => {
    const fileName = path.split("/").pop()?.replace(".svg", "") || "";
    acc[fileName] = svgContent;
    return acc;
  },
  {} as Record<string, string>,
) satisfies Record<string, string>;

export type Icon = keyof typeof icons;
