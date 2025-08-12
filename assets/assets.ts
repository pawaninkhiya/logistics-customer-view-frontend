// @assets/icons.ts
import { FaGoogle, FaExpand, FaCompress, FaSearch, FaUser, FaBell, FaCog } from "react-icons/fa";
import { 
  LuLoader, 
  LuMapPin, 
  LuPackage, 
  LuCalendarClock,
  LuWeight,
  LuArrowRightLeft,
  LuArrowLeft,
  LuMap,
  LuMenu,
  LuX,
  LuChevronDown,
  LuChevronUp,
  LuSettings,
  LuUser,
  LuBell,
  LuShoppingCart,
  LuHeart,
  LuStar,
  LuFilter,
  LuPlus,
  LuMinus,
  LuCheck,
  LuArrowRight
} from "react-icons/lu";
import { 
  HiLockClosed, 
  HiLocationMarker, 
  HiHome, 
  HiOutlineLocationMarker,
  HiOutlineCube,
  HiOutlineUser,
  HiOutlineShoppingBag
} from "react-icons/hi";
import { 
  FiTruck,
  FiPackage,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiDollarSign,
} from "react-icons/fi";
import { 
  IoCalendarOutline,
  IoTimeOutline,
  IoPricetagOutline,
  IoSearchOutline,
  IoPersonOutline,
  IoNotificationsOutline,
  IoSettingsOutline
} from "react-icons/io5";
import { 
  MdOutlineDirections,
  MdOutlineMyLocation,
  MdOutlinePlace,
  MdOutlineLocalShipping,
  MdOutlineDashboard,
  MdOutlineHelp,
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineChat
} from "react-icons/md";
import { RiLogoutBoxRLine, RiCustomerService2Line } from "react-icons/ri";
import { BiSolidOffer, BiHistory } from "react-icons/bi";
import { BsCart, BsHeart, BsStar, BsFilter } from "react-icons/bs";

export const Icons = {
  // Authentication
  Google: FaGoogle,
  Lock: HiLockClosed,
  Logout: RiLogoutBoxRLine,
  
  // Loading
  Loader: LuLoader,
  
  // Location
  Location: HiLocationMarker,
  LocationOutline: HiOutlineLocationMarker,
  Home: HiHome,
  PickupPin: LuMapPin,
  DeliveryPin: LuPackage,
  Place: MdOutlinePlace,
  MyLocation: MdOutlineMyLocation,
  
  // Delivery
  Truck: FiTruck,
  Package: FiPackage,
  Shipping: MdOutlineLocalShipping,
  Cube: HiOutlineCube,
  
  // Weight
  Weight: LuWeight,
  
  // Time
  Calendar: FiCalendar,
  CalendarOutline: IoCalendarOutline,
  Clock: FiClock,
  Time: LuCalendarClock,
  TimeOutline: IoTimeOutline,
  History: BiHistory,
  
  // Payment
  Dollar: FiDollarSign,
  PriceTag: IoPricetagOutline,
  Offer: BiSolidOffer,
  
  // Map
  Map: LuMap,
  Directions: MdOutlineDirections,
  
  // UI
  Expand: FaExpand,
  Compress: FaCompress,
  ArrowRightLeft: LuArrowRightLeft,
  ArrowLeft: LuArrowLeft,
  ArrowRight: LuArrowRight,
  Menu: LuMenu,
  Close: LuX,
  ChevronDown: LuChevronDown,
  ChevronUp: LuChevronUp,
  Plus: LuPlus,
  Minus: LuMinus,
  Check: LuCheck,
  Filter: LuFilter,
  
  // Navigation
  Dashboard: MdOutlineDashboard,
  Account: HiOutlineUser,
  Cart: LuShoppingCart,
  Wishlist: LuHeart,
  Notifications: LuBell,
  Settings: LuSettings,
  
  // User Interface
  Search: FaSearch,
  User: FaUser,
  Bell: FaBell,
  Cog: FaCog,
  ShoppingBag: HiOutlineShoppingBag,
  Star: LuStar,
  
  // Support
  Help: MdOutlineHelp,
  Email: MdOutlineEmail,
  Phone: MdOutlinePhone,
  Chat: MdOutlineChat,
  CustomerService: RiCustomerService2Line,
  
  // Alias for consistency
  CalendarClock: LuCalendarClock,
  MapPin: FiMapPin,
  UserOutline: IoPersonOutline,
  SearchOutline: IoSearchOutline,
  SettingsOutline: IoSettingsOutline,
  NotificationsOutline: IoNotificationsOutline,
  CartAlt: BsCart,
  HeartAlt: BsHeart,
  StarAlt: BsStar,
  FilterAlt: BsFilter
};