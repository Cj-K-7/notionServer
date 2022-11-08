import "./Layout.css";

interface ILayout extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  main?: React.ReactNode;
  footer?: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ ...props }) => {
  //Functions
  const onMouseEnter: React.MouseEventHandler<HTMLElement> = (event) => {
    const {
      currentTarget: { style },
    } = event;
    style.transform = `translateY(5vh)`;
  };
  const onMouseLeave: React.MouseEventHandler<HTMLElement> = (event) => {
    const {
      currentTarget: { style },
    } = event;
    style.transform = `translateY(0vh)`;
  };

  //Render
  return (
    <div className="layout container" {...props}>
      <header
        className="layout header"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {props.header}
      </header>
      <main className="layout main">{props.main}</main>
      <footer className="layout footer">{props.footer}</footer>
    </div>
  );
};

export default Layout;
