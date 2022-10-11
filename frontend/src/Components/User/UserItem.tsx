import "./User.css";

interface IUser extends React.LiHTMLAttributes<HTMLLIElement> {
  userName: string;
  status?: {};
}

const UserItem: React.FC<IUser> = ({ userName, status, ...props }) => {
  return <li {...props}>{userName}</li>;
};

export default UserItem;
