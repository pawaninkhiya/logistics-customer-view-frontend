import { updateCustomer } from "./customers";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateCustomerMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["updateAdminUser"],
        mutationFn: ({ _id, payload }: { _id: string; payload: FormData }) =>
            updateCustomer(_id, payload)
    })
}