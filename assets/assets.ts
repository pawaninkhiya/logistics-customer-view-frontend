// @assets/icons.ts
import { FaGoogle, FaExpand, FaCompress } from "react-icons/fa";
import { 
  LuLoader, 
  LuMapPin, 
  LuPackage, 
  LuCalendarClock,
  LuWeight,
  LuArrowRightLeft,
  LuClock,
  LuDollarSign,
  LuMap
} from "react-icons/lu";
import { 
  HiLockClosed, 
  HiLocationMarker, 
  HiHome, 
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineCube
} from "react-icons/hi";
import { 
  FiTruck,
  FiPackage,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiDollarSign
} from "react-icons/fi";
import { 
  IoCalendarOutline,
  IoTimeOutline,
  IoPricetagOutline
} from "react-icons/io5";
import { 
  MdOutlineDirections,
  MdOutlineMyLocation,
  MdOutlinePlace,
  MdOutlineLocalShipping
} from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
export const Icons = {
  // Authentication
  Google: FaGoogle,
  Lock: HiLockClosed,
  Logout:RiLogoutBoxRLine,
  
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
  
  // Payment
  Dollar: FiDollarSign,
  PriceTag: IoPricetagOutline,
  
  // Map
  Map: LuMap,
  Directions: MdOutlineDirections,
  
  // UI
  Expand: FaExpand,
  Compress: FaCompress,
  ArrowRightLeft: LuArrowRightLeft,
  
  // Alias for consistency
  CalendarClock: LuCalendarClock,
  MapPin: FiMapPin,
};