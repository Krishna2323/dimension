import React, { useState } from "react";
import classes from "./CodeExplorer.module.scss";
import Image from "next/image";
import ArrowRight from "../../assets/Arrows/ArrowRightLightDark.svg";
import Folder from "../../assets/FileIcons/FolderPublic.svg";
import FileIcon from "../../assets/FileIcons/file.svg";
import { sorfByFolderFirst } from "./CodeExplorerHelper";
import { GithubTreeFile } from "../../model/GithubAPI";

const RecursiveFileTree: React.FC<{
  file: GithubTreeFile;
  levelToSub: number;
}> = React.memo(function treeFile(props) {
  const { file, levelToSub } = props;
  const [open, setOpen] = useState<boolean>(false);
  const level = file.path.split("/").length - levelToSub;
  let fileName = file.path.split("/").at(-1);

  // For not creating nested folder if there is only one children folder
  let breakLoop = false;
  let fileCopy = Object.assign({}, file);
  let childToPass = Object.assign({}, file);
  let levelToSubtract = 0 || levelToSub;

  while (fileCopy && fileCopy.children && !breakLoop) {
    console.log("RUNNN");
    if (
      fileCopy.children.length === 1 &&
      fileCopy.children[0].type !== "blob"
    ) {
      fileName += "/" + fileCopy.children[0].path.split("/").at(-1);
      fileCopy = fileCopy.children[0];
      levelToSubtract++;
    } else if (fileCopy.children.length > 1) {
      childToPass = fileCopy;
      breakLoop = true;
    } else if (
      fileCopy.children.length === 1 &&
      fileCopy.children[0].type === "blob"
    ) {
      childToPass = fileCopy;
      breakLoop = true;
    } else {
      childToPass.children = undefined;
      return null;
    }
  }

  // Extracting file extension for icons
  let fileExtention;
  if (file.type === "blob") {
    fileExtention = file.path.split(".").at(-1)!;
  } else {
    fileExtention = file.path.split("/").at(-1);
  }
  let fileIcon;

  try {
    fileIcon = require(`/assets/FileIcons/${fileExtention}.svg`);
  } catch (error) {
    fileIcon = file.type === "blob" ? FileIcon : Folder;
  }

  // Defining padding dynamically according to the folder/file level
  let paddingLeft = `${
    level * 1.75 + level * 0.08 + (file.type === "blob" ? level * 0.07 : 0)
  }rem`;

  return (
    <div className={classes.file}>
      <span
        className={`${classes.filename} 
          ${classes.blob}`}
        onClick={() => setOpen((prev) => !prev)}
        style={{
          paddingLeft,
          paddingTop: ".7rem",
          paddingBottom: ".7rem",
          paddingRight: ".6rem",
        }}
      >
        {file.children && (
          <Image
            src={ArrowRight}
            style={{
              transform: `${open ? "rotate(90deg)" : "rotate(0deg)"}`,
              transition: "all .15s",
            }}
            alt="Arrow Down"
          />
        )}
        <Image src={fileIcon} width={16} height={16} alt="Folder" />
        {fileName}
      </span>
      <div
        style={{
          display: open ? "block" : "none",
          overflowY: open ? "unset" : "hidden",
          transition: "all .3s",
        }}
      >
        {childToPass.children &&
          childToPass.children.length > 0 &&
          sorfByFolderFirst(childToPass.children)?.map(
            (node: GithubTreeFile, i: number) => (
              <RecursiveFileTree
                levelToSub={levelToSubtract}
                key={i}
                file={node}
              />
            )
          )}
      </div>
    </div>
  );
});

export default RecursiveFileTree;
