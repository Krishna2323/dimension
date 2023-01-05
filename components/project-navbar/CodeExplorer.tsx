import React, { Children, Fragment, useRef, useState } from "react";
import classes from "./CodeExplorer.module.scss";
import Image from "next/image";
import ArrowDownDark from "../../assets/Arrows/ArrowDownDark.svg";
import Github from "../../assets/FileIcons/github.svg";
import GithubDark from "../../assets/FileIcons/GithubDark.svg";
import { sorfByFolderFirst } from "./CodeExplorerHelper";
import { GithubImportedRepo, GithubTreeFile } from "../../model/GithubAPI";
import RecursiveFileTree from "./RecursiveFileTree";

const GithubFiles: React.FC<{ repo: GithubImportedRepo }> = (props) => {
  let { name, tree } = props.repo;
  const [open, setOpen] = useState<boolean>(false);
  const rootFileRef = useRef<HTMLDivElement>(null);
  let sortedTree = sorfByFolderFirst(tree);

  // For handling the dropdown open and close events.
  const handleMaxHeight = () => {
    setOpen((prev) => !prev);
    if (!open) {
      rootFileRef.current!.style.maxHeight =
        rootFileRef.current?.scrollHeight + "px";
      rootFileRef.current!.style.overflow = "hidden";
      rootFileRef.current!.classList.add(classes.rootFile__open);
    } else {
      rootFileRef.current!.style.maxHeight = "3rem";
      rootFileRef.current!.style.overflow = "hidden";
      rootFileRef.current!.classList.remove(classes.rootFile__open);
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
            <RecursiveFileTree key={file.sha} file={file} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default GithubFiles;
