import { useQuery } from "@tanstack/react-query";
import { getAllMaterial } from "./hooks";
export const useGetAllMaterialQuery = () => {
    return useQuery({
        queryKey: ["materialBoxes"],
        queryFn: () => getAllMaterial(),
    });
};
