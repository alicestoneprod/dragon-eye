import { useSelector } from "react-redux"
import { RootState } from "shared/types"

export const useAppSelector = useSelector.withTypes<RootState>()
