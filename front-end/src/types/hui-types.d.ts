export{};
declare global{
    interface RoutesType{
        name:string,
        layout:string,
        path:string,
        component:JSX.Element;
        icon:JSX.Element|string;
        secondary?:boolean;
    }

    interface IUser{
        id?:any | null,
        username:string,
        email:string,
        password:string,
        roles?:Array<string>
    }
    interface ProductObj  {
        name: string;
        description: string;
        price: string;
        image: string;
        owner: string;
        _id: string;
    };
    interface ProfileObj  {
        username: string;
        location:string;
        website:string;
        company: string;
        phone: string;
        birthday: string;
        avatar:string;
        // owner: string;
        // _id: string;
    };
    
}