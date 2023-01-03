import React, { Children, Fragment, useState } from "react";
import classes from "./CodeExplorer.module.scss";
import Image from "next/image";
import ArrowDownDark from "../../assets/Arrows/ArrowDownDark.svg";
import ArrowDown from "../../assets/Arrows/ArrowDown.svg";
import ArrowRight from "../../assets/Arrows/ArrowRight.svg";
import Folder from "../../assets/FileIcons/FolderPublic.svg";
import Github from "../../assets/FileIcons/github.svg";
import GithubDark from "../../assets/FileIcons/GithubDark.svg";
import FileIcon from "../../assets/FileIcons/file.svg";
// import { fileLogos } from "../helpers/fileIcons";
import { sorfByFolderFirst } from "./CodeExplorerHelper";
import { GithubImportedRepo, GithubTreeFile } from "../../model/GithubAPI";

const File: React.FC<{ file: GithubTreeFile }> = (props) => {
  const { file } = props;
  const [open, setOpen] = useState<boolean>(false);
  const level = file.path.split("/").length;
  const fileName = file.path.split("/")[level - 1];
  let filePath;
  if (file.type === "blob") {
    filePath = file.path.split(".").at(-1)!;
  } else {
    filePath = file.path.split("/").at(-1);
  }
  let file2;

  try {
    file2 = require(`/assets/FileIcons/${filePath}.svg`);
  } catch (error) {
    file2 = file.type === "blob" ? FileIcon : Folder;
  }

  return (
    <div className={classes.file}>
      <span
        className={`${classes.filename} 
        ${classes.blob}`}
        onClick={() => setOpen((prev) => !prev)}
        style={{
          paddingLeft: `${
            level * (level > 1 ? 1 : 0) +
            1.7 +
            (level > 2 ? level * 0.15 : 0) +
            (file.type === "blob" ? level * 0.2 : 0)
          }rem`,
          paddingTop: ".6rem",
          paddingBottom: ".6rem",
        }}
      >
        {file.children && (
          <Image src={open ? ArrowDown : ArrowRight} alt="Arrow Down" />
        )}
        <Image src={file2} width={16} height={16} alt="Folder" />
        {fileName}
      </span>
      <div
        style={{
          maxHeight: open ? "500vh" : "0rem",
          overflowY: open ? "auto" : "hidden",
          transition: "all .3s",
        }}
      >
        {file.children &&
          file.children?.length > 0 &&
          sorfByFolderFirst(file.children)?.map(
            (node: GithubTreeFile, i: number) => <File key={i} file={node} />
          )}
      </div>
    </div>
  );
};

const GithubFiles: React.FC<{ repo: GithubImportedRepo }> = (props) => {
  let { name, tree } = props.repo;
  const [open, setOpen] = useState<boolean>(false);
  let sortedTree = sorfByFolderFirst(tree);

  return (
    <Fragment>
      <div className={classes.rootFile}>
        <span
          onClick={() => {
            setOpen((prev) => !prev);
          }}
          className={open ? classes.rootFile__open : ""}
        >
          <Image src={open ? GithubDark : Github} alt="Arrow Down" />
          <span>{name} </span>
          <Image src={open ? ArrowDownDark : ArrowRight} alt="Arrow Down" />
        </span>
        <div
          className={`${classes.rootFile__files} ${
            open ? classes.rootFile__files__open : ""
          }`}
        >
          {sortedTree.map((file: GithubTreeFile) => (
            <File key={file.sha} file={file} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default GithubFiles;
