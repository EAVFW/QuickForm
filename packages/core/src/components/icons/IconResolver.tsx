import { EmailIcon } from "./EmailIcon";
import { TelephoneIcon } from "./TelephoneIcon";
import { UserIcon } from "./UserIcon";
import { IconProps } from "./iconProps";
import { Checkmark } from '../icons/Checkmark';

export type IconType = "Email" | "Phone" | "User" | "Checkmark" | "None";
export type IconResolverProps = {
    type?: IconType,
} & IconProps

export const IconResolver: React.FC<IconResolverProps> = ({ type, color, className, size, style }): JSX.Element => {
    switch (type) {
        case "Email": return <EmailIcon className={className} color={color} size={size} style={style} />;
        case "Phone": return <TelephoneIcon className={className} color={color} size={size} style={style} />;
        case "User": return <UserIcon className={className} color={color} size={size} style={style} />;
        case "Checkmark": return <Checkmark className={className} color={color} size={size} style={style} />;
        case "None": return <></>;
        default: return <></>;
    }
}