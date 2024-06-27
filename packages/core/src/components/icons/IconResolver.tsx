import { EmailIcon } from "./EmailIcon";
import { TelephoneIcon } from "./TelephoneIcon";
import { UserIcon } from "./UserIcon";
import { IconProps } from "./iconProps";
import { Checkmark } from '../icons/Checkmark';
import { ChevronRight } from "./ChevronRight";

export enum IconEnum {
    None = "None",
    Email = "Email",
    Phone = "Phone",
    User = "User",
    Checkmark = "Checkmark",
    ChevronRight = "ChevronRight"
}

export type IconType = keyof typeof IconEnum;

export type IconResolverProps = {
    type?: IconType,
} & IconProps

export const IconResolver: React.FC<IconResolverProps> = ({ type, color, className, size, style }): JSX.Element => {
    switch (type) {
        case "Email": return <EmailIcon className={className} color={color} size={size} style={style} />;
        case "Phone": return <TelephoneIcon className={className} color={color} size={size} style={style} />;
        case "User": return <UserIcon className={className} color={color} size={size} style={style} />;
        case "Checkmark": return <Checkmark className={className} color={color} size={size} style={style} />;
        case "ChevronRight": return <ChevronRight className={className} color={color} size={size} style={style} />
        case "None": return <></>;
        default: return <></>;
    }
}