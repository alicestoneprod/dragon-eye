import { useDispatch } from "react-redux"
import { AppDispatch } from "shared/types"

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
