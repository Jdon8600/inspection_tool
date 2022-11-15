import Link from "next/link";

function Projects(props) {
  return (
    <div>
      <h1>Welcome {props.session.user.email}</h1>
      <div>
        <p>Please Select the project you would like to update</p>
        <ul>
          {props.project.map((items) => (
            <li key={items.id}>
              <Link href={`/projects/${items.id}`}>{items.display_name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Projects;
