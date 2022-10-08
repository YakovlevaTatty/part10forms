import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditForm from "../components/ui/editForm";
const Users = () => {
    const params = useParams();
    console.log("params", params);
    const { userId, edit } = params;
    console.log("userId", userId, edit);

    return (
        <>
            {userId ? (
                edit ? (
                    <EditForm userId={userId} />
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
