import { Loader } from "@googlemaps/js-api-loader";
import { BsTwitter, BsBuilding, BsLightbulb } from "react-icons/bs";
import { FaHeadphones, FaIndianRupeeSign } from "react-icons/fa6";
import {
    FiAlertTriangle,
    FiTruck,
    FiCalendar,
    FiBriefcase,
    FiFileText,
    FiClock,
    FiMail,
    FiPhone,
    FiMapPin,
    FiInfo,
    FiBookOpen,
    FiUser,
    FiCreditCard,
    FiShield,
    FiBox,
    FiAlertOctagon,
    FiTarget,
    FiHome,
    FiUsers
} from "react-icons/fi";
import {
    LuMessageSquare,
    LuSend,
    LuList,
    LuArrowUp,
    LuCheck,
    LuLoader,
    LuScale
} from "react-icons/lu";
import { GiCrossMark } from "react-icons/gi";

export const Icons = {
    // Customer Support Page Icons
    Headphones: FaHeadphones,
    AlertTriangle: FiAlertTriangle,
    MessageSquare: LuMessageSquare,
    List: LuList,
    Truck: FiTruck,
    Calendar: FiCalendar,
    Briefcase: FiBriefcase,
    FileText: FiFileText,
    Clock: FiClock,
    Send: LuSend,
    Mail: FiMail,
    Phone: FiPhone,
    MapPin: FiMapPin,
    Loader: LuLoader,
    Scale: LuScale,
    Box: FiBox,
    AlertOctagon: FiAlertOctagon,
    IndianRupee: FaIndianRupeeSign,

    // Terms & Conditions Page Icons
    Info: FiInfo,
    BookOpen: FiBookOpen,
    User: FiUser,
    CreditCard: FiCreditCard,
    Shield: FiShield,
    ArrowUp: LuArrowUp,
    Check: LuCheck,
    Cross: GiCrossMark,

    // About Us Page Icons
    Target: FiTarget,
    Building: BsBuilding,
    History: FiClock, // Using clock as history metaphor
    Lightbulb: BsLightbulb, // Using Bootstrap's lightbulb
    Team: FiUsers,
    Home: FiHome,

    // Social Media Icons
    Twitter: BsTwitter,
    Linkedin: BsTwitter, // Placeholder
    Facebook: BsTwitter, // Placeholder
    Instagram: BsTwitter // Placeholder
};