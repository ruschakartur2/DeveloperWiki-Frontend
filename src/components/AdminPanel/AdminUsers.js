import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import {deleteUser, retrieveBannedUsers, retrieveUsersList, updateUser} from "../../actions/admin";
import 'rsuite-table/dist/css/rsuite-table.css';


const AdminUsers = () => {

    const currentUser = useSelector(state => state.auth.user)
    const {isLoggedIn} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const usersList = useSelector(state => state.admin.users);
    const [banned, setBanned] = useState(false);
    const [muted, setMuted] = useState(false);
    const [editId, setEditId] = useState(null);

    const [newEmail, setNewEmail] = useState('')
    const [newNickname, setNewNickname] = useState('')
    const [newModerStatus, setNewModerStatus] = useState('')
    const [newAdminStatus, setNewAdminStatus] = useState('')


    useEffect(() => {
        dispatch(retrieveUsersList())
            .then((res) => {
                console.log(res)
            });
    }, [dispatch])

    const handleBan = (id) => {
        if (!banned) {
            dispatch(deleteUser(id))
                .then(() => {
                    dispatch(retrieveUsersList())
                })
        } else if (banned) {
            dispatch(updateUser(id, {'is_banned': false})).then((res) => {
                console.log(res)
            })
                .then(() => {
                    dispatch(retrieveBannedUsers())
                })
        }
    }
    const handleMute = (id) => {

        dispatch(updateUser(id, {'is_muted': muted}))
            .then(() => {
                dispatch(retrieveUsersList())
            })

    }
    const startEdit = (user) => {
        setEditId(user.id)
        setNewEmail(user.email)
        setNewNickname(user.nickname)
        setNewAdminStatus(user.is_staff)
        setNewModerStatus(user.is_moder)
    }

    const handleUserUpdate = (id) => {
        let form_data = new FormData();
        form_data.append('nickname', newNickname);
        form_data.append('email', newEmail);
        form_data.append('is_moder', newModerStatus);
        form_data.append('is_staff', newAdminStatus);

        dispatch(updateUser(id, form_data))
            .then(() => {
                if (banned) {
                    dispatch(retrieveBannedUsers());
                }
                else {
                    dispatch(retrieveUsersList())
                }
                setEditId(null);
            })
            .catch((e) => {
                console.log(e);
            })

    }

    if (!isLoggedIn) {
        return <Redirect to="/login"/>;
    }
    if (!currentUser) {
        return <Redirect to="/login"/>
    }
    if (!currentUser.is_staff) {
        return <Redirect to="/profile"/>
    }

    return (
        <div width={1000}>
            <h1 className="text-center p-4">
                Welcome <b>{currentUser.email}</b> in admin panel
            </h1>
            <button className={!banned ? ('btn-warning btn') : ('btn')} onClick={() => {
                dispatch(retrieveUsersList());
                setBanned(false)
            }}>All users
            </button>
            |
            <button className={banned ? ('btn-warning btn') : ('btn')} onClick={() => {
                dispatch(retrieveBannedUsers());
                setBanned(true)
            }}> Banned users
            </button>
            {usersList && (
                <div>
                    <table className="table">
                        <thead>

                        <th scope="col">#</th>
                        <th scope="col">Email</th>
                        <th scope="col">Nickname</th>
                        <th scope="col">Admin</th>
                        <th scope="col">Moder</th>
                        <th scope="col">Actions</th>
                        </thead>
                        <tbody>
                        {usersList.map((user, index) => (<tr key={index}>
                                <th scope="row">{user.id}</th>
                                {editId === user.id ?
                                    (<td><input type="text"
                                                value={newEmail}
                                                onChange={(e) => {
                                                    setNewEmail(e.target.value)
                                                }}
                                    /></td>)
                                    :
                                    (<td> <Link to={{pathname: "/profile/" + user.id, state: {id: user.id}}}
                                                className="mt-2 mb-2 text-muted">{user.email}</Link></td>)}
                                {editId === user.id ?
                                    (<td><input type="text"
                                                value={newNickname}
                                                onChange={(e) => {
                                                    setNewNickname(e.target.value)
                                                }}
                                    /></td>)
                                    :
                                    (<td>{user.nickname}</td>)}
                                {editId === user.id ?
                                    (<td><input type="checkbox"
                                                checked={newAdminStatus}
                                                onClick={(e) => {
                                                    setNewAdminStatus(!newAdminStatus)
                                                }}
                                    /></td>)
                                    :
                                    (<td><input type="checkbox" checked={user.is_staff}/></td>)}
                                {editId === user.id ?
                                    (<td><input type="checkbox"
                                                checked={newModerStatus}
                                                onClick={(e) => {
                                                    setNewModerStatus(!newModerStatus)
                                                }}
                                    /></td>)
                                    :
                                    (<td><input type="checkbox" checked={user.is_moder}/></td>
                                    )}

                                {user.id !== currentUser.id && (
                                    <td>
                                        {editId === user.id ?
                                            (<button className="btn btn-warning" onClick={() => {
                                                handleUserUpdate(user.id)
                                            }}>Save</button>)
                                            :
                                            (<button className="btn btn-warning" onClick={() => {
                                                startEdit(user)
                                            }}>Edit</button>)
                                        }


                                        <button className="btn btn-danger ml-3" onClick={() => {

                                            handleBan(user.id)

                                        }}> {banned ? ('Unban') : ('Ban')}

                                        </button>
                                        {!banned && (<button className="btn btn-danger ml-3" onClick={() => {
                                            setMuted(!user.is_muted);
                                            handleMute(user.id);
                                        }}> {user.is_muted ? ('Unmute') : ('Mute')}
                                        </button>)}

                                    </td>
                                )}
                            </tr>)
                        )}

                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
