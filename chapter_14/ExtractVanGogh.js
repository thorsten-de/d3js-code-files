const tables = [
  { index: 0, medium: "oil" },
  { index: 1, medium: "oil" },
  { index: 2, medium: "oil" },
  { index: 3, medium: "oil" },
  { index: 4, medium: "oil" },
  { index: 5, medium: "oil" },
  { index: 6, medium: "watercolor" },
  { index: 7, medium: "print" },
  { index: 8, medium: "print" },
];

const domTables = document.querySelectorAll(
  ".wikitable.sortable"
);
const paintings = [];

domTables.forEach((table, i) => {
  if (i <= tables.length - 1) {
    const medium = tables[i].medium;

    const rows = table.querySelectorAll("tbody tr");
    rows.forEach(row => {
      let title;
      if (row.querySelector("figcaption i a")) {
        title = row.querySelector("figcaption i a")
          .textContent;
      } else if (row.querySelector("figcaption i")) {
        title = row.querySelector("figcaption i")
          .textContent;
      } else {
        title = null;
      }

      let imageLink;
      if (row.querySelector("figure img")) {
        const image = row.querySelector(
          "figure img"
        ).srcset;
        imageLink = `https:${image.slice(0,
          image.indexOf("1.5x") - 1
        )}`;
      } else {
        imageLink = null;
      }

      paintings.push({
        title: title,
        imageLink: imageLink,
        medium: medium
      });
    })
  }
});

console.log(paintings);