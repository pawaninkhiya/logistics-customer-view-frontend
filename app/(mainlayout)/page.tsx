// Home.tsx
import Image from "next/image";
import Container from "@/components/ui/Container";
import { SvgIcons } from "@/assets/svgIcons";

export default function Home() {
    return (
        <Container className="px-5 pt-8">
            <div className="flex-1 scrollbar-hide rounded-tl-xl rounded-tr-xl sm:rounded-tr-none">
                <div className="flex items-center gap-x-2 bg-white">
                    <Image
                        src={SvgIcons.Location}
                        alt="location"
                        width={34}
                        height={34}
                    />
                    <div className="text-sm">
                        <p className=" text-gray-800 text-base font-semibold">I am from</p>
                        <p className="text-gray-500 text-xs">Rudrapur, Uttarakhand 263153, India</p>
                    </div>
                </div>

                <div className="">
                    <div className="">

                    </div>
                </div>

            </div>
            <div className="bg-gray-200 scrollbar-hide rounded-tl-[33px] shadow rounded-tr-[33px] w-[350px]">
                {/* Right Column Content */}
            </div>
        </Container>
    );
}
