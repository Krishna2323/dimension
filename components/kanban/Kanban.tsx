import classes from "./Kanban.module.scss";
import KanbanHeader from "./KanbanHeader";
import KanbanToolbar from "./KanbanToolbar";
import KanbanBoard from "./KanbanBoard/KanbanBoard";
import { Fragment } from "react";
import ProjectNavbar from "../project-navbar/ProjectNavbar";

const Kanban = () => {
  return (<section className={classes.kanbanDashboard}>
    <ProjectNavbar/>
    <div className={classes.kanban}>
        <KanbanHeader/>
        <KanbanToolbar/>
        <KanbanBoard/>
    </div>
  </section>
  );
};

export default Kanban;
