import { EmailIcon } from "./EmailIcon";
import { TelephoneIcon } from "./TelephoneIcon";
import { UserIcon } from "./UserIcon";
import { IconProps } from "./iconProps";

export type IconType = "Email" | "Phone" | "User";
export type IconResolverProps = {
    type: IconType,
} & IconProps

export const IconResolver: React.FC<IconResolverProps> = ({ type, color, className, size }) => {
    switch (type) {
        case "Email": return <EmailIcon className={className} color={color} size={size} />
        case "Phone": return <TelephoneIcon className={className} color={color} size={size} />
        case "User": return <UserIcon className={className} color={color} size={size} />
        default: return <UserIcon className={className} color={color} size={size} />
    }
}