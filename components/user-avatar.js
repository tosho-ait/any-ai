import {useUser} from "@clerk/nextjs";
import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar";

export default function UserAvatar({}) {

    const {user} = useUser();

    console.log(user)

    return (
        <Avatar className="h-8 w-8">
            <AvatarImage src={user?.imageUrl}/>
            <AvatarFallback>
                {user?.firstName.charAt(0)}
                {user?.lastName.charAt(0)}
            </AvatarFallback>
        </Avatar>

    );
}
