import { useState } from "react";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";

const UsersList = () => {
  const { data: users, isFetching, error } = useGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserPlan, setEditableUserPlan] = useState("");

  const toggleEdit = async (id, plan) => {
    setEditableUserId(id);
    setEditableUserPlan(plan);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        plan: editableUserPlan,
      }).unwrap();
      setEditableUserId(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (isFetching)
    return (
      <div className="flex justify-center items-center h-full w-full">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-full w-full">
        Error loading users
      </div>
    );

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-semibold mb-4 text-blue-900">
        Manage Users
      </h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              ID
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Email
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Plan
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Premium
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Admin
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr
              key={user._id}
              className={`border-t ${
                index % 2 === 0 ? "bg-white" : "bg-gray-100"
              }`}
            >
              <td className="px-6 py-4 text-sm text-gray-700">{user._id}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {editableUserId === user._id ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={editableUserPlan}
                      onChange={(e) => setEditableUserPlan(e.target.value)}
                      className="mt-1 p-2 border border-[#bdbdbd] rounded w-full"
                    />
                    <button
                      onClick={() => updateHandler(user._id)}
                      className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                    >
                      ✔
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-x-2">
                    {user.plan}{" "}
                    <button
                      onClick={() => toggleEdit(user._id, user.plan)}
                      className="rounded bg-gray-300 px-2 py-1"
                    >
                      ✏
                    </button>
                  </div>
                )}
              </td>
              <td className="px-6 py-4 text-sm">
                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    user.isPremium ? "bg-green-300" : "bg-red-300"
                  }`}
                >
                  {user.isPremium ? "✔" : "❌"}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    user.isAdmin ? "bg-green-300" : "bg-red-300"
                  }`}
                >
                  {user.isAdmin ? "✔" : "❌"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default UsersList;
