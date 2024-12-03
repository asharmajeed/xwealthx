import UsersList from "./UsersList";

const AdminDashboard = () => {
  // const { userInfo } = useUser();

  // const getUsers = async () => {
  //   await fetch(`${BASE_URL}/api/auth/logout`, {
  //     method: "POST",
  //     credentials: "include",
  //   });
  //   logout();
  // };

  return (
    <div>
      <UsersList />
    </div>
  );
};
export default AdminDashboard;
