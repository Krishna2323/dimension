import React, { Children, Fragment, useRef, useState } from "react";
import classes from "./CodeExplorer.module.scss";
import Image from "next/image";
import ArrowDownDark from "../../assets/Arrows/ArrowDownDark.svg";
import ArrowRight from "../../assets/Arrows/ArrowRightLightDark.svg";
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
        <Image src={file2} width={16} height={16} alt="Folder" />
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
  const rootFileRef = useRef<HTMLDivElement>(null);

  const handleMaxHeight = () => {
    setOpen((prev) => !prev);

    if (!open) {
      rootFileRef.current!.style.maxHeight =
        rootFileRef.current?.scrollHeight + "px";
      rootFileRef.current!.style.overflow = "unset";
    } else {
      rootFileRef.current!.style.maxHeight = "3rem";
      rootFileRef.current!.style.overflow = "hidden";
    }
  };

  return (
    <Fragment>
      <div className={classes.rootFile} ref={rootFileRef}>
        <span
          onClick={handleMaxHeight}
          className={open ? classes.rootFile__open : ""}
        >
          <Image src={open ? GithubDark : Github} alt="Arrow Down" />
          <span>{name} </span>
          <Image
            src={ArrowDownDark}
            style={{
              transform: `${open ? "rotate(0deg)" : "rotate(-90deg)"}`,
              transition: "all .15s",
              opacity: open ? 1 : 0.6,
            }}
            alt="Arrow Down"
          />
        </span>
        <div>
          {sortedTree.map((file: GithubTreeFile) => (
            <File key={file.sha} file={file} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default GithubFiles;
