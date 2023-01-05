import React, { Children, Fragment, useRef, useState } from "react";
import classes from "./CodeExplorer.module.scss";
import Image from "next/image";
import ArrowRight from "../../assets/Arrows/ArrowRightLightDark.svg";
import Folder from "../../assets/FileIcons/FolderPublic.svg";
import FileIcon from "../../assets/FileIcons/file.svg";
import { sorfByFolderFirst } from "./CodeExplorerHelper";
import { GithubTreeFile } from "../../model/GithubAPI";

const RecursiveFileTree: React.FC<{ file: GithubTreeFile }> = (props) => {
  const { file } = props;
  const [open, setOpen] = useState<boolean>(false);
  const level = file.path.split("/").length;
  const fileName = file.path.split("/")[level - 1];

  // For extracting the extention name for icons
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
          paddingTop: ".6rem",
          paddingBottom: ".6rem",
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
          maxHeight: open ? "500vh" : "0rem",
          overflowY: open ? "unset" : "hidden",
          transition: "all .3s",
        }}
      >
        {file.children &&
          file.children?.length > 0 &&
          sorfByFolderFirst(file.children)?.map(
            (node: GithubTreeFile, i: number) => (
              <RecursiveFileTree key={i} file={node} />
            )
          )}
      </div>
    </div>
  );
};

export default RecursiveFileTree;
