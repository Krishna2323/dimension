import { GithubTreeFile } from "../../model/GithubAPI";

export function list_to_tree(list: GithubTreeFile[]) {
  var map: any = {},
    node,
    roots = [],
    i;

  for (i = 0; i < list.length; i += 1) {
    if (list[i].type !== "blob") {
      map[list[i].path] = list[i]; // initialize the map
      list[i].children = []; // initialize the children
    }
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.path.split("/").length > 1) {
      let folderName = node.path.split("/");
      folderName.pop();

      console.log(folderName);
      map[folderName.join("/")].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}
