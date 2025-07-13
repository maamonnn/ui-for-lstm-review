interface IUser {
    email : string;
    password : string;
};

type userFactory = () => IUser;

export type { IUser,userFactory };