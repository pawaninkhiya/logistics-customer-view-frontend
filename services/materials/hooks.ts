
import { useQuery } from "@tanstack/react-query";
import { getAllMaterial } from "./materials";
export const useGetAllMaterialQuery = () => {
    return useQuery({
        queryKey: ["materialBoxes"],
        queryFn: () => getAllMaterial(),
    });
};
