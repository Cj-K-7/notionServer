import "./layout.css";

interface ILayout extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  main?: React.ReactNode;
  footer?: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ ...props }) => {
  //Render
  return (
    <div className="layout container" {...props}>
      <header className="layout header">{props.header}</header>
      <main className="layout main">{props.main}</main>
      <footer className="layout footer">{props.footer}</footer>
    </div>
  );
};

export default Layout;
