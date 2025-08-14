
import { useQuery } from "@tanstack/react-query";
import { getAllMaterial, getMaterialById } from "./materials";
export const useGetAllMaterialQuery = () => {
    return useQuery({
        queryKey: ["materialBoxes"],
        queryFn: () => getAllMaterial(),
    });
};

// ------------------ GET: Material by ID ------------------
export const useMaterialByIdQuery = (id: string) => {
    return useQuery({
        queryKey: ["materialBox", id],
        queryFn: () => getMaterialById(id),
        enabled: !!id,
        staleTime:0,
    });
};

