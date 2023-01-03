import React, { Fragment, useEffect } from "react";
import { Transition } from "react-transition-group";
import classes from "./UserRepos.module.scss";
import ReactDom from "react-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import Backdrop from "../../../ui/Backdrop/Backdrop";
import { getUserRepoTree, getUserRepos } from "../../../store/User/UserActions";
import Image from "next/image";
import Link from "next/link";
import { uiSliceActions } from "../../../store/UI/UiSlice";
import { UiSliceType } from "../../../store/UI/UiSliceType";
import { UserSliceType } from "../../../store/User/UserSliceType";

const UserRepos = () => {
  const dispacth = useAppDispatch();
  const {
    userRepos: { display },
  }: UiSliceType = useAppSelector((state) => state.ui);
  const { githubRepos, user, githubImportedRepos }: UserSliceType =
    useAppSelector((state) => state.user);

  const onBackdropClick = () => {
    dispacth(uiSliceActions.toggleUserRepos({}));
  };

  useEffect(() => {
    if (githubRepos.length === 0 && user) {
      dispacth(getUserRepos(user));
    }
  }, [githubRepos, user, dispacth]);

  const onImportClick = (repo: any) => () => {
    dispacth(getUserRepoTree(repo, user, githubImportedRepos));
  };

  return (
    <Transition in={display} unmountOnExit mountOnEnter timeout={300}>
      {() =>
        ReactDom.createPortal(
          <Fragment>
            <Backdrop display={display} onBackdropClick={onBackdropClick} />
            <div className={classes.userRepos}>
              <h3>Import Repository</h3>
              <div className={classes.userRepos__list}>
                {githubRepos.map((e: any) => (
                  <div key={e.name} className={classes.userRepos__listItem}>
                    <Image
                      src="https://api-frameworks.vercel.sh/framework-logos/next-dark.svg"
                      alt="Seacrh Icon"
                      width={20}
                      height={20}
                    />
                    <span className={classes.userRepos__listItem__name}>
                      {user.user.user_metadata.preferred_username}/{e.name}
                    </span>
                    <Link href={e.html_url}>View on Github</Link>
                    <button onClick={onImportClick(e)}>Import</button>
                  </div>
                ))}
              </div>
            </div>
          </Fragment>,
          document.getElementById("backdrop")!
        )
      }
    </Transition>
  );
};

export default UserRepos;
