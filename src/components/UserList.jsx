function UserList({users}) {
    // return (<div>{users.map((u) => (
    //     <div key={u.id}><p>{u.firstName} {u.lastName} {u.email} {u.role} {u.createdAt}</p></div>
    // })
    return (<div>
        {users.map((u) => (<div key={u.id}>{u.firstName}</div>))}
    </div>)
}

    export default UserList