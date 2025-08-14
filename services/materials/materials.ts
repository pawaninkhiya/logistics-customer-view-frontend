import { api } from "../apiClient";
import { MATERIAL_TYPES } from "../endpoints";

// ------------------ GET: All Material Boxes ------------------
export const getAllMaterial = async (): Promise<any> => {
    const response = await api.get(MATERIAL_TYPES.GET_ALL);
    return response.data;
};


// ------------------ GET: Material Box by ID ------------------
export const getMaterialById = async (id: string): Promise<any> => {
    const response = await api.get(MATERIAL_TYPES.GET_BY_ID(id));
    return response.data;
};