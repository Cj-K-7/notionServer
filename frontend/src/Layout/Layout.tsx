import "./Layout.css";

interface ILayout extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  main?: React.ReactNode;
  footer?: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ ...props }) => {
  return (
    <div {...props}>
      <header>{props.header}</header>
      <main>{props.main}</main>
      <footer>{props.footer}</footer>
    </div>
  );
};

export default Layout;
