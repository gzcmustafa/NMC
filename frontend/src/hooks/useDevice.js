import { useQuery } from "@tanstack/react-query";
import {mockDevices} from "../mock/mockData";

export const useDevices = ()=> {
    return useQuery({
        queryKey:[`devices`],
        queryFn: ()=> Promise.resolve(mockDevices)
    })
}